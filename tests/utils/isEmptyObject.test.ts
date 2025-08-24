import { describe, it, expect } from 'vitest';
import { isEmptyObject } from '../../src/utils/isEmptyObject';

describe('isEmptyObject', () => {
  it('returns true for an empty object', () => {
    expect(isEmptyObject({})).toBe(true);
  });

  it('returns false for a non-empty object', () => {
    expect(isEmptyObject({ key: 'value' })).toBe(false);
  });

  it('returns false for null', () => {
    expect(isEmptyObject(null as unknown as object)).toBe(false);
  });

  it('returns false for non-object types', () => {
    expect(isEmptyObject([] as unknown as object)).toBe(false);
    expect(isEmptyObject('string' as unknown as object)).toBe(false);
    expect(isEmptyObject(42 as unknown as object)).toBe(false);
  });
});
