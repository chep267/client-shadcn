/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route } from 'react-router';

/** screens */
const FeedScreen = React.lazy(() => import('@module-feed/screens/FeedScreen'));

export default function FeedRouter() {
    return (
        <React.Suspense>
            <Routes>
                <Route index element={<FeedScreen />} />
            </Routes>
        </React.Suspense>
    );
}
