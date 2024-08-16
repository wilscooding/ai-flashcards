import {
	AppBar,
	Button,
	Container,
	Toolbar,
	Typography,
	Box,
} from "@mui/material";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function SignUpPage() {
	return (
		<Container maxWidth="lg">
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
					<Button color="inherit">
						<Link href="/sign-up" passHref>
							Sign Up
						</Link>
					</Button>
				</Toolbar>
			</AppBar>

			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="80vh"
			>
				<Box textAlign="center">
					<Typography variant="h4" gutterBottom>
						Sign In
					</Typography>
					<SignIn />
				</Box>
			</Box>
		</Container>
	);
}
