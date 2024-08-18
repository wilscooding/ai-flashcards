import {
	AppBar,
	Button,
	Container,
	Toolbar,
	Typography,
	Box,
	Card,
	CardContent,
	CardActions,
	Divider,
} from "@mui/material";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import Head from "next/head";

export default function SignUpPage() {
	return (
		<Container
			maxWidth="100%" // Use xs to limit the width and prevent horizontal scroll
			sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
		>
			<Head>
				<title>Sign Up - Flashcard SaaS</title>
				<meta
					name="description"
					content="Create a new account on Flashcard SaaS"
				/>
			</Head>

			{/* Header Section */}
			<AppBar position="static" color="primary">
				<Toolbar>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						Flashcard SaaS
					</Typography>
					<Button color="inherit">
						<Link href="/sign-in" passHref>
							Login
						</Link>
					</Button>
				</Toolbar>
			</AppBar>

			{/* Sign Up Form Section */}
			<Box
				sx={{
					flex: 1,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					bgcolor: "#f4f6f8",
					p: 2,
					overflow: "hidden",
				}}
			>
				<Card variant="outlined" sx={{ width: "100%", maxWidth: 400 }}>
					<CardContent>
						<Typography variant="h5" gutterBottom>
							Sign Up
						</Typography>
						<SignUp />
					</CardContent>
					<Divider />
					<CardActions>
						<Button color="primary" fullWidth>
							<Link href="/sign-in" passHref>
								Already have an account? Login
							</Link>
						</Button>
					</CardActions>
				</Card>
			</Box>
		</Container>
	);
}
