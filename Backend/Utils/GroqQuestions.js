import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateQuestions = async (text) => {
  const prompt = promptGenerator(text);
  
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });
    
    return response.choices[0].message.content; // ✅ extract text like this
  } catch (error) {
    console.error("Groq error:", error);
    throw error;
  }
};

export const promptGenerator = (text) => {
  return  `Generate 10 questions and answers from this text.

Format:
1. Question
Answer: ...

2. Question
Answer: ...

DO NOT use bullet points or extra symbols.

"${text}"
`;
};