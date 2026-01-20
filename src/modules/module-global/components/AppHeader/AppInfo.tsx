/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import { Link } from 'react-router-dom';

/** constants */
import { AppEnv } from '@module-base/constants/AppEnv';
import { AppRouterPath } from '@module-base/constants/AppRouterPath';

/** components */
import { IconBase } from '@module-base/components/IconBase';
import { Typography } from '@module-base/components/typography';

export default function AppInfo() {
    return (
        <Link className={clsx('group', 'flex items-center gap-2')} to={AppRouterPath.home}>
            <IconBase
                className={clsx('transition-all', 'group-hover:scale-120 group-hover:animate-spin')}
                name="appLogo"
            />
            <Typography component="h4" className="group-hover:text-main">
                {AppEnv.appName}
            </Typography>
        </Link>
    );
}
