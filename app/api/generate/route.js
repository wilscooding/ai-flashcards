import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the GoogleGenerativeAI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Get the Gemini model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const systemPrompt = `
You are a flashcard creator specialized in language learning. Your task is to generate concise and effective flashcards to help users learn a new language. Follow these guidelines:

1. Create clear and concise vocabulary flashcards for the target language.
2. For each flashcard, include:
   - The word or sentence in the target language on the front.
   - The translation and pronunciation guide in the user's language on the back.
   - An example sentence using the word or phrase on the back.
3. Ensure that the flashcards focus on useful and commonly used words or phrases.
4. Use simple language and provide phonetic pronunciation to make learning easier.
5. Include a variety of flashcard types, such as single words, phrases, and sentences.
6. Avoid overly complex or ambiguous phrasing.
7. Tailor the difficulty level of the flashcards to the user's specified preferences.
8. If given a body of text, extract the most important and relevant vocabulary and phrases.
9. Aim to create a balanced set of flashcards that cover a range of useful vocabulary and phrases.
10. Only generate 10 flashcards.

Remember, the goal is to facilitate effective language learning and retention through these flashcards.

You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "str",
      "back": "str"
    }
  ]
}`;

const fallbackFlashcards = {
	flashcards: [
		{ front: "What is the capital of France?", back: "Paris" },
		{
			front: "What is the largest planet in our solar system?",
			back: "Jupiter",
		},
		{ front: "Who wrote 'To Kill a Mockingbird'?", back: "Harper Lee" },
		{ front: "What is the chemical symbol for water?", back: "H2O" },
		{ front: "What year did the Titanic sink?", back: "1912" },
		{ front: "What is the smallest prime number?", back: "2" },
		{ front: "Who painted the Mona Lisa?", back: "Leonardo da Vinci" },
		{
			front: "What is the main language spoken in Brazil?",
			back: "Portuguese",
		},
		{ front: "How many continents are there?", back: "7" },
		{ front: "What is the boiling point of water in Celsius?", back: "100°C" },
	],
};

export async function POST(req) {
	try {
		const data = await req.text();
		const result = await model.generateContent(`${systemPrompt}\n${data}`);

		// Check if result has a valid response object
		if (!result.response || !result.response.text) {
			throw new Error("Invalid API response");
		}

		let response = await result.response.text();
		response = response.replace(/```json|```/g, "").trim();

		// Parse the JSON response
		const flashcards = JSON.parse(response);

		// Validate the flashcards format
		if (
			!Array.isArray(flashcards.flashcards) ||
			flashcards.flashcards.length === 0
		) {
			throw new Error("Invalid flashcards format");
		}

		return NextResponse.json(flashcards);
	} catch (error) {
		console.error("Error generating content:", error);
		return NextResponse.json(fallbackFlashcards);
	}
}
