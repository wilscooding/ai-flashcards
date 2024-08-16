import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
	AppBar,
	Button,
	Container,
	Toolbar,
	Typography,
	Box,
	Grid,
	Card,
	CardContent,
	CardActions,
	Divider,
	IconButton,
} from "@mui/material";
import Head from "next/head";
import { InfoOutlined, StarBorder, Star } from "@mui/icons-material";

export default function Home() {
	return (
		<Container maxWidth="lg">
			<Head>
				<title>Flashcard SaaS</title>
				<meta name="description" content="Create flashcards from your text" />
			</Head>

			{/* Header Section */}
			<AppBar position="static" color="primary">
				<Toolbar>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						Flashcard SaaS
					</Typography>
					<SignedOut>
						<Button color="inherit">Login</Button>
						<Button color="inherit">Sign Up</Button>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</Toolbar>
			</AppBar>

			{/* Hero Section */}
			<Box sx={{ textAlign: "center", py: 8, bgcolor: "#f4f6f8" }}>
				<Typography variant="h2" sx={{ mb: 2 }}>
					Welcome to Language AI
				</Typography>
				<Typography variant="h5" sx={{ mb: 4 }}>
					A fast way to learn a new language with practice!
				</Typography>
				<Button
					variant="contained"
					color="primary"
					size="large"
					sx={{ px: 4 }}
				>
					Get Started
				</Button>
			</Box>

			{/* Features Section */}
			<Box sx={{ py: 8 }}>
				<Typography variant="h4" align="center" sx={{ mb: 4 }}>
					Our Features
				</Typography>
				<Grid container spacing={4} justifyContent="center">
					<Grid item xs={12} sm={6} md={4}>
						<Card variant="outlined">
							<CardContent>
								<Typography variant="h5" gutterBottom>
									Interactive Flashcards
								</Typography>
								<Typography variant="body1" color="textSecondary">
									Create interactive flashcards to help you learn more
									effectively with spaced repetition.
								</Typography>
							</CardContent>
							<CardActions>
								<IconButton aria-label="info">
									<InfoOutlined />
								</IconButton>
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Card variant="outlined">
							<CardContent>
								<Typography variant="h5" gutterBottom>
									Real-time Analytics
								</Typography>
								<Typography variant="body1" color="textSecondary">
									Monitor your learning progress and get insights into your
									performance with real-time analytics.
								</Typography>
							</CardContent>
							<CardActions>
								<IconButton aria-label="info">
									<InfoOutlined />
								</IconButton>
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Card variant="outlined">
							<CardContent>
								<Typography variant="h5" gutterBottom>
									Personalized Learning
								</Typography>
								<Typography variant="body1" color="textSecondary">
									Tailor your learning experience with personalized flashcards
									and practice sessions.
								</Typography>
							</CardContent>
							<CardActions>
								<IconButton aria-label="info">
									<InfoOutlined />
								</IconButton>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Box>

			{/* Pricing Section */}
			<Box sx={{ py: 8, bgcolor: "#f4f6f8" }}>
				<Typography variant="h4" align="center" sx={{ mb: 4 }}>
					Pricing Plans
				</Typography>
				<Grid container spacing={4} justifyContent="center">
					<Grid item xs={12} sm={6} md={4}>
						<Card variant="outlined">
							<CardContent>
								<Typography variant="h5" gutterBottom>
									Free Tier
								</Typography>
								<Typography variant="h6" color="primary" sx={{ mb: 2 }}>
									$0 / month
								</Typography>
								<Typography variant="body1" color="textSecondary">
									Basic access to flashcards with limited features.
								</Typography>
							</CardContent>
							<Divider />
							<CardActions>
								<Button variant="outlined" color="primary" fullWidth>
									Choose Plan
								</Button>
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Card variant="outlined">
							<CardContent>
								<Typography variant="h5" gutterBottom>
									Standard Plan
								</Typography>
								<Typography variant="h6" color="primary" sx={{ mb: 2 }}>
									$4.99 / month
								</Typography>
								<Typography variant="body1" color="textSecondary">
									Unlock additional features and analytics.
								</Typography>
							</CardContent>
							<Divider />
							<CardActions>
								<Button variant="contained" color="primary" fullWidth>
									Choose Plan
								</Button>
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Card variant="outlined">
							<CardContent>
								<Typography variant="h5" gutterBottom>
									Premium Plan
								</Typography>
								<Typography variant="h6" color="primary" sx={{ mb: 2 }}>
									$10.99 / month
								</Typography>
								<Typography variant="body1" color="textSecondary">
									All features included with priority support and advanced
									analytics.
								</Typography>
							</CardContent>
							<Divider />
							<CardActions>
								<Button variant="contained" color="primary" fullWidth>
									Choose Plan
								</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
