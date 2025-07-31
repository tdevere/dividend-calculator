import React, { useEffect, useState } from 'react';
import { getAutomationStatus } from '@/api/automation/featureProcessor';
import { AutomationStatus } from '@/types/automation';

const AutomationDashboard: React.FC = () => {
  const [status, setStatus] = useState<AutomationStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await getAutomationStatus();
        setStatus(response);
      } catch (error) {
        console.error('Error fetching automation status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Automation Dashboard</h1>
      <ul className="mt-4">
        {status.map((item) => (
          <li key={item.id} className="border-b py-2">
            <h2 className="font-semibold">{item.featureName}</h2>
            <p>Status: {item.status}</p>
            <p>Last Updated: {new Date(item.updatedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutomationDashboard;