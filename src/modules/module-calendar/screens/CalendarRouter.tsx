/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

/** screens */
const CalendarScreen = React.lazy(() => import('@module-calendar/screens/CalendarScreen'));

export default function CalendarRouter() {
    return (
        <React.Suspense>
            <Routes>
                <Route index element={<CalendarScreen />} />
            </Routes>
        </React.Suspense>
    );
}
