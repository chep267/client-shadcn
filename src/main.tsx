/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { SpeedInsights } from '@vercel/speed-insights/react';

/** providers */
import AppProvider from '@module-base/providers/AppProvider';

/** screens */
import MainScreen from '@module-global/screens/MainScreen';

/** styles */
import '@src/main.css';

const root = createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <AppProvider>
            <MainScreen />
            <SpeedInsights />
        </AppProvider>
    </React.StrictMode>
);
