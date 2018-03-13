import React from 'react';
import Button from '../Button/Button';

const Table = ({ list, onRemove, sortKey, onSort }) => (
  <div className="table">
    {list.map(item => (
      <div key={item.objectID} className="table-row">
        <span className="first"> {item.title}</span>
        <span className="second"> by: {item.author}</span>
        <span className="third"> points: {item.points}</span>
        <span className="fourth">
          <Button
            className="button-inline"
            onClick={() => onRemove(item.objectID)}
          >
            Remove
          </Button>
        </span>
      </div>
    ))}
  </div>
);

export default Table;
