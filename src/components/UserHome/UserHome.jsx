import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


function TemplateFunction(props) {


  return (
    <div>
      <h2>User Home</h2>
    </div>
  );
}

export default connect(mapStoreToProps)(TemplateFunction);
