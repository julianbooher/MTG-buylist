import React from 'react';
import { useSelector } from 'react-redux';
import SearchResultsCard from './SearchResultsCard';


export default function SearchResults(props) {

  const searchResults = useSelector(state => state.searchResults);


  return (
    <div>
      <h2>Search Results</h2>
      {searchResults.map((searchResult, i) => {
        return <SearchResultsCard key={i} searchResult={searchResult} />
      })}

    </div>
  );
}