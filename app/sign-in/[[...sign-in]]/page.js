"use client";

import { Container, Box, Typography } from "@mui/material";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
	return (
		<Container maxWidth="sm">
			<Box
				display="flex"
				justifyContent="center"
				flexDirection="column"
				alignItems="center"
				padding={4}
			>
				<Typography variant="h4">Sign In</Typography>
				<SignIn />
			</Box>
		</Container>
	);
}
