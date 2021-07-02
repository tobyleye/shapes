export const fakePass: string = "password";

export function login(password: string) {
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
