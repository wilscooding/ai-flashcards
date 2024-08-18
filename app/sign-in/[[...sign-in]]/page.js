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
import { SignIn } from "@clerk/nextjs";
import Head from "next/head";

export default function SignInPage() {
	return (
		<Container
			maxWidth="100%" // Limits the width to prevent horizontal scrolling
			sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
		>
			<Head>
				<title>Sign In - Flashcard SaaS</title>
				<meta
					name="description"
					content="Sign in to your Flashcard SaaS account"
				/>
			</Head>

			{/* Header Section */}
			<AppBar position="static" color="primary">
				<Toolbar>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						Flashcard SaaS
					</Typography>
					<Button color="inherit">
						<Link href="/sign-up" passHref>
							Sign Up
						</Link>
					</Button>
				</Toolbar>
			</AppBar>

			{/* Sign In Form Section */}
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
							Sign In
						</Typography>
						<SignIn />
					</CardContent>
					<Divider />
					<CardActions>
						<Button color="primary" fullWidth>
							<Link href="/sign-up" passHref>
								Create an Account
							</Link>
						</Button>
					</CardActions>
				</Card>
			</Box>
		</Container>
	);
}
