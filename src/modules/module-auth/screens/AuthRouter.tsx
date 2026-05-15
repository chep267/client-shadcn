/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import axios from 'axios';

/** constants */
import { AccountState } from '@module-auth/constants/status';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** components */
import { StartLoading } from '@module-base/components/start-loading';

/** screens */
const AuthScreen = React.lazy(() => import('@module-auth/screens/AuthScreen'));

export default function AuthRouter(props: React.PropsWithChildren) {
    const { children } = props;

    const isAuthentication = useAuthStore((store) => !!store.data.user);
    const settingAction = useSettingStore((store) => store.action);

    const token = useAuthStore((store) => store.data.token);
    const accountState = isAuthentication ? AccountState.signedIn : token ? AccountState.reSignin : AccountState.signin;

    React.useEffect(() => {
        if (accountState === AccountState.reSignin) {
            settingAction.updateStatusCode(axios.HttpStatusCode.Unauthorized);
        }
    }, [accountState]);

    if (accountState === AccountState.signedIn) {
        /** has logged in -> go home */
        return children;
    }
    if (accountState === AccountState.reSignin) {
        /** has token -> restart */
        return <StartLoading />;
    }
    /** not token -> signin */
    return (
        <React.Suspense fallback={<StartLoading />}>
            <AuthScreen />
        </React.Suspense>
    );
}
