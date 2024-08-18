"use client";

import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import {
	getDoc,
	writeBatch,
	collection,
	doc,
	setDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
	Box,
	Typography,
	Button,
	Container,
	Paper,
	TextField,
	Grid,
	Card,
	CardActionArea,
	CardContent,
	DialogContentText,
	DialogActions,
	Dialog,
	DialogTitle,
	DialogContent,
} from "@mui/material";

export default function Generate() {
	const { isLoaded, isSignedIn, user } = useUser();
	const [flashcards, setFlashcards] = useState([]);
	const [flipped, setFlipped] = useState({});
	const [text, setText] = useState("");
	const [name, setName] = useState("");
	const [open, setOpen] = useState(false);

	const router = useRouter();

	useEffect(() => {
		console.log("Initial state:", { text, flashcards, name, flipped });
	}, []);

	const handleSubmit = async () => {
		try {
			const response = await fetch("/api/generate", {
				method: "POST",
				body: text,
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			console.log("Received data:", data); // Check received data format

			// Ensure data is an object with a flashcards array
			if (data && Array.isArray(data.flashcards)) {
				setFlashcards(data.flashcards);
			} else {
				console.error("Unexpected data format:", data);
			}
		} catch (error) {
			console.error("Error fetching flashcards:", error);
		}
	};

	const handleCardClick = (id) => {
		console.log("Card clicked:", id);
		setFlipped((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	const handleOpen = () => {
		console.log("Opening save dialog");
		setOpen(true);
	};

	const handleClose = () => {
		console.log("Closing save dialog");
		setOpen(false);
	};

	const saveFlashcards = async () => {
		if (!user || !user.id) {
			alert("User information is not available.");
			return;
		}

		if (!name) {
			alert("Please enter a name for your flashcards");
			return;
		}
		console.log("Saving flashcards with name:", name);

		const batch = writeBatch(db);
		const userDocRef = doc(collection(db, "users"), user.id);
		const docSnap = await getDoc(userDocRef);

		if (docSnap.exists()) {
			console.log("User document exists:", docSnap.data());
			const collections = docSnap.data().flashcards || [];
			if (collections.some((f) => f.name === name)) {
				alert("A flashcard collection with that name already exists");
				return;
			} else {
				collections.push({ name });
				batch.set(userDocRef, { flashcards: collections }, { merge: true });
			}
		} else {
			batch.set(userDocRef, { flashcards: [{ name }] });
		}

		const colRef = collection(userDocRef, name);

		flashcards.forEach((flashcard) => {
			const cardDocRef = doc(colRef);
			console.log("Saving flashcard:", flashcard);
			batch.set(cardDocRef, flashcard);
		});

		try {
			await batch.commit();
			console.log("Flashcards saved successfully");
			handleClose();
			router.push("/flashcards");
		} catch (error) {
			console.error("Error saving flashcards:", error);
		}
	};

	useEffect(() => {
		console.log("Updated flashcards:", flashcards);
	}, [flashcards]);

	return (
		<Container maxWidth="lg">
			<Box
				sx={{
					mt: 4,
					mb: 6,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography variant="h4">Generate Flashcards</Typography>
				<Paper sx={{ p: 4, width: "100%" }}>
					<TextField
						value={text}
						onChange={(e) => setText(e.target.value)}
						label="Enter text to generate flashcards"
						fullWidth
						multiline
						rows={4}
						variant="outlined"
						sx={{ mb: 2 }}
					/>
					<Button
						variant="contained"
						onClick={handleSubmit}
						color="primary"
						fullWidth
					>
						Submit
					</Button>
				</Paper>
			</Box>
			{flashcards.length > 0 && (
				<Box sx={{ mt: 4 }}>
					<Typography variant="h5">Flashcards Preview</Typography>
					<Grid container spacing={3}>
						{flashcards.map((flashcard, index) => (
							<Grid item key={index} xs={12} sm={6} md={4}>
								<Card>
									<CardActionArea onClick={() => handleCardClick(index)}>
										<CardContent>
											<Box
												sx={{
													perspective: "1000px",
													"& > div": {
														transition: "transform 0.6s",
														transformStyle: "preserve-3d",
														position: "relative",
														width: "100%",
														height: "200px",
														boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
														transform: flipped[index]
															? "rotateY(180deg)"
															: "rotateY(0deg)",
													},
													"& > div > div": {
														position: "absolute",
														width: "100%",
														height: "100%",
														backfaceVisibility: "hidden",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														padding: 2,
														boxSizing: "border-box",
													},
													"& > div > div:nth-of-type(2)": {
														transform: "rotateY(180deg)",
													},
												}}
											>
												<div>
													<div>
														<Typography variant="h5">
															{flashcard.front}
														</Typography>
													</div>
													<div>
														<Typography variant="h5">
															{flashcard.back}
														</Typography>
													</div>
												</div>
											</Box>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						))}
					</Grid>
					<Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
						<Button variant="contained" color="primary" onClick={handleOpen}>
							Save
						</Button>
					</Box>
				</Box>
			)}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Save Flashcards</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter a name for your flashcards collection.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						label="Collection Name"
						type="text"
						fullWidth
						value={name}
						onChange={(e) => setName(e.target.value)}
						variant="outlined"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={saveFlashcards}>Save</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
}
