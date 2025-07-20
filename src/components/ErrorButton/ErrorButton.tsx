import { Component } from 'react';
import styles from './ErrorButton.module.css';

class ErrorButton extends Component {
  state = {
    shouldThrow: false,
  };

  handleClick = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('custom render error');
    }

    return (
      <button className={styles.error} onClick={this.handleClick}>
        Throw error
      </button>
    );
  }
}

export default ErrorButton;
