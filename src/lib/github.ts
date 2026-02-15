export async function getGitHubRepos(accessToken: string) {
  try {
    const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=10", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) throw new Error("Failed to fetch repositories");
    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

export async function getGitHubIssues(accessToken: string, owner: string, repo: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=open&per_page=50`, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
      next: { revalidate: 60 }
    });

    if (!response.ok) throw new Error("Failed to fetch issues");
    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub issues:", error);
    return [];
  }
}

export async function getGitHubMilestones(accessToken: string, owner: string, repo: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/milestones?state=open`, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) throw new Error("Failed to fetch milestones");
    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub milestones:", error);
    return [];
  }
}

export async function createGitHubMilestone(accessToken: string, owner: string, repo: string, milestone: { title: string, description?: string }) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/milestones`, {
    method: "POST",
    headers: {
      Authorization: `token ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(milestone),
  });

  if (!response.ok) throw new Error("Failed to create milestone");
  return await response.json();
}

export async function createGitHubIssue(accessToken: string, owner: string, repo: string, issue: { title: string, body?: string, milestone?: number, labels?: string[] }) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `token ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(issue),
  });

  if (!response.ok) throw new Error("Failed to create issue");
  return await response.json();
}
