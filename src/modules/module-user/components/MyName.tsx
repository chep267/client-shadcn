/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import React from 'react';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** components */
import { Typography } from '@module-base/components/typography';

export function MyName(props: React.ComponentProps<typeof Typography>) {
    const user = useAuthStore((store) => store.data.user);
    const name = user?.name ?? '';

    return <Typography {...props}>{name}</Typography>;
}
