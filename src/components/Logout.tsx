import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/login/login";
import "../styles/logout.css";

function Logout() {
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className="logout">
      <h4>Вы вошли</h4>
      <button className="form-button" onClick={handleLogout}>
        Выйти
      </button>
    </div>
  );
}

export default Logout;
