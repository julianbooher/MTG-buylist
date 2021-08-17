import React from 'react';
import { useSelector } from 'react-redux';
import SearchResultsCard from './SearchResultsCard';
import { Container, Col, Row } from 'react-bootstrap';



export default function SearchResults(props) {

  const searchResults = useSelector(state => state.searchResults);


  return (
    <div>
      <h2>Search Results</h2>
      <Container>
        <Row>
          {searchResults.map((searchResult, i) => {
            return <Col xs={12} md={4} key={i}><SearchResultsCard searchResult={searchResult} /></Col>
          })}
        </Row>
      </Container>
    </div>
  );
}