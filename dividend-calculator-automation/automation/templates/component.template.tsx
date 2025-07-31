import React from 'react';

interface ComponentProps {
  title: string;
  content: string;
  onAction: () => void;
}

const Component: React.FC<ComponentProps> = ({ title, content, onAction }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2">{content}</p>
      <button
        onClick={onAction}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Action
      </button>
    </div>
  );
};

export default Component;