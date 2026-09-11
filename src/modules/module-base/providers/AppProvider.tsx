/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';

/** constants */
import { AppTimer } from '@module-base/constants/config';

/** providers */
import { LanguageProvider } from '@module-base/providers/LanguageProvider';
import { ThemeProvider } from '@module-base/providers/ThemeProvider';
import { NotifyProvider } from '@module-base/providers/NotifyProvider';

/** Create a client */
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retryDelay: AppTimer.delay,
            staleTime: 1000 * 60 * 5, // 5 minutes (invalidate)
            gcTime: 1000 * 60 * 15, // 15 minutes (cache)
            retry: 1,
        },
    },
});

export function AppProvider(props: React.PropsWithChildren) {
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
