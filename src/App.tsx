import { Component } from 'react';
import ErrorResult from './components/ErrorResult/ErrorResult';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import Result from './components/Result/Result';
import Search from './components/Search/Search';
import { getSearch, setSearch } from './utils/storage';
import { getCharacters } from './api/startrek';

import Loading from './components/Loading/Loading';
import ErrorButton from './components/ErrorButton/ErrorButton';

interface AppState {
  searchTerm: string;
  characters: [];
  isLoading: boolean;
  error: string | null;
}

class App extends Component<Record<never, never>, AppState> {
  constructor(props: Record<never, never>) {
    super(props);

    this.state = {
      searchTerm: getSearch(),
      characters: [],
      isLoading: false,
      error: null,
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.fetchCharacters(this.state.searchTerm);
  }

  componentDidUpdate(_: unknown, prevState: AppState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.fetchCharacters(this.state.searchTerm);
    }
  }

  handleSearchChange(newTerm: string) {
    this.setState({ searchTerm: newTerm.trim() });
    setSearch(newTerm.trim());
  }

  async fetchCharacters(searchTerm: string) {
    this.setState({ isLoading: true });
    try {
      const fetchedCharacters = await getCharacters(searchTerm);

      this.setState({ characters: fetchedCharacters.characters });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setState({ error: error.message });
      } else {
        this.setState({ error: 'An unknown error occurred' });
      }
    }
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <ErrorBoundary>
        <>
          {/* Assuming Search accepts onChange as a prop */}
          <Search
            onChange={this.handleSearchChange}
            value={this.state.searchTerm}
          />

          {this.state.error ? (
            <ErrorResult error={this.state.error} />
          ) : this.state.isLoading ? (
            <Loading />
          ) : (
            <Result characters={this.state.characters} />
          )}

          <ErrorButton />
        </>
      </ErrorBoundary>
    );
  }
}

export default App;
