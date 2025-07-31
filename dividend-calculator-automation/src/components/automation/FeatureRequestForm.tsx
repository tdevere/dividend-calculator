import React, { useState } from 'react';

const FeatureRequestForm: React.FC = () => {
  const [featureName, setFeatureName] = useState('');
  const [featureDescription, setFeatureDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/feature-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featureName, featureDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feature request');
      }

      setSuccess(true);
      setFeatureName('');
      setFeatureDescription('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Submit a Feature Request</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Feature request submitted successfully!</p>}
      <div>
        <label htmlFor="featureName" className="block text-sm font-medium">Feature Name</label>
        <input
          type="text"
          id="featureName"
          value={featureName}
          onChange={(e) => setFeatureName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div>
        <label htmlFor="featureDescription" className="block text-sm font-medium">Feature Description</label>
        <textarea
          id="featureDescription"
          value={featureDescription}
          onChange={(e) => setFeatureDescription(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`mt-4 w-full bg-blue-500 text-white p-2 rounded-md ${loading ? 'opacity-50' : ''}`}
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
};

export default FeatureRequestForm;