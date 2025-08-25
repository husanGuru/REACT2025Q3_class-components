import { useEffect } from 'react';

interface UseClickOutsideProps {
  ref: React.RefObject<HTMLDivElement | null>;
  onClickOutside: () => void;
}
export default function useClickOutside({
  ref,
  onClickOutside,
}: UseClickOutsideProps) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [ref, onClickOutside]);

  return {};
}
