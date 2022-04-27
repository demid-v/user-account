import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectLogin } from "../features/login/login";
import "../styles/header.css";

function Header() {
  const { loggedIn } = useAppSelector(selectLogin);

  return (
    <header className="header">
      <nav>
        <ul>
          {loggedIn && (
            <li>
              <Link to="/contacts">Контакты</Link>
            </li>
          )}
          <li>
            <Link to="/login">{loggedIn ? "Выйти" : "Войти"}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
