import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const analyzeDocument = async (text: string) => {
  if (!apiKey) {
    throw new Error(
      "GOOGLE_GEMINI_API_KEY is missing in your environment variables. Please check .env.local",
    );
  }

  // Based on your key diagnostic, gemini-2.0 models are available but gemini-1.5 models are returning 404.
  // We prioritize the 2.0 variants which were listed as available for your project.
  const modelOptions = [
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite-001",
    "gemini-1.5-flash",
  ];
  let lastError: any = null;

  for (const modelName of modelOptions) {
    try {
      console.log(`Starting document analysis with ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `
        Analyze the following project documentation and extract a structured list of milestones, issues, and sub-tasks.
        
        CRITICAL RULES:
        1. Output the result STRICTLY as a JSON object. No other text.
        2. Use unique IDs for everything. For recommendations, use strings like "rec_1", "rec_2", etc.
        3. Identify "parent issues" and "sub-tasks". If an issue is a sub-component of another, set its "parentId" to the ID of the parent.
        4. Group issues by Milestone whenever possible.
        5. Be professional and technical in issue descriptions.

        JSON STRUCTURE:
        {
          "milestones": [
            {
              "id": "m1",
              "title": "Milestone Title",
              "description": "Short description"
            }
          ],
          "issues": [
            {
              "id": "rec_1",
              "title": "Main Task Title",
              "description": "Detailed technical description",
              "milestoneId": "m1",
              "labels": ["Backend", "High Priority"],
              "parentId": null,
              "type": "draft"
            }
          ]
        }

        Documentation Text:
        ${text}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const textResponse = response.text();

      if (!textResponse) continue;

      const jsonText = textResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(jsonText);
    } catch (error: any) {
      lastError = error;
      console.warn(`${modelName} analysis failed:`, error.message);

      // If it's a quota error (429), we stop and tell the user directly
      if (error.status === 429 || error.message?.includes("quota")) {
        throw new Error(
          "Gemini API Quota Exceeded. Your key has a '0' limit for the free tier. This usually happens when the API is not fully enabled or requires billing setup. Please verify your key at Google AI Studio (aistudio.google.com).",
        );
      }

      // Stop early if it's an authentication/key error
      if (
        error.status === 400 ||
        error.status === 401 ||
        error.message?.includes("API Key")
      ) {
        break;
      }
      continue;
    }
  }

  console.error("Gemini Analysis Critical Failure:", lastError);

  if (
    lastError?.message?.includes("API Key") ||
    lastError?.status === 400 ||
    lastError?.status === 401
  ) {
    throw new Error(
      "Invalid Gemini API Key. Please verify your key in .env.local and ensure it has Gemini API access.",
    );
  }

  throw new Error(
    lastError?.message || "Failed to analyze document with Gemini",
  );
};
