import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export const createBranch = async (owner: string, repo: string, branchName: string, baseBranch: string) => {
    const { data: refData } = await octokit.git.getRef({
        owner,
        repo,
        ref: `heads/${baseBranch}`,
    });

    await octokit.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branchName}`,
        sha: refData.object.sha,
    });
};

export const deleteBranch = async (owner: string, repo: string, branchName: string) => {
    await octokit.git.deleteRef({
        owner,
        repo,
        ref: `heads/${branchName}`,
    });
};

export const listBranches = async (owner: string, repo: string) => {
    const { data: branches } = await octokit.repos.listBranches({
        owner,
        repo,
    });
    return branches;
};