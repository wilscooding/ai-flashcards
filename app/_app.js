import { ClerkProvider } from "@clerk/nextjs";
import { CssBaseline } from "@mui/material";
import Head from "next/head";

const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

function MyApp({ Component, pageProps }) {
	return (
		<ClerkProvider frontendApi={clerkFrontendApi}>
			<Head>
				<title>Flashcard SaaS</title>
				<meta name="description" content="Create flashcard from your text" />
			</Head>
			<CssBaseline />
			<Component {...pageProps} />
		</ClerkProvider>
	);
}

export default MyApp;
