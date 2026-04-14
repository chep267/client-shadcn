/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AccountState } from '@module-auth/constants/AccountState';
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** components */
import { StartLoading } from '@module-base/components/start-loading';
import { ModalTokenExpired } from '@module-auth/components/ModalTokenExpired';

/** screens */
import AuthScreen from '@module-auth/screens/AuthScreen';

export default function AuthRoute(props: React.PropsWithChildren) {
    const { children } = props;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isAuthentication = useAuthStore((store) => !!store.data.user);
    const prePath = useAuthStore((store) => store.data.prePath);
    const authAction = useAuthStore((store) => store.action);
    const settingAction = useSettingStore((store) => store.action);

    const token = Cookies.get(AppKey.token);
    const accountState = isAuthentication ? AccountState.signedIn : token ? AccountState.reSignin : AccountState.signin;

    React.useEffect(() => {
        const isAuthPath = Object.values(AuthRouterPath as Record<string, string>).includes(pathname);
        switch (true) {
            case accountState === AccountState.signin && !isAuthPath:
                /** not logged in, return to log in  */
                authAction.setData({ prePath: pathname });
                navigate(AuthRouterPath.signin, { replace: true });
                break;
            case accountState === AccountState.reSignin:
                settingAction.updateStatusCode(axios.HttpStatusCode.Unauthorized);
                break;
            case accountState === AccountState.signedIn && isAuthPath:
                /** logged in and go home */
                navigate(prePath, { replace: true });
                break;
            default:
                break;
        }
    }, [accountState, pathname]);

    return (
        <React.Fragment>
            <ModalTokenExpired />
            {accountState === AccountState.signedIn ? (
                children
            ) : accountState === AccountState.reSignin ? (
                <StartLoading />
            ) : (
                <AuthScreen />
            )}
        </React.Fragment>
    );
}
