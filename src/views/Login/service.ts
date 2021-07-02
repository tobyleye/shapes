export const fakePass = "password";

export function login(password) {
  return new Promise((resolve, reject) => {
    // simulate a network request
    setTimeout(() => {
      if (password === fakePass) {
        resolve(null);
      } else {
        reject();
      }
    }, 400);
  });
}
