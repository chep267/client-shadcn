/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AlertTriangleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
import { StartLoading } from '@module-base/components/start-loading';
import { ModalConfirm } from '@module-base/components/modal-base/modal-confirm';

export function ModalTokenExpired() {
    const [isTokenExpired, setTokenExpired] = React.useState(false);
    const navigate = useNavigate();
    const hookRestart = useRestart();
    const statusCode = useSettingStore((store) => store.data.api.statusCode);

    React.useEffect(() => {
        if (statusCode === axios.HttpStatusCode.Unauthorized) {
            hookRestart.mutate(void 0, {
                onSuccess: async () => {
                    const { data, action } = useSettingStore.getState();
                    const queue = data.api.queue;
                    await Promise.all(queue.map((item) => axiosClient.request(item)));
                    action.clearApiQueue();
                    action.updateStatusCode(axios.HttpStatusCode.Ok);
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

    if (hookRestart.isPending) {
        return (
            <div className="bg-background/70 fixed top-0 right-0 bottom-0 left-0 z-9999">
                <StartLoading />
            </div>
        );
    }

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
