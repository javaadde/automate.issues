import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export const analyzeDocument = async (text: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Analyze the following project documentation and extract a structured list of milestones, issues, and sub-tasks.
    
    Output the result STRICTLY as a JSON object with the following structure:
    {
      "milestones": [
        {
          "id": "temp_m1",
          "title": "Milestone Title",
          "description": "Short description"
        }
      ],
      "issues": [
        {
          "id": "temp_i1",
          "title": "Issue Title",
          "description": "Detailed description",
          "milestoneId": "temp_m1",
          "labels": ["Type", "Priority"],
          "parentId": null,
          "type": "draft"
        },
        {
          "id": "temp_i2",
          "title": "Sub-task Title",
          "description": "Description",
          "milestoneId": "temp_m1",
          "labels": ["Sub-task"],
          "parentId": "temp_i1",
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
