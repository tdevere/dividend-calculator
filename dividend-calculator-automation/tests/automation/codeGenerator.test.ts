import { CodeGenerator } from '../../automation/agents/codeGenerator';
import { FeatureValidator } from '../../automation/agents/featureValidator';

describe('CodeGenerator', () => {
  let codeGenerator: CodeGenerator;
  let featureValidator: FeatureValidator;

  beforeEach(() => {
    codeGenerator = new CodeGenerator();
    featureValidator = new FeatureValidator();
  });

  it('should generate code for a valid feature request', () => {
    const featureRequest = {
      name: 'New Feature',
      description: 'This is a new feature.',
      requirements: {
        component: true,
        tests: true,
      },
    };

    const generatedCode = codeGenerator.generate(featureRequest);
    const isValid = featureValidator.validate(generatedCode, featureRequest.requirements);

    expect(isValid).toBe(true);
    expect(generatedCode).toContain('New Feature');
  });

  it('should throw an error for an invalid feature request', () => {
    const invalidFeatureRequest = {
      name: '',
      description: '',
      requirements: {
        component: true,
        tests: true,
      },
    };

    expect(() => {
      codeGenerator.generate(invalidFeatureRequest);
    }).toThrow('Invalid feature request');
  });

  it('should generate tests for the generated code', () => {
    const featureRequest = {
      name: 'Test Feature',
      description: 'This feature requires tests.',
      requirements: {
        component: true,
        tests: true,
      },
    };

    const generatedCode = codeGenerator.generate(featureRequest);
    const testCode = codeGenerator.generateTests(generatedCode);

    expect(testCode).toContain('describe');
    expect(testCode).toContain('it');
  });
});