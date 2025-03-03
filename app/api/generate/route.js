// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize API client
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const baseSystemPrompt = `
// You are a flashcard creator specialized in language learning. Your task is to generate concise and effective flashcards to help users learn a new language. Follow these guidelines:

// 1. Create clear and concise vocabulary flashcards for the target language.
// 2. For each flashcard, include:
//    - The word or sentence in the target language on the front.
//    - The translation and pronunciation guide in the user's language on the back.
//    - An example sentence using the word or phrase on the back.
// 3. Ensure that the flashcards focus on useful and commonly used words or phrases.
// 4. Use simple language and provide phonetic pronunciation to make learning easier.
// 5. Include a variety of flashcard types, such as single words, phrases, and sentences.
// 6. Avoid overly complex or ambiguous phrasing.
// 7. If given a body of text, extract the most important and relevant vocabulary and phrases.
// 8. Generate **exactly 10 flashcards**.
// `;

// // Define difficulty levels
// const difficultyPrompts = {
// 	Beginner: `
//     Use **very simple** words and phrases that are essential for beginners.
//     Example: "Hello", "Goodbye", "What is your name?".
//     Keep sentences short and vocabulary very basic.
//     `,
// 	Intermediate: `
//     Use **moderate** difficulty words and phrases that a learner might use in daily conversations.
//     Example: "Where is the nearest restaurant?", "Can you help me find a taxi?".
//     Introduce some common idioms and compound sentences.
//     `,
// 	Advanced: `
//     Use **complex** vocabulary, idioms, and advanced grammar structures.
//     Example: "Despite the inclement weather, our flight was not delayed.",
//     "The stock market is experiencing a volatile fluctuation due to economic instability."
//     Include technical terms, synonyms, and cultural expressions.
//     `,
// };

// // Fallback flashcards in case of errors
// const fallbackFlashcards = {
// 	flashcards: [
// 		{
// 			front: "Hello",
// 			back: "Hola (Spanish) / Bonjour (French) / 你好 (Chinese - Nǐ hǎo)",
// 		},
// 		{
// 			front: "Thank you",
// 			back: "Gracias (Spanish) / Merci (French) / 谢谢 (Chinese - Xièxiè)",
// 		},
// 		{
// 			front: "Goodbye",
// 			back: "Adiós (Spanish) / Au revoir (French) / 再见 (Chinese - Zàijiàn)",
// 		},
// 		{ front: "Yes", back: "Sí (Spanish) / Oui (French) / 是 (Chinese - Shì)" },
// 		{
// 			front: "No",
// 			back: "No (Spanish) / Non (French) / 不是 (Chinese - Bù shì)",
// 		},
// 		{
// 			front: "How are you?",
// 			back: "¿Cómo estás? (Spanish) / Comment ça va? (French) / 你好吗？ (Chinese - Nǐ hǎo ma?)",
// 		},
// 		{
// 			front: "What is your name?",
// 			back: "¿Cómo te llamas? (Spanish) / Comment tu t’appelles? (French) / 你叫什么名字？ (Chinese - Nǐ jiào shénme míngzì?)",
// 		},
// 		{
// 			front: "I don't understand",
// 			back: "No entiendo (Spanish) / Je ne comprends pas (French) / 我不明白 (Chinese - Wǒ bù míngbái)",
// 		},
// 		{
// 			front: "Can you help me?",
// 			back: "¿Puedes ayudarme? (Spanish) / Peux-tu m'aider? (French) / 你能帮我吗？ (Chinese - Nǐ néng bāng wǒ ma?)",
// 		},
// 		{
// 			front: "Where is the bathroom?",
// 			back: "¿Dónde está el baño? (Spanish) / Où sont les toilettes? (French) / 洗手间在哪里？ (Chinese - Xǐshǒujiān zài nǎlǐ?)",
// 		},
// 	],
// };

// export async function POST(req) {
// 	try {
// 		const { prompt, difficulty } = await req.json();
// 		if (!prompt || prompt.length > 100) {
// 			return NextResponse.json({
// 				error: "Invalid input. Please enter a valid prompt.",
// 			});
// 		}

// 		// Ensure the difficulty is valid; default to Beginner if missing
// 		const difficultyPrompt =
// 			difficultyPrompts[difficulty] || difficultyPrompts["Beginner"];
// 		const finalPrompt = `${baseSystemPrompt}\n${difficultyPrompt}\nUser Input: "${prompt}"`;

// 		const result = await model.generateContent(finalPrompt);

// 		// ✅ Debugging: Log API response
// 		console.log("AI API Response:", JSON.stringify(result, null, 2));

// 		if (!result.response || !result.response.text) {
// 			console.error("Invalid API response format");
// 			return NextResponse.json(fallbackFlashcards);
// 		}

