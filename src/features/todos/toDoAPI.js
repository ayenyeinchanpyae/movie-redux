// A mock function to mimic making an async request for data
export function saveToDoApi(id) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id, text: "Dummy" }), 500)
  );
}
