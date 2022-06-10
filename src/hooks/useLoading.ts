import { useState } from 'react';

export const useLoading = (defaultValue?: boolean) => {
  const [loading, setLoading] = useState(defaultValue ? defaultValue : false);

  const toggleValue = (value?: boolean) => {
    setLoading(currentValue => typeof value === 'boolean' ? value : !currentValue);
  };

  return [loading, toggleValue];
}