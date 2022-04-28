import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");
  const [query, setQuery] = useState(inputValue);

  useEffect(() => {
    setInputValue(searchParams.get("q") || "");
    setQuery(inputValue);
  }, [searchParams]);

  function handleInputChange(event: FormEvent) {
    setInputValue((event.target as HTMLInputElement).value);
  }

  function changeQueryParams(query: string) {
    if (query === "") {
      setSearchParams({});
    } else {
      setSearchParams({ q: query });
    }
  }

  function searchContacts() {
    if (inputValue !== query) {
      changeQueryParams(inputValue);
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
