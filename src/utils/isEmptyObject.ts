export function isEmptyObject(obj: object) {
  return Boolean(
    obj && Object.keys(obj).length === 0 && obj.constructor === Object
  );
}
