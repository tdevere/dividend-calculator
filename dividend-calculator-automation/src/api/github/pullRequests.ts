import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export const createPullRequest = async (owner: string, repo: string, title: string, head: string, base: string, body: string) => {
    try {
        const response = await octokit.pulls.create({
            owner,
            repo,
            title,
            head,
            base,
            body,
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create pull request: ${error.message}`);
    }
};

export const getPullRequest = async (owner: string, repo: string, pull_number: number) => {
    try {
        const response = await octokit.pulls.get({
            owner,
            repo,
            pull_number,
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to get pull request: ${error.message}`);
    }
};

export const mergePullRequest = async (owner: string, repo: string, pull_number: number) => {
    try {
        const response = await octokit.pulls.merge({
            owner,
            repo,
            pull_number,
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to merge pull request: ${error.message}`);
    }
};