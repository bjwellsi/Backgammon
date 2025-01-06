import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true, errorMessage: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorMessage: error.message });
    console.error("Error caught: ", error, errorInfo);
  }

  clearError(): void {
    const errPopup = document.getElementById("error-popup");
    if (errPopup) {
      errPopup.textContent = "";
    }
    this.setState({ hasError: false, errorMessage: null });
  }

  render() {
    return (
      <>
        {this.state.hasError && (
          <div
            id="error-overlay"
            className="overlay show-overlay"
            onClick={() => this.clearError()}
          >
            <div
              id="error-popup"
              className="popup show-popup"
              onClick={() => this.clearError()}
            >
              {this.state.errorMessage}
            </div>
          </div>
        )}
        {this.props.children}
      </>
    );
  }
}

export { ErrorBoundary };
