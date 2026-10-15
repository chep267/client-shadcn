/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { Link } from 'react-router';
import { User2Icon } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

/** constants */
import { GlobalRouterPath } from '@modules/global/constants/path';
import { GlobalLanguage } from '@modules/global/constants/language';

/** components */
import { DropdownMenuItem } from '@modules/base/components/dropdown-menu';
import { Typography } from '@modules/base/components/typography';

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
