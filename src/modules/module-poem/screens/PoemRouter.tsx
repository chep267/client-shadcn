/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

/** screens */
const PoemScreen = React.lazy(() => import('@module-poem//screens/PoemScreen'));

export default function PoemRouter() {
    return (
        <React.Suspense>
            <Routes>
                <Route index element={<PoemScreen />} />
            </Routes>
        </React.Suspense>
    );
}
