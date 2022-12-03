export function nextId(id) {
  return function () {
    return id++;
  };
}
