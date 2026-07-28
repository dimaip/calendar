import React, { Component, createRef } from 'react';
import * as Sentry from '@sentry/react';
import { useLocation } from 'react-router-dom';

import './RouteErrorBoundary.css';

const pageStyles: React.CSSProperties = {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '24px',
};

const messageStyles: React.CSSProperties = {
    fontFamily: "'PTRootUI', 'Helvetica', sans-serif",
    maxWidth: '520px',
};

const headingStyles: React.CSSProperties = {
    fontSize: '24px',
    marginBottom: '12px',
};

const actionsStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '24px',
};

const buttonStyles: React.CSSProperties = {
    border: '1px solid currentColor',
    borderRadius: '4px',
    cursor: 'pointer',
    font: 'inherit',
    padding: '10px 14px',
};

interface ApplicationErrorBoundaryProps {
    children: React.ReactNode;
    resetKey: string;
}

interface ApplicationErrorBoundaryState {
    error: Error | null;
}

class ApplicationErrorBoundary extends Component<ApplicationErrorBoundaryProps, ApplicationErrorBoundaryState> {
    state: ApplicationErrorBoundaryState = {
        error: null,
    };

    private readonly headingRef = createRef<HTMLHeadingElement>();

    static getDerivedStateFromError(error: Error): ApplicationErrorBoundaryState {
        return { error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        Sentry.captureException?.(error, {
            extra: {
                componentStack: errorInfo.componentStack,
            },
        });
        this.headingRef.current?.focus();
    }

    componentDidUpdate(previousProps: ApplicationErrorBoundaryProps): void {
        if (this.state.error && previousProps.resetKey !== this.props.resetKey) {
            this.setState({ error: null });
        }
    }

    private readonly retry = (): void => {
        this.setState({ error: null });
    };

    private readonly reload = (): void => {
        window.location.reload();
    };

    render(): React.ReactNode {
        if (!this.state.error) {
            return this.props.children;
        }

        return (
            <main style={pageStyles}>
                <section role="alert" aria-labelledby="application-error-title" style={messageStyles}>
                    <h1 id="application-error-title" ref={this.headingRef} style={headingStyles} tabIndex={-1}>
                        Что-то пошло не так
                    </h1>
                    <p>Не удалось открыть эту страницу. Можно попробовать ещё раз или перезагрузить приложение.</p>
                    <div style={actionsStyles}>
                        <button
                            className="route-error-boundary__button"
                            type="button"
                            style={buttonStyles}
                            onClick={this.retry}
                        >
                            Попробовать ещё раз
                        </button>
                        <button
                            className="route-error-boundary__button"
                            type="button"
                            style={buttonStyles}
                            onClick={this.reload}
                        >
                            Перезагрузить приложение
                        </button>
                    </div>
                </section>
            </main>
        );
    }
}

const RouteErrorBoundary = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const resetKey = `${location.key}:${location.pathname}${location.search}${location.hash}`;

    return <ApplicationErrorBoundary resetKey={resetKey}>{children}</ApplicationErrorBoundary>;
};

export default RouteErrorBoundary;
