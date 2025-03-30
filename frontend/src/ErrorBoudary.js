import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Profile page error:', error);
  }

  render() {
    return this.state.hasError
      ? <div>Profile failed to load</div>
      : this.props.children;
  }
}
