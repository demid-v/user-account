function getUser({ email, password }: { email: string; password: string }) {
  return fetch(
    `http://localhost:3001/users?email=${email}&password=${password}`,
    {
      method: "GET",
    }
  );
}

export { getUser };
