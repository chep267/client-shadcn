/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppSiderState } from '@module-base/constants/AppSiderState';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** hooks */
import { useMediaQuery } from '@module-base/hooks/useMediaQuery';

export default function WindowProvider(props: React.PropsWithChildren) {
    const { children } = props;

    const sider = useSettingStore((store) => store.data.sider);
    const settingAction = useSettingStore((store) => store.action);
    const lastState = React.useRef<App.ModuleBase.Store.SiderState>(sider);
    const isForce = useMediaQuery('--app-size-breakpoint-sidebar-collapse', 'down');
    const isHidden = useMediaQuery('--app-size-breakpoint-sidebar-hidden', 'down');

    /** sider event */
    React.useEffect(() => {
        if (sider === AppSiderState.expand || sider === AppSiderState.collapse) {
            lastState.current = sider;
        }
        switch (true) {
            case isHidden:
                settingAction.changeSider(AppSiderState.hidden);
                break;
            case isForce:
                settingAction.changeSider(AppSiderState.force);
                break;
            default:
                settingAction.changeSider(lastState.current);
        }
    }, [isForce, isHidden]);

    return children;
}
