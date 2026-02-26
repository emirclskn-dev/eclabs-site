import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError)
      return (
        <div className="h-screen bg-[#06080F] flex items-center justify-center text-cyan-400 font-mono text-center px-4">
          System Reboot Required. <br /> Please refresh the page.
        </div>
      );
    return this.props.children;
  }
}

export default ErrorBoundary;
