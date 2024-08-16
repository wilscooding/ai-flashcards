import { NextResponse } from "next/server";
import { google } from "googleapis";

const gemini = google.gemini("gemini 1.5 flash");

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}`;

export async function POST(req) {
	const data = await req.text();
	const response = await gemini.text.create({
		prompt: `${systemPrompt}\n${data}`,
		model: "gemini-pro",
		key: process.env.GOOGLE_API_KEY,
	});

	const flashcards = response.data.flasrcards;
	return NextResponse.json(flashcards);
}
