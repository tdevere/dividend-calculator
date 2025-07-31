import React, { useEffect, useState } from 'react';

const StatusMonitor: React.FC = () => {
  const [status, setStatus] = useState<string>('Initializing...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/status'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch status');
        }
        const data = await response.json();
        setStatus(data.status);
      } catch (err) {
        setError(err.message);
        setStatus('Error fetching status');
      }
    };

    fetchStatus();
    const intervalId = setInterval(fetchStatus, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="status-monitor">
      <h2>Status Monitor</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <p className="status">{status}</p>
      )}
    </div>
  );
};

export default StatusMonitor;