import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the GoogleGenerativeAI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Get the Gemini model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const systemPrompt = `
you are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. follow these guidelines.

1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that the flashcards focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5.Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7.when appropriate use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9 If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balance set of flashcards that cover the topic comprehensively.
11. Only generate 10 flashcards.

remember, the goal is to facilitate effective learning and retention of information through these flashcards.


You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
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

		// Generate content using the model
		const result = await model.generateContent(`${systemPrompt}\n${data}`);
		const response = await result.response.text(); // Assuming response.text() returns the flashcards in JSON format

		// Parse the JSON response
		const flashcards = JSON.parse(response);

		return NextResponse.json(flashcards);
	} catch (error) {
		console.error("Error generating content:", error);
		return NextResponse.json(fallbackFlashcards);
	}
}
