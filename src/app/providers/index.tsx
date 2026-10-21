/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

/** constants */
import { AppTimer } from '@modules/base/constants';

/** providers */
import LanguageProvider from '@app/providers/LanguageProvider';
import ThemeProvider from '@app/providers/ThemeProvider';
import NotifyProvider from '@app/providers/NotifyProvider';

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
            <LanguageProvider>
                <ThemeProvider>
                    <NotifyProvider>{children}</NotifyProvider>
                </ThemeProvider>
            </LanguageProvider>
        </QueryClientProvider>
    );
}