// 		let response = await result.response.text();
// 		response = response.replace(/```json|```/g, "").trim();

// 		// ✅ Ensure clean JSON format
// 		let flashcards;
// 		try {
// 			flashcards = JSON.parse(response);
// 			console.log("Parsed flashcards:", flashcards);
// 		} catch (error) {
// 			console.error("Error parsing AI response:", error);
// 			return NextResponse.json(fallbackFlashcards);
// 		}

// 		// Validate JSON structure
// 		if (
// 			!flashcards ||
// 			!Array.isArray(flashcards.flashcards) ||
// 			flashcards.flashcards.length === 0
// 		) {
// 			console.warn("Invalid flashcards format, returning fallback.");
// 			return NextResponse.json(fallbackFlashcards);
// 		}

// 		return NextResponse.json(flashcards);
// 	} catch (error) {
// 		console.error("Error generating content:", error);
// 		return NextResponse.json(fallbackFlashcards);
// 	}
// }

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize API client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const baseSystemPrompt = `
You are a flashcard creator specialized in language learning. Your task is to generate flashcards for a user to learn a new language. Follow these instructions:

1. **Return exactly 10 flashcards in valid JSON format.**
2. **DO NOT use markdown, bullet points, or extra formatting.**
3. **Use this JSON structure exactly:**
   {
     "flashcards": [
       { "front": "Word or phrase", "back": "Translation and pronunciation" }
     ]
   }
4. Example JSON output:
   {
     "flashcards": [
       { "front": "Hola", "back": "Hello (O-la)" },
       { "front": "Gracias", "back": "Thank you (Grah-thee-as)" }
     ]
   }
5. **DO NOT** include explanations, headers, or additional formatting.
6. **ONLY output a valid JSON object. DO NOT include extra text.**
`;

// Define difficulty levels
const difficultyPrompts = {
	Beginner: `Use **very simple** words and phrases that are essential for beginners. Example: "Hello", "Goodbye", "What is your name?". Keep sentences short and vocabulary very basic.`,
	Intermediate: `Use **moderate** difficulty words and phrases that a learner might use in daily conversations. Example: "Where is the nearest restaurant?", "Can you help me find a taxi?". Introduce some common idioms and compound sentences.`,
	Advanced: `Use **complex** vocabulary, idioms, and advanced grammar structures. Example: "Despite the inclement weather, our flight was not delayed.", "The stock market is experiencing a volatile fluctuation due to economic instability." Include technical terms, synonyms, and cultural expressions.`,
};

export async function POST(req) {
	try {
		const { prompt, difficulty } = await req.json();
		if (!prompt || prompt.length > 100) {
			return NextResponse.json({
				error: "Invalid input. Please enter a valid prompt.",
			});
		}

		// Ensure the difficulty is valid; default to Beginner if missing
		const difficultyPrompt =
			difficultyPrompts[difficulty] || difficultyPrompts["Beginner"];
		const finalPrompt = `${baseSystemPrompt}\n${difficultyPrompt}\nUser Input: "${prompt}"`;

		const result = await model.generateContent(finalPrompt);

		// ✅ Debugging: Log API response
		console.log("AI API Response:", JSON.stringify(result, null, 2));

		let responseText =
			result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
		if (!responseText) {
			console.error("Invalid API response format");
			return NextResponse.json({ flashcards: [] });
		}

		// ✅ Remove unwanted markdown characters before parsing
		responseText = responseText
			.replace(/\*\*/g, "") // Remove **bold**
			.replace(/\*/g, "") // Remove *italics*
			.replace(/```json|```/g, "") // Remove code block markers
			.trim();

		// ✅ Try parsing response manually if JSON.parse() fails
		let flashcards;
		try {
			flashcards = JSON.parse(responseText);
		} catch (error) {
			console.error(
				"Error parsing AI response, attempting manual extraction:",
				error
			);
			flashcards = extractFlashcardsManually(responseText);
		}

		// ✅ Validate JSON structure
		if (
			!flashcards ||
			!Array.isArray(flashcards.flashcards) ||
			flashcards.flashcards.length === 0
		) {
			console.warn("Invalid flashcards format, returning empty list.");
			return NextResponse.json({ flashcards: [] });
		}

		return NextResponse.json(flashcards);
	} catch (error) {
		console.error("Error generating content:", error);
		return NextResponse.json({ flashcards: [] });
	}
}

// ✅ Backup: Extract Flashcards Manually from AI Response
function extractFlashcardsManually(responseText) {
	const flashcards = [];
	const regex = /Front:\s(.*?)\n\nBack:\s(.*?)\n/g;

	let match;
	while ((match = regex.exec(responseText)) !== null) {
		flashcards.push({ front: match[1].trim(), back: match[2].trim() });
	}

	return { flashcards };
}
