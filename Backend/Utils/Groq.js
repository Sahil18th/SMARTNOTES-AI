// import axios from "axios";



// export const generateSummary = async (text) => {

//     const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;
//   try {
//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
//       {
//         contents: [
//           {
//             parts: [
//               {
//                 text: `Summarize this text in clear bullet points:\n${text}`
//               }
//             ]
//           }
//         ]
//       }
//     );

//     return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated";

//   } catch (error) {
//      console.log("🔥 STATUS:", error.response?.status);
//     console.log("🔥 DATA:", JSON.stringify(error.response?.data));
//     console.log("🔥 FULL ERROR:", error.message);
//     throw new Error(error.response?.data?.error?.message || error.message);
//   }
// };

//--------------------------------------------------------------------------------------------------------------------------

// import { GoogleGenAI } from "@google/genai";

// const GEMINI_API_KEY = process.env.VITE_GOOGLE_API_KEY;

// const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });


// export const generateSummary = async (text) => {
  // const prompt = promptGenerator(text);
  // const response = await ai.models.generateContent({
  //   model: "gemini-3-flash-preview",
  //   contents: prompt,
  // });
  // return response;
// }

// export const promptGenerator = (text) => {
// 	return `Summarize this text in clear bullet points based on this Paragraph: "${text}"`
// }








// Utils/gemini.js
// Utils/gemini.js
// import { GoogleGenAI } from "@google/genai";
// import dotenv from "dotenv";
// dotenv.config();

// const GEMINI_API_KEY = process.env.GOOGLE_API_KEY; // ✅ No VITE_ prefix for backend

// console.log("Gemini Key loaded:", GEMINI_API_KEY); 

// const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// export const generateSummary = async (text) => {
//   const prompt = promptGenerator(text);
  
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",  // ✅ correct model name
//       contents: prompt,
//     });
    
//     return response.text; // ✅ In @google/genai, .text is a property (not a method)
//   } catch (error) {
//     console.error("Gemini error:", error);
//     throw error;
//   }
// };

// export const promptGenerator = (text) => {
//   return `Summarize the following text in clear bullet points. Be concise and highlight the most important information:

// "${text}"

// Format the summary as bullet points starting with •`;
// };





// Utils/groq.js
// import Groq from "groq-sdk";
// import dotenv from "dotenv";
// dotenv.config();

// const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// console.log("ENV CHECK:", process.env.GROQ_API_KEY);

// export const generateSummary = async (text) => {
//   const prompt = promptGenerator(text);
  
//   try {
//     const response = await client.chat.completions.create({
//       model: "llama3-8b-8192",
//       messages: [{ role: "user", content: prompt }],
//     });
    
//     return response.choices[0].message.content; // ✅ extract text like this
//   } catch (error) {
//   console.error("FULL ERROR:", error.response?.data || error.message);
//   throw error;
// }
// };

// export const promptGenerator = (text) => {
//   return `Summarize the following text in clear bullet points. Be concise and highlight the most important information:

// "${text}"

// Format the summary as bullet points starting with •`;
// };

import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ❌ REMOVED: console.log("ENV CHECK:", process.env.GROQ_API_KEY);

export const generateSummary = async (text) => {
  if (!text?.trim()) throw new Error("Input text is required");
  
  const prompt = promptGenerator(text);
  
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // ✅ updated from llama3-8b-8192
      max_tokens: 512,
      messages: [{ role: "user", content: prompt }],
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);
    throw error;
  }
};

export const promptGenerator = (text) => {
  return `Summarize the following text in clear bullet points. Be concise and highlight the most important information:

\`\`\`
${text}
\`\`\`

Format the summary as bullet points starting with •`;
};