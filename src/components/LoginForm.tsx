import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login, selectState, typing } from "../features/login";
import "../styles/loginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const state = useAppSelector(selectState);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    console.log(dispatch(login({ email, password })));
  }

  function handleFormChange() {
    dispatch(typing());
  }

  function handleEmailChange(event: FormEvent) {
    setEmail((event.target as HTMLInputElement).value);
  }

  function handlePasswordChange(event: FormEvent) {
    setPassword((event.target as HTMLInputElement).value);
  }

  return (
    <form
      className="login-form"
      action="get"
      onSubmit={handleSubmit}
      onChange={handleFormChange}
    >
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" onChange={handleEmailChange} required />

      <label htmlFor="password">Пароль:</label>
      <input
        type="password"
        id="password"
        onChange={handlePasswordChange}
        required
      />

      <button className="form-button" disabled={state.status === "pending"}>
        Войти
      </button>
      {state.status === "failed" && <p>Неверный логин или пароль.</p>}
    </form>
  );
}

export default LoginForm;
