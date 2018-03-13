import React, { Component } from 'react';
import Search from '../Search/Search';
import Table from '../Table/Table';
import Button from '../Button/Button';
import Loading from '../Loading/Loading';

import './App.css';

const DEFAULT_QUERY = 'react';
const DEFAULT_HPP = '10';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  state = {
    searchWord: DEFAULT_QUERY,
    result: null,
    isloading: false,
  };

  removeHandle = id => {
    const updatedHits = this.state.result.hits.filter(
      item => item.objectID !== id,
    );
    this.setState({
      result: {
        ...this.state.result,
        hits: updatedHits,
      },
    });
  };

  onSearchChange = e => {
    this.setState({
      searchWord: e.target.value,
    });
  };

  onSearchSubmit = e => {
    e.preventDefault();
    const { searchWord } = this.state;
    this.setState({ searchKey: searchWord });
    this.fetchSearch(searchWord);
  };

  fetchSearch = (searchWord, page = 0) => {
    this.setState({ isLoading: true });
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchWord}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`,
    )
      .then(response => response.json())
      .then(result => this.setSearch(result))
      .catch(error => error);
  };
  setSearch = result => {
    const { hits, page } = result;

    const oldHits = page !== 0 ? this.state.result.hits : [];

    const updatedHits = [...oldHits, ...hits];

    this.setState({
      result: { hits: updatedHits, page },
      isLoading: false,
    });
  };

  componentDidMount() {
    const { searchWord } = this.state;
    this.setState({ searchKey: searchWord });
    this.fetchSearch(searchWord);
  }

  render() {
    const { result, searchWord, isLoading } = this.state;
    const page = (result && result.page) || 0;

    if (!result) {
      return null;
    }

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchWord}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>

        {result ? (
          <Table list={result.hits} onRemove={this.removeHandle} />
        ) : null}
        <div className="interactions">
          {isLoading ? (
            <Loading />
          ) : (
            <Button onClick={() => this.fetchSearch(searchWord, page + 1)}>
              More
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
