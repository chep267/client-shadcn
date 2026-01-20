/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** lazy components */
import FallbackDefault from '@module-base/providers/NotifyProvider/FallbackDefault';
import NotifyBoundary from '@module-base/providers/NotifyProvider/NotifyBoundary';

class NotifyProvider extends React.Component<
    App.ModuleBase.Component.NotifyProviderProps,
    App.ModuleBase.Component.NotifyProviderStates
> {
    constructor(props: App.ModuleBase.Component.NotifyProviderProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // Update the state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
        console.log('ErrorBoundary: ', error, '\n--\n', errorInfo, '\n--');
    }

    render() {
        const { children, fallback: FallBack = FallbackDefault, isAutoReload } = this.props;
        const { hasError } = this.state;

        return (
            <React.Fragment>
                {hasError ? <FallBack isAutoReload={isAutoReload} /> : children}
                <NotifyBoundary />
            </React.Fragment>
        );
    }
}

export default NotifyProvider;
