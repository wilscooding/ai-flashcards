// "use client";

// import React from "react";
// import {
// 	AppBar,
// 	Toolbar,
// 	Typography,
// 	Button,
// 	Container,
// 	Box,
// } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// const Navbar = () => {
// 	const router = useRouter();

// 	const navigateTo = (path) => {
// 		router.push(path);
// 	};

// 	return (
// 		<AppBar position="static" sx={{ backgroundColor: "#343a40" }}>
// 			<Toolbar>
// 				<Container sx={{ display: "flex", flexGrow: 1 }}>
// 					<Box sx={{ display: "flex", flexGrow: 1 }}>
// 						<Button color="inherit" onClick={() => navigateTo("/")}>
// 							Home
// 						</Button>
// 						<Button color="inherit" onClick={() => navigateTo("/generate")}>
// 							Generate
// 						</Button>
// 						<Button color="inherit" onClick={() => navigateTo("/flashcards")}>
// 							Flashcards
// 						</Button>
// 					</Box>
// 					<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
// 						<SignedOut>
// 							<Button color="inherit" href="/sign-in">
// 								Login
// 							</Button>
// 							<Button color="inherit" href="/sign-up">
// 								Sign Up
// 							</Button>
// 						</SignedOut>
// 						<SignedIn>
// 							<UserButton />
// 						</SignedIn>
// 					</Box>
// 				</Container>
// 			</Toolbar>
// 		</AppBar>
// 	);
// };

// export default Navbar;


"use client";

import React from "react";
import dynamic from "next/dynamic";
import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import { useRouter } from "next/navigation";

// Dynamically import SignedIn, SignedOut, and UserButton to avoid hydration issues
const SignedIn = dynamic(
	() => import("@clerk/nextjs").then((mod) => mod.SignedIn),
	{ ssr: false }
);
const SignedOut = dynamic(
	() => import("@clerk/nextjs").then((mod) => mod.SignedOut),
	{ ssr: false }
);
const UserButton = dynamic(
	() => import("@clerk/nextjs").then((mod) => mod.UserButton),
	{ ssr: false }
);

const Navbar = () => {
	const router = useRouter();

	const navigateTo = (path) => {
		router.push(path);
	};

	return (
		<AppBar position="static" sx={{ backgroundColor: "#343a40" }}>
			<Toolbar>
				<Container sx={{ display: "flex", flexGrow: 1 }}>
					<Box sx={{ display: "flex", flexGrow: 1 }}>
						<Button color="inherit" onClick={() => navigateTo("/")}>
							Home
						</Button>
						<Button color="inherit" onClick={() => navigateTo("/generate")}>
							Generate
						</Button>
						<Button color="inherit" onClick={() => navigateTo("/flashcards")}>
							Flashcards
						</Button>
					</Box>
					<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
						<SignedOut>
							<Button color="inherit" onClick={() => navigateTo("/sign-in")}>
								Login
							</Button>
							<Button color="inherit" onClick={() => navigateTo("/sign-up")}>
								Sign Up
							</Button>
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</Box>
				</Container>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
