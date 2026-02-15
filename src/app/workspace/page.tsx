import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { WorkspaceLayout } from "@/components/workspace/WorkspaceLayout";
import { getGitHubIssues, getGitHubMilestones } from "@/lib/github";

export default async function WorkspacePage(props: { searchParams: Promise<{ repo?: string }> }) {
  const session = await auth();
  const searchParams = await props.searchParams;
  const repoFullName = searchParams.repo;

  if (!session) redirect("/");
  if (!repoFullName) redirect("/repositories");

  const [owner, repo] = repoFullName.split("/");

  // @ts-ignore
  const accessToken = session.accessToken;
  
  const [issues, milestones] = await Promise.all([
    getGitHubIssues(accessToken, owner, repo),
    getGitHubMilestones(accessToken, owner, repo)
  ]);

  return (
    <WorkspaceLayout 
      issues={issues} 
      milestones={milestones} 
      repoFullName={repoFullName} 
    />
  );
}
