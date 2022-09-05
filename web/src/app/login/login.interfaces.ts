interface LoginInput {
  email: string;
  password: string;
}

interface LoginOutput {
  access_token: string;
}

export { LoginInput, LoginOutput };
