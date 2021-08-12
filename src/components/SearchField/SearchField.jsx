import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Form, Button } from 'react-bootstrap';


export default function SearchField(props) {
  const dispatch = useDispatch();
  const [searchParameter, setSearchParameter] = useState('')

  const search = (event) => {
    event.preventDefault();
    dispatch({ type: 'SEARCH', payload: { searchParameter: searchParameter, page: 1 } })
    console.log('inside search, searchQuery: ', searchParameter);
  }

  return (
    <div>
      <Form
        className="card-search-form"
        onSubmit={e => { search(e) }}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Card</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search for a card name."
            value={searchParameter}
            onChange={e => setSearchParameter(e.target.value)}
          />
        </Form.Group>
        <Button
          className="btn card-search-btn"
          type="submit"
          name="submit"
        >
          Search
        </Button>
      </Form>
    </div>
  );
}