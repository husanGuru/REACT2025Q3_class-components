import { Component } from 'react';
import ErrorResult from './components/ErrorResult/ErrorResult';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import Result from './components/Result/Result';
import Search from './components/Search/Search';
import { getSearch } from './utils/storage';
import { getCharacters } from './api/startrek';

import './App.css';
import Loading from './components/Loading/Loading';

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
    console.log('App mounted');
    this.fetchChatacters(this.state.searchTerm);
    // Initialize something if needed
  }

  componentDidUpdate(_: unknown, prevState: AppState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      console.log('Search term changed:', this.state.searchTerm);

      this.fetchChatacters(this.state.searchTerm);
    }
  }

  componentWillUnmount() {
    console.log('App will unmount');
    // Cleanups here
  }

  handleSearchChange(newTerm: string) {
    this.setState({ searchTerm: newTerm.trim() });
  }

  async fetchChatacters(searchTerm: string) {
    this.setState({ isLoading: true });
    try {
      const fetchedCharacters = await getCharacters(searchTerm);
      console.log(fetchedCharacters);

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
        <div>
          {/* Assuming Search accepts onChange as a prop */}
          <Search onChange={this.handleSearchChange} />
          {this.state.isLoading ? (
            <Loading />
          ) : (
            <Result characters={this.state.characters} />
          )}
          {this.state.error && <ErrorResult error={this.state.error} />}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
