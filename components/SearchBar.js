import fetcher from "@/lib/fetcher";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SearchStyles from "./styles/SearchStyles";

function searchResults(breweries) {
  return breweries.map((brewery) => {
    return (
      <Link key={brewery.obdb_id} href={`/breweries/${brewery.obdb_id}`}>
        <a className="search__result">
          <strong>{brewery.name}</strong>
        </a>
      </Link>
    );
  });
}

export default function SearchBar() {
  const [display, setDisplay] = useState("none");
  const [breweries, setBreweries] = useState([]);
  const searchRef = useRef();

  async function handleInput(e) {
    const input = e.currentTarget.value;

    if (input.length > 1) setDisplay("block");
    try {
      const response = await fetcher(`/api/search?q=${input}`);
      if (response.breweries.length === 0) return;

      setBreweries(response.breweries);
    } catch (err) {
      toast.error("Could not perform search operation.");
    }
  }

  const clickOutside = (e) => {
    if (!searchRef.current?.contains(e.target)) {
      setDisplay("none");
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [searchRef, display]);

  return (
    <SearchStyles>
      <input
        className="search__input"
        type="text"
        placeholder="Search for a brewery..."
        name="search"
        onChange={handleInput}
      />
      <div
        ref={searchRef}
        className="search__results"
        style={{ display: `${display}` }}
      >
        {searchResults(breweries)}
      </div>
    </SearchStyles>
  );
}
