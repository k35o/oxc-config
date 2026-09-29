// Every statement below has exactly one problem. The React Compiler rules
// must not report what the established hooks rules already report.
import { useCallback, useEffect, useMemo, useState } from 'react';

export function Counter({ enabled }: { enabled: boolean }) {
  const [count, setCount] = useState(0);
  if (enabled) {
    useEffect(() => {
      document.title = String(count);
    }, [count]);
  }
  const doubled = useMemo(() => count * 2, []);
  const increment = useCallback(() => {
    setCount(count + 1);
  }, []);
  const Label = () => <span>{doubled}</span>;
  return (
    <button type="button" onClick={increment}>
      <Label />
    </button>
  );
}
