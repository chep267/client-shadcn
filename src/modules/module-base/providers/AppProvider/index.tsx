/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';

/** providers */
import LanguageProvider from '@module-base/providers/LanguageProvider';
import ThemeProvider from '@module-base/providers/ThemeProvider';
import NotifyProvider from '@module-base/providers/NotifyProvider';

/** Create a client */
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchIntervalInBackground: false,
            refetchInterval: false,
            refetchOnReconnect: false,
            retryDelay: AppTimer.delay,
        },
    },
});

export default function AppProvider(props: React.PropsWithChildren) {
    const { children } = props;

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <LanguageProvider>
                    <ThemeProvider>
                        <NotifyProvider>{children}</NotifyProvider>
                    </ThemeProvider>
                </LanguageProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}
