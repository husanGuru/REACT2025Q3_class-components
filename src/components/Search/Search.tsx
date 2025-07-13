import { useRef } from 'react';

interface SearchProps {
  onChange: (searchTerm: string) => void;
}
export default function Search({ onChange }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input type="text" placeholder="Enter search text" ref={inputRef} />
      <button onClick={() => onChange(inputRef.current?.value || '')}>
        Search
      </button>
    </div>
  );
}
