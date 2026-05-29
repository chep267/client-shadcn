/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** components */
import { Typography } from '@module-base/components/typography';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@module-base/components/card';
import { MyAvatar } from '@module-user/components/MyAvatar';
import { MyName } from '@module-user/components/MyName';
import { ButtonSignout } from '@module-user/components/ButtonSignout';

export default function UserScreen() {
    const user = useAuthStore((store) => store.data.user);

    if (!user) return null;

    return (
        <div className={cn('flex flex-1 flex-col', 'px-2 py-4', 'tablet:px-5')}>
            <Card>
                <CardHeader>
                    <CardTitle className="flex flex-1 items-center gap-4">
                        <MyAvatar className="h-20 w-20 [&_span]:data-[slot=avatar-fallback]:text-4xl" />
                        <MyName component="h1" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Phone: {user.phone ?? '0123456789'}</Typography>
                    <Typography>Role: {user.role}</Typography>
                </CardContent>
                <CardFooter>
                    <ButtonSignout />
                </CardFooter>
            </Card>
        </div>
    );
}
