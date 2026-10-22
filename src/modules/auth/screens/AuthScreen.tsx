/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Route, Routes } from 'react-router';

/** constants */
import { AuthRouterPath } from '@modules/auth/constants';

/** screens */
import LayerScreen from '@modules/base/screens/LayerScreen';

/** lazy components */
const Start = React.lazy(() => import('@modules/base/components/start-loading'));
const SigninForm = React.lazy(() => import('@modules/auth/components/AuthForm/SigninForm'));
const RegisterForm = React.lazy(() => import('@modules/auth/components/AuthForm/RegisterForm'));
const RecoverForm = React.lazy(() => import('@modules/auth/components/AuthForm/RecoverForm'));

export default function AuthScreen() {
    return (
        <LayerScreen className="p-2" component="main">
            <React.Suspense>
                <Routes>
                    <Route path={AuthRouterPath.start} element={<Start />} />
                    <Route path={AuthRouterPath.signin} element={<SigninForm />} />
                    <Route path={AuthRouterPath.register} element={<RegisterForm />} />
                    <Route path={AuthRouterPath.recover} element={<RecoverForm />} />
                </Routes>
            </React.Suspense>
        </LayerScreen>
    );
}
