import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { searchContactsThunk } from "../features/contacts/contacts";
import { selectLogin } from "../features/login/login";

function Search() {
  let [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");
  const [query, setQuery] = useState(inputValue);

  const { userId } = useAppSelector(selectLogin);

  function handleInputChange(event: FormEvent) {
    setInputValue((event.target as HTMLInputElement).value);
  }

  function changeQueryParams(query: string) {
    if (query.trim() === "") {
      setSearchParams({});
    } else {
      setSearchParams({ q: query });
    }
  }

  const dispatch = useAppDispatch();

  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    if (userId !== undefined) {
      if (isInit) {
        setIsInit(false);
      } else {
        changeQueryParams(query);
      }
      dispatch(searchContactsThunk({ userId, query }));
    }
  }, [query]);

  function searchContacts() {
    if (inputValue !== query) {
      setQuery(inputValue);
    }
  }

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Поиск..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={searchContacts}
      />
    </div>
  );
}

export default Search;
