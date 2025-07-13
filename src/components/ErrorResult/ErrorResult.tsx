import React from 'react';

interface ErrorResultProps {
  error: string;
}

export default function ErrorResult({ error }: ErrorResultProps) {
  return <div>{error}</div>;
}
