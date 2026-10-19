/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';
import { useParams } from 'react-router';

/** hooks */
import { useGetUser } from '@modules/user/hooks/useGetUser';

/** components */
import { Typography } from '@modules/base/components/typography';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@modules/base/components/card';
import { ButtonSignout } from '@modules/user/components/ButtonSignout';
import { UserInfo } from '@modules/user/components/UserInfo';

export default function UserScreen() {
    const { uid = '' } = useParams();
    const { data } = useGetUser(uid);
    const user = data?.data;

    return (
        <div className={cn('flex flex-1 flex-col', 'px-2 py-4', 'tablet:px-5')}>
            <Card>
                <CardHeader>
                    <CardTitle className="flex flex-1 items-center gap-4">
                        <UserInfo sizeName="h4" sizeAvatar="lg" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Typography>Email: {user?.email ?? 'abc@d.com'}</Typography>
                    <Typography>Phone: {user?.phone ?? '0123456789'}</Typography>
                    <Typography>Role: {user?.role ?? 'user'}</Typography>
                </CardContent>
                <CardFooter>
                    <ButtonSignout />
                </CardFooter>
            </Card>
        </div>
    );
}
