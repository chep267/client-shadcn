/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';
import { Link } from 'react-router';

/** constants */
import { AppEnv } from '@modules/base/constants';
import { GlobalRouterPath } from '@modules/global/constants';

/** components */
import { IconBase } from '@modules/base/components/icon-base';
import { Typography } from '@modules/base/components/typography';

export function AppInfo() {
    return (
        <Link className={cn('group', 'flex items-center gap-2')} to={GlobalRouterPath.default}>
            <IconBase className={cn('group-hover:scale-120 group-hover:animate-spin')} name="app-logo" />
            <Typography component="h4" className="group-hover:text-main">
                {AppEnv.appName}
            </Typography>
        </Link>
    );
}
