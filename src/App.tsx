/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { RouterProvider } from 'react-router/dom';

/** providers */
import { AppProvider } from '@module-base/providers/AppProvider';

/** utils */
import { router } from '@src/utils/router';

/** styles */
import '@src/styles/index.css';

export function App() {
    return (
        <React.StrictMode>
            <AppProvider>
                <RouterProvider router={router} />
            </AppProvider>
        </React.StrictMode>
    );
}
