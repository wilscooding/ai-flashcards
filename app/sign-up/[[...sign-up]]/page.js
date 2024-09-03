// import {
//     AppBar,
//     Box,
//     Button,
//     Container,
//     Toolbar,
//     Typography,
// } from "@mui/material";
// import Link from "next/link";
// import { SignIn, SignUp, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// export default function SignUpPage() {
//     return (
//         <Container maxWidth="100vw" disableGutters>
//             <AppBar position="static" sx={{ backgroundColor: '#000' }}>
//                     <Toolbar>

//                         <SignedOut>
//                             <Button color="inherit" href="/sign-in">
//                                 Login
//                             </Button>
//                             <Button color="inherit" href="/sign-up">
//                                 Sign Up
//                             </Button>
//                         </SignedOut>
//                         <SignedIn>
//                             <UserButton />
//                         </SignedIn>
//                     </Toolbar>
//                 </AppBar>

//             <Box
//                 display="flex"
//                 flexDirection="column"
//                 alignItems="center"
//                 justifyContent="center"
//             >
//                 <Typography variant="h4" padding={4} > Sign Up</Typography>
//                 <SignUp />
//             </Box>
//         </Container>
//     );
// }

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
