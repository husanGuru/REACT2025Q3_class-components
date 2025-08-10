import { useEffect } from 'react';
import { useNavigate } from 'react-router';

interface UseClickOutsideProps {
  ref: React.RefObject<HTMLDivElement | null>;
  link: string;
}
export default function useClickOutside({ ref, link }: UseClickOutsideProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        navigate(link); // close panel
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [link, ref, navigate]);

  return {};
}
