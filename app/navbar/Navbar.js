"use client";

import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Container,
	Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

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
							<Button color="inherit" href="/sign-in">
								Login
							</Button>
							<Button color="inherit" href="/sign-up">
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
