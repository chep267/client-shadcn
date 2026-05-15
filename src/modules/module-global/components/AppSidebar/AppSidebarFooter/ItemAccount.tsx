/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { Link } from 'react-router-dom';
import { User2Icon } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

/** constants */
import { GlobalRouterPath } from '@module-global/constants/path';
import { GlobalLanguage } from '@module-global/constants/language';

/** components */
import { DropdownMenuItem } from '@module-base/components/dropdown-menu';
import { Typography } from '@module-base/components/typography';

export function ItemAccount() {
    return (
        <DropdownMenuItem asChild className="hover:*:!text-main cursor-pointer">
            <Link to={GlobalRouterPath.account}>
                <User2Icon />
                <Typography className="text-sm">
                    <FormattedMessage id={GlobalLanguage.component.label.account} defaultMessage="Account" />
                </Typography>
            </Link>
        </DropdownMenuItem>
    );
}
