"use server";

import { analyzeDocument } from "@/lib/gemini";

export async function analyzeProjectDoc(formData: FormData) {
  try {
    const text = formData.get("text") as string;
    const file = formData.get("file") as File;

    let content = text;

    if (file && file.size > 0) {
      if (file.type === "application/pdf") {
        try {
          // Use a more reliable way to import pdfjs in Next.js Server Actions
          const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
          const arrayBuffer = await file.arrayBuffer();
          const loadingTask = pdfjs.getDocument({
            data: new Uint8Array(arrayBuffer),
            useSystemFonts: true,
            disableFontFace: true,
          });
          
          const pdf = await loadingTask.promise;
          let fullText = "";
          
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              // @ts-ignore
              .map((item) => item.str)
              .join(" ");
            fullText += pageText + "\n";
          }
          content = fullText;
        } catch (err: any) {
          console.error("PDF Parsing Error:", err);
          return { success: false, error: "Failed to parse PDF: " + err.message };
        }
      } else {
        content = await file.text();
      }
    }

    if (!content || content.trim().length < 10) {
      return { success: false, error: "The document is too short or empty. Please provide more details." };
    }

    const analysis = await analyzeDocument(content);
    return { success: true, data: analysis };

  } catch (error: any) {
    console.error("Analysis Action Critical Error:", error);
    return { success: false, error: error.message || "An internal error occurred during analysis." };
  }
}
