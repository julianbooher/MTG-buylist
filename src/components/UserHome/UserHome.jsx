import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import SearchField from '../SearchField/SearchField.jsx'
import SearchResults from '../SearchResults/SearchResults.jsx';


function UserHome(props) {

  return (
    <div>
      <h2>User Home</h2>
      <SearchField />
      <SearchResults />
    </div>
  );
}

export default connect(mapStoreToProps)(UserHome);
