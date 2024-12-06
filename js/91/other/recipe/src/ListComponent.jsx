import React from 'react';
import './ListComponent.css';

export default function ListComponent(props) {
  const {name, list} = props;
  return (
    <>
      <h5>{name}</h5>
      <ul className="bulletless">
        {list.map((i, index) => <li key={index}>{i}</li>)}
      </ul>
    </>
  )
}
