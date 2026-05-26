/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useNavigate } from 'react-router-dom';

/** constants */
import { MessengerRouterPath } from '@module-messenger/constants/path';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useAddThreadByUser } from '@module-messenger/hooks/useAddThread';

/** components */
import { UserAvatar } from '@module-user/components/UserAvatar';
import { UserName } from '@module-user/components/UserName';

interface UserItemProps {
    className?: string;
    data: App.ModuleUser.Data.TypeUser;
}

export function UserItem(props: UserItemProps) {
    const { data, className } = props;

    const navigate = useNavigate();
    const { mutate } = useAddThreadByUser();

    const onClick = () => {
        const tid = data.uid.replace('uid.', 'tid.');
        mutate(data);
        navigate(`${MessengerRouterPath.home}/${tid}?draft=true`);
    };

    return (
        <div
            className={cn(
                'flex w-full items-center',
                'cursor-pointer gap-2 px-2 py-4',
                'hover:bg-accent hover:text-accent-foreground',
                className
            )}
            onClick={onClick}
        >
            <UserAvatar size="lg" src={data.photo} name={data.name} />
            <UserName className="w-full" name={data.name} />
        </div>
    );
}
