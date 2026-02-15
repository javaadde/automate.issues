"use server";

import { analyzeDocument } from "@/lib/gemini";

export async function analyzeProjectDoc(formData: FormData) {
  const text = formData.get("text") as string;
  if (!text) throw new Error("No text provided");

  try {
    const analysis = await analyzeDocument(text);
    return { success: true, data: analysis };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
