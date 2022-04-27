import { useAppSelector } from "../app/hooks";
import LoginForm from "../components/LoginForm";
import Logout from "../components/Logout";
import { selectState } from "../features/login";

function Login() {
  const state = useAppSelector(selectState);

  return <main>{state.loggedIn ? <Logout /> : <LoginForm />}</main>;
}

export default Login;
