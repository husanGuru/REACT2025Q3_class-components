import { Character } from '../../src/types/character.type';

export const mockCharacters: Character[] = [
  {
    uid: '1',
    name: 'John Matrix',
    gender: 'male',
    yearOfBirth: 1975,
    placeOfBirth: 'Earth',
    height: 185,
    weight: 90,
    bloodType: 'O+',
    maritalStatus: 'single',
    serialNumber: 'SN123456',
    alternateReality: false,
  },
  {
    uid: '2',
    name: 'Sarah Connor',
    gender: 'female',
    yearOfBirth: 1980,
    placeOfBirth: 'Earth-2',
    height: 170,
    weight: 60,
    bloodType: 'A-',
    maritalStatus: 'divorced',
    serialNumber: 'SN654321',
    alternateReality: true,
  },
];
