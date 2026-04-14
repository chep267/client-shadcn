/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AlertTriangleIcon } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

/** apis */
import { axiosClient } from '@module-base/apis';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useRestart } from '@module-auth/hooks/useRestart';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** components */
import { ModalConfirm } from '@module-base/components/modal-base/modal-confirm';

export function ModalTokenExpired() {
    const [isTokenExpired, setTokenExpired] = React.useState(false);
    const navigate = useNavigate();
    const hookRestart = useRestart();
    const statusCode = useSettingStore((store) => store.data.api.statusCode);
    const settingAction = useSettingStore((store) => store.action);

    React.useEffect(() => {
        if (statusCode === axios.HttpStatusCode.Unauthorized) {
            hookRestart.mutate(void 0, {
                onSuccess: async () => {
                    const { queue } = useSettingStore.getState().data.api;
                    if (queue.length > 0) {
                        await Promise.all(queue.map((item) => axiosClient.request(item)));
                        settingAction.clearApiQueue();
                    }
                    settingAction.updateStatusCode(axios.HttpStatusCode.Ok);
                },
                onError: () => {
                    Cookies.remove(AppKey.token);
                    setTokenExpired(true);
                },
            });
        }
    }, [statusCode]);

    const onConfirm = () => {
        setTokenExpired(false);
        navigate(AuthRouterPath.signin, { replace: true });
    };

    return (
        <ModalConfirm
            open={isTokenExpired}
            title={
                <FormattedMessage
                    id={AuthLanguage.component.modal.tokenExpired.title}
                    defaultMessage={AuthLanguage.component.modal.tokenExpired.title}
                />
            }
            description={
                <FormattedMessage
                    id={AuthLanguage.component.modal.tokenExpired.description}
                    defaultMessage={AuthLanguage.component.modal.tokenExpired.description}
                />
            }
            confirmText={
                <FormattedMessage
                    id={AuthLanguage.component.modal.tokenExpired.confirmText}
                    defaultMessage={AuthLanguage.component.modal.tokenExpired.confirmText}
                />
            }
            media={<AlertTriangleIcon className="text-amber-500" />}
            cancelClassName="!hidden"
            onConfirm={onConfirm}
        />
    );
}
