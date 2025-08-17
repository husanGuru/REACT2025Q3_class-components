'use server';

import { Character } from '@/types/character.types';

export async function generateCSV(items: Character[]) {
  const headers = ['UID', 'Name', 'Gender', 'YearOfBirth', 'URL'];
  const rows = items.map(({ uid, name, gender, yearOfBirth }) =>
    [uid, name, gender ?? '', yearOfBirth ?? '', `/character/${uid}`]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(',')
  );

  const csv = [headers.join(','), ...rows].join('\n');

  const base64 = Buffer.from(csv).toString('base64');
  const fileName = `${items.length}_items.csv`;

  return {
    base64Data: base64,
    fileName: fileName,
    mimeType: 'text/csv',
  };
}
