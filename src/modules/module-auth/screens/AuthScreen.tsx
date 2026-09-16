/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useLocation } from 'react-router';

/** constants */
import { AuthRouterPath } from '@module-auth/constants/path';

/** screens */
import LayerScreen from '@module-base/screens/LayerScreen';

/** lazy components */
const SigninForm = React.lazy(() => import('@module-auth/components/AuthForm/SigninForm'));
const RegisterForm = React.lazy(() => import('@module-auth/components/AuthForm/RegisterForm'));
const RecoverForm = React.lazy(() => import('@module-auth/components/AuthForm/RecoverForm'));

export default function AuthScreen() {
    const { pathname } = useLocation();

    return (
        <LayerScreen className="p-2" component="main">
            <React.Suspense>
                {pathname === AuthRouterPath.signin && <SigninForm />}
                {pathname === AuthRouterPath.register && <RegisterForm />}
                {pathname === AuthRouterPath.recover && <RecoverForm />}
            </React.Suspense>
        </LayerScreen>
    );
}
