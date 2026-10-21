/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppTimer } from '@modules/base/constants';

/** components */
import { TooltipProvider } from '@modules/base/components/tooltip';
import { FallbackDefault } from '@app/providers/NotifyProvider/FallbackDefault';
import { NotifyBoundary } from '@app/providers/NotifyProvider/NotifyBoundary';

class NotifyProvider extends React.Component<
    App.Module.Base.Component.NotifyProviderProps,
    App.Module.Base.Component.NotifyProviderStates
> {
    constructor(props: App.Module.Base.Component.NotifyProviderProps) {
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
            <TooltipProvider delayDuration={AppTimer.delayTooltip}>
                {hasError ? <FallBack isAutoReload={isAutoReload} /> : children}
                <NotifyBoundary />
            </TooltipProvider>
        );
    }
}

export default NotifyProvider;
