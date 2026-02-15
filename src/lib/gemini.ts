import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export const analyzeDocument = async (text: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        },
        {
          "id": "rec_2",
          "title": "Sub-task for rec_1",
          "description": "Specific technical step",
          "milestoneId": "m1",
          "labels": ["Task"],
          "parentId": "rec_1",
          "type": "draft"
        }
      ]
    }

    Documentation Text:
    ${text}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text().replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze document with Gemini");
  }
};
