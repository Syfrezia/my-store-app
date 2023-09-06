import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function useSearch() {
  return useContext(SearchContext);
}

function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => setSearchTerm(term);

  return (
    <SearchContext.Provider value={{ searchTerm, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
