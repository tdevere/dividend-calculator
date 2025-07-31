import { useState, useEffect } from 'react';

function useCustomHook(initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Effect logic here
    return () => {
      // Cleanup logic here
    };
  }, [value]);

  const updateValue = (newValue) => {
    setValue(newValue);
  };

  return [value, updateValue];
}

export default useCustomHook;