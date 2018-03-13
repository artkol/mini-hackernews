import React from 'react';

const Search = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={onChange} />
    <button type="submit">search</button>
  </form>
);

export default Search;
