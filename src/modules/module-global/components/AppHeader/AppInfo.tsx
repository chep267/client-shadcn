/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { Link } from 'react-router-dom';

/** constants */
import { AppEnv } from '@module-base/constants/AppEnv';
import { GlobalRouterPath } from '@module-global/constants/GlobalRouterPath';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { IconBase } from '@module-base/components/icon-base';
import { Typography } from '@module-base/components/typography';

export function AppInfo() {
    return (
        <Link className={cn('group', 'flex items-center gap-2')} to={GlobalRouterPath.home}>
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
