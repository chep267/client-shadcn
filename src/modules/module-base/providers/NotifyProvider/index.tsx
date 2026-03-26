/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import { TooltipProvider } from '@module-base/components/tooltip';
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
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary: ', error, '\n--\n', errorInfo, '\n--');
    }

    render() {
        const { children, fallback: FallBack = FallbackDefault, isAutoReload } = this.props;
        const { hasError } = this.state;

        return (
            <TooltipProvider>
                {hasError ? <FallBack isAutoReload={isAutoReload} /> : children}
                <NotifyBoundary />
            </TooltipProvider>
        );
    }
}

export default NotifyProvider;
