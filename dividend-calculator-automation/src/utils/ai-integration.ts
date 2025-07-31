import axios from 'axios';

export class AIIntegration {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async analyzeFeatureRequirements(requirements: string): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/analyze`, { requirements });
      return response.data;
    } catch (error) {
      console.error('Error analyzing feature requirements:', error);
      throw new Error('Failed to analyze feature requirements');
    }
  }

  async generateCodeFromAnalysis(analysis: any): Promise<string> {
    try {
      const response = await axios.post(`${this.apiUrl}/generate`, { analysis });
      return response.data.code;
    } catch (error) {
      console.error('Error generating code:', error);
      throw new Error('Failed to generate code');
    }
  }

  async validateGeneratedCode(code: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.apiUrl}/validate`, { code });
      return response.data.isValid;
    } catch (error) {
      console.error('Error validating generated code:', error);
      throw new Error('Failed to validate generated code');
    }
  }
}