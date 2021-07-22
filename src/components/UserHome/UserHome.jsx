import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Form, Button } from 'react-bootstrap';


function UserHome(props) {

  const [searchQuery, setSearchQuery] = useState('')

  const search = (event) => {
    event.preventDefault();
    console.log('inside search, searchQuery: ', searchQuery);
  }

  return (
    <div>
      <h2>User Home</h2>
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

export default connect(mapStoreToProps)(UserHome);
