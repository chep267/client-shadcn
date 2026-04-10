/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { AlertTriangleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** components */
import { ModalConfirm } from '@module-base/components/modal-base/modal-confirm';

export function ModalTokenExpired() {
    const navigate = useNavigate();
    const setTokenExpired = useSettingStore((store) => store.action.setTokenExpired);

    const onConfirm = () => {
        setTokenExpired(false);
        Cookies.remove(AppKey.token);
        navigate(AuthRouterPath.signin, { replace: true });
    };

    return (
        <ModalConfirm
            open={true}
            title="Phiên đăng nhập đã hết hạn"
            description="Bạn vui lòng đăng nhập lại!"
            confirmText="Đăng nhập"
            media={<AlertTriangleIcon className="text-amber-500" />}
            cancelClassName="!hidden"
            onConfirm={onConfirm}
        />
    );
}
