import { Component, type ChangeEvent } from 'react';

import styles from './Search.module.css';

interface SearchProps {
  onChange: (searchTerm: string) => void;
  value: string;
}

interface SearchState {
  input: string;
}

export default class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);

    this.state = {
      input: props.value || '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <div className={styles.search}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter search text"
          value={this.state.input}
          onChange={this.handleInputChange}
        />
        <button
          className={styles.btn}
          onClick={() => this.props.onChange(this.state.input)}
        >
          Search
        </button>
      </div>
    );
  }
}
