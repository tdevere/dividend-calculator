export interface FeatureRequirement {
  title: string;
  description: string;
  acceptanceCriteria: string[];
  priority: 'low' | 'medium' | 'high';
}

export function parseFeatureRequirements(rawRequirements: string): FeatureRequirement {
  const lines = rawRequirements.split('\n').filter(line => line.trim() !== '');
  const title = lines[0].trim();
  const description = lines.slice(1, lines.length - 2).join('\n').trim();
  const acceptanceCriteria = lines[lines.length - 2].split(',').map(criteria => criteria.trim());
  const priority = lines[lines.length - 1].trim() as 'low' | 'medium' | 'high';

  return {
    title,
    description,
    acceptanceCriteria,
    priority,
  };
}