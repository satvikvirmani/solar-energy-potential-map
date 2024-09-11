"use client";
import useSWR from 'swr';
import { useState, useRef } from "react";
import {LocationDetails} from "./details/locationDetails";
import {ErrorDetails} from "./details/errorDetails";
import {LoadingDetails} from "./details/loadingDetails";

import LocationMap from './locationMap';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);
  const formRef = useRef(null);

  const { data, error, isLoading } = useSWR(
    searchQuery
      ? `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(searchQuery)}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
      : null,
    fetcher
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(search);
  };

  const handleButtonSubmit = () => {
    formRef.current.requestSubmit();
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef} className='p-8 my-4'>
        <label
          htmlFor="Search"
          className="w-96 pr-8 p-2 relative mx-auto block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="text"
            id="Search"
            className="w-full peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            placeholder="Search"
            value={search}
            onChange={handleInputChange}
          />
          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            Search
          </span>
          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700" onClick={handleButtonSubmit}>
              <span className="sr-only">Search</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </span>
        </label>
      </form>
      {isLoading && <LoadingDetails />}
      {(error || (data?.results?.length === 0)) && <ErrorDetails />}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <div>
          {data?.results?.length > 0 && <LocationDetails data={data.results[0]} />}
        </div>
        <div>
          {data?.results?.length > 0 && data?.results[0].bbox && <LocationMap pos={[data.results[0].lat, data.results[0].lon]} bbox={data.results[0].bbox} /> }
        </div>
      </div>
    </>
  );
};

export default Search;