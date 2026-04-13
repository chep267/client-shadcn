/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AccountState } from '@module-auth/constants/AccountState';
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** components */
import { ModalTokenExpired } from '@module-auth/components/ModalTokenExpired';

/** screens */
import AuthScreen from '@module-auth/screens/AuthScreen';

export default function AuthRoute(props: React.PropsWithChildren) {
    const { children } = props;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const prePath = useAuthStore((store) => store.data.prePath);
    const authAction = useAuthStore((store) => store.action);

    const token = Cookies.get(AppKey.token);
    const accountState = token ? AccountState.signedIn : AccountState.signin;

    React.useEffect(() => {
        const isAuthPath = Object.values(AuthRouterPath as Record<string, string>).includes(pathname);
        if (accountState === AccountState.signin && !isAuthPath) {
            /** not logged in, return to log in  */
            authAction.setData({ prePath: pathname });
            navigate(AuthRouterPath.signin, { replace: true });
        }
        if (accountState === AccountState.signedIn && isAuthPath) {
            /** logged in and go home */
            navigate(prePath, { replace: true });
        }
    }, [accountState, pathname]);

    return (
        <React.Fragment>
            <ModalTokenExpired />
            {accountState === AccountState.signedIn ? children : <AuthScreen />}
        </React.Fragment>
    );
}
