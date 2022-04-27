import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Header from "./components/Header";
import { selectState, setStateFromCookies } from "./features/login";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login";

function App() {
  const state = useAppSelector(selectState);

  const [checkedCookies, setCheckedCookies] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setStateFromCookies());
    setCheckedCookies(true);
  }, [dispatch]);

  return (
    <div className="App">
      {checkedCookies && (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="*" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            {state.loggedIn && (
              <Route path="/contacts" element={<Contacts />} />
            )}
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
