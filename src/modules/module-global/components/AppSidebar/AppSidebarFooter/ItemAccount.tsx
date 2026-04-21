/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { Link } from 'react-router-dom';
import { User2Icon } from 'lucide-react';

/** constants */
import { GlobalRouterPath } from '@module-global/constants/GlobalRouterPath';

/** components */
import { DropdownMenuItem } from '@module-base/components/dropdown-menu';

export function ItemAccount() {
    return (
        <DropdownMenuItem asChild className="hover:*:!text-main cursor-pointer">
            <Link to={GlobalRouterPath.account}>
                <User2Icon />
                <span>Account</span>
            </Link>
        </DropdownMenuItem>
    );
}
