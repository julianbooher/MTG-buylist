import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


export default function SearchField(props) {

  const [searchQuery, setSearchQuery] = useState('')

  const search = (event) => {
    event.preventDefault();
    console.log('inside search, searchQuery: ', searchQuery);
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
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
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