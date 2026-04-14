/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertTriangleIcon } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

/** apis */
import { axiosClient } from '@module-base/apis';

/** constants */
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useRestart } from '@module-auth/hooks/useRestart';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** components */
import { ModalConfirm } from '@module-base/components/modal-base/modal-confirm';

export function ModalTokenExpired() {
    const [isTokenExpired, setTokenExpired] = React.useState(false);
    const navigate = useNavigate();
    const hookRestart = useRestart();
    const statusCode = useSettingStore((store) => store.data.api.statusCode);
    const settingAction = useSettingStore((store) => store.action);
    const authAction = useAuthStore((store) => store.action);

    React.useEffect(() => {
        if (statusCode === axios.HttpStatusCode.Unauthorized) {
            hookRestart.mutate(void 0, {
                onSuccess: async () => {
                    const { queue } = useSettingStore.getState().data.api;
                    if (queue.length > 0) {
                        await Promise.all(queue.map((item) => axiosClient.request(item)));
                        settingAction.clearApiQueue();
                    }
                },
                onError: () => {
                    setTokenExpired(true);
                },
                onSettled: () => {
                    settingAction.updateStatusCode(axios.HttpStatusCode.Ok);
                },
            });
        }
    }, [statusCode]);

    const onConfirm = () => {
        setTokenExpired(false);
        authAction.setData({ token: '' });
        navigate(AuthRouterPath.signin, { replace: true });
    };

    return (
        <ModalConfirm
            open={isTokenExpired}
            className="[&_button]:data-[slot='alert-dialog-cancel']:hidden"
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
            media={<AlertTriangleIcon className="text-red-500" />}
            onConfirm={onConfirm}
        />
    );
}
