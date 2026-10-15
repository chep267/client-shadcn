/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { RouterProvider } from 'react-router/dom';

/** providers */
import { AppProvider } from '@app/providers';

/** utils */
import { router } from '@app/router';

/** styles */
import '@app/styles/index.css';

export function App() {
    return (
        <React.StrictMode>
            <AppProvider>
                <RouterProvider router={router} />
            </AppProvider>
        </React.StrictMode>
    );
}
