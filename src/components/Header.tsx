import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectState } from "../features/login";
import "../styles/header.css";

function Header() {
  const state = useAppSelector(selectState);

  return (
    <header className="header">
      <nav>
        <ul>
          {state.loggedIn && (
            <li>
              <Link to="/contacts">Контакты</Link>
            </li>
          )}
          <li>
            <Link to="/login">{state.loggedIn ? "Выйти" : "Войти"}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
