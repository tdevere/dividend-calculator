import { FeatureValidator } from '../../automation/agents/featureValidator';

describe('FeatureValidator', () => {
  let validator: FeatureValidator;

  beforeEach(() => {
    validator = new FeatureValidator();
  });

  it('should validate a feature with all required fields', () => {
    const feature = {
      name: 'New Feature',
      description: 'This is a new feature.',
      requirements: ['Requirement 1', 'Requirement 2'],
    };

    const result = validator.validate(feature);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should invalidate a feature missing required fields', () => {
    const feature = {
      name: '',
      description: 'This is a new feature.',
      requirements: [],
    };

    const result = validator.validate(feature);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Feature name is required.');
    expect(result.errors).toContain('At least one requirement is needed.');
  });

  it('should validate a feature with additional checks', () => {
    const feature = {
      name: 'Another Feature',
      description: 'This feature has specific requirements.',
      requirements: ['Requirement A', 'Requirement B'],
    };

    const result = validator.validate(feature);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});