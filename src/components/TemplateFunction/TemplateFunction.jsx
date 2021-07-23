import React, { useState } from 'react';

export default function TemplateFunction(props) {

  const [heading, setHeading] = useState('Functional Component');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}
