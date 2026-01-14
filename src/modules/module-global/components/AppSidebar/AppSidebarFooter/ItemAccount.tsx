/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { Link } from 'react-router-dom';
import { User2Icon } from 'lucide-react';

/** constants */
import { AppRouterPath } from '@module-base/constants/AppRouterPath';

/** components */
import { DropdownMenuItem } from '@module-base/components/dropdown-menu';

export default function ItemAccount() {
    return (
        <DropdownMenuItem asChild className="hover:*:!text-main cursor-pointer">
            <Link to={AppRouterPath.account}>
                <User2Icon />
                <span>Account</span>
            </Link>
        </DropdownMenuItem>
    );
}
