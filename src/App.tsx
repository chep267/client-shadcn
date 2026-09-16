/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { RouterProvider } from 'react-router/dom';

/** providers */
import { AppProvider } from '@module-base/providers/AppProvider';

/** utils */
import { router } from '@src/utils/router';

/** styles */
import '@src/styles/index.css';

export function App() {
    return (
        <AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
    );
}
