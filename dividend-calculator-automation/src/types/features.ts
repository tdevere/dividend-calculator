export interface FeatureRequirement {
  title: string;
  description: string;
  acceptanceCriteria: string[];
  priority: 'low' | 'medium' | 'high';
  estimatedCompletionTime: number; // in hours
}

export interface GeneratedFeature {
  branchName: string;
  code: string;
  tests: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
}