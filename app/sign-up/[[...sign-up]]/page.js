"use client";

import { Container, Box, Typography } from "@mui/material";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
	return (
		<Container maxWidth="sm">
			<Box
				display="flex"
				justifyContent="center"
				flexDirection="column"
				alignItems="center"
				padding={4}
			>
				<Typography variant="h4">Sign Up</Typography>
				<SignUp />
			</Box>
		</Container>
	);
}
