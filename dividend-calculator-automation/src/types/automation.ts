export interface FeatureRequest {
  title: string;
  description: string;
  requirements: string[];
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

export interface GeneratedCode {
  componentName: string;
  code: string;
  tests: string;
}

export interface AutomationStatus {
  featureRequestId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}