import { Character } from '../types/character.type';

export function downloadCSV(items: Character[]) {
  if (!items.length) return;

  const headers = ['UID', 'Name', 'Gender', 'YearOfBirth', 'URL'];
  const rows = items.map(({ uid, name, gender, yearOfBirth }) =>
    [
      uid,
      name,
      gender,
      yearOfBirth,
      `${window.location.origin}/character/${uid}`,
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(',')
  );

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const filename = `${items.length}_items.csv`;
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
