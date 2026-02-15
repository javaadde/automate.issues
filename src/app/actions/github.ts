"use server";

import { auth } from "@/auth";
import { createGitHubMilestone, createGitHubIssue } from "@/lib/github";

export async function syncToGitHub(repoFullName: string, selectedData: any) {
  const session = await auth();
  // @ts-ignore
  const accessToken = session?.accessToken;
  if (!accessToken) throw new Error("Not authenticated");

  const [owner, repo] = repoFullName.split("/");
  
  const { milestones, issues } = selectedData;
  const milestoneMap: Record<string | number, number> = {};

  try {
    // 1. Create Milestones
    for (const m of milestones) {
      const created = await createGitHubMilestone(accessToken, owner, repo, {
        title: m.title,
        description: m.description
      });
      milestoneMap[m.id] = created.number; // store GitHub milestone number
    }

    // 2. Create Issues
    for (const i of issues) {
      // Map children if they have a parent that was just created? 
      // Actually GitHub doesn't have native sub-tasks in issues easily, 
      // but we can add "- [ ] Subtask" to the body or just create them as separate issues.
      // For now, let's create them as separate issues and refer to parent in body.

      let body = i.description;
      if (i.parentId) {
         body += `\n\nPart of parent task: ${i.parentId}`;
      }

      await createGitHubIssue(accessToken, owner, repo, {
        title: i.title,
        body: body,
        milestone: i.milestoneId ? milestoneMap[i.milestoneId] : undefined,
        labels: i.labels
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error("Sync Error:", error);
    return { success: false, error: error.message };
  }
}
