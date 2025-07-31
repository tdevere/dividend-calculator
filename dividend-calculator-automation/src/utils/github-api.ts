import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

export const createBranch = async (repoOwner, repoName, branchName, baseBranch) => {
    const response = await axios.post(`${GITHUB_API_URL}/repos/${repoOwner}/${repoName}/git/refs`, {
        ref: `refs/heads/${branchName}`,
        sha: baseBranch
    });
    return response.data;
};

export const createPullRequest = async (repoOwner, repoName, title, head, base) => {
    const response = await axios.post(`${GITHUB_API_URL}/repos/${repoOwner}/${repoName}/pulls`, {
        title,
        head,
        base
    });
    return response.data;
};

export const getPullRequest = async (repoOwner, repoName, pullNumber) => {
    const response = await axios.get(`${GITHUB_API_URL}/repos/${repoOwner}/${repoName}/pulls/${pullNumber}`);
    return response.data;
};

export const mergePullRequest = async (repoOwner, repoName, pullNumber) => {
    const response = await axios.put(`${GITHUB_API_URL}/repos/${repoOwner}/${repoName}/pulls/${pullNumber}/merge`);
    return response.data;
};

export const getBranch = async (repoOwner, repoName, branchName) => {
    const response = await axios.get(`${GITHUB_API_URL}/repos/${repoOwner}/${repoName}/branches/${branchName}`);
    return response.data;
};