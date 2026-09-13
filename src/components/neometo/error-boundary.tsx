import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

/**
 * Section-level boundary: a section that throws is left out rather than
 * taking the whole page down. Nothing is ever shown to the visitor.
 */
export class SectionErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Section failed to render:", error, info.componentStack);
  }

  override render() {
    if (this.state.hasError) return <></>;
    return this.props.children;
  }
}
