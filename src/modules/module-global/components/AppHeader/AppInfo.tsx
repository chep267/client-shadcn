/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { Link } from 'react-router-dom';

/** constants */
import { AppEnv } from '@module-base/constants/AppEnv';
import { AppRouterPath } from '@module-base/constants/AppRouterPath';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { IconBase } from '@module-base/components/icon-base';
import { Typography } from '@module-base/components/typography';

export default function AppInfo() {
    return (
        <Link className={cn('group', 'flex items-center gap-2')} to={AppRouterPath.home}>
            <IconBase
                className={cn('transition-all', 'group-hover:scale-120 group-hover:animate-spin')}
                name="app-logo"
            />
            <Typography component="h4" className="group-hover:text-main">
                {AppEnv.appName}
            </Typography>
        </Link>
    );
}
