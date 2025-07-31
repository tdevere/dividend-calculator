export interface GitHubBranch {
  name: string;
  commit: string;
  protected: boolean;
}

export interface GitHubPullRequest {
  id: number;
  title: string;
  body: string;
  state: 'open' | 'closed' | 'merged';
  user: {
    login: string;
  };
  createdAt: string;
  updatedAt: string;
  mergedAt?: string;
}

export interface GitHubWebhookEvent {
  action: string;
  repository: {
    id: number;
    name: string;
    full_name: string;
  };
  sender: {
    login: string;
  };
  pull_request?: GitHubPullRequest;
  ref?: string;
}