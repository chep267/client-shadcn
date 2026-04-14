/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import { ModalTokenExpired } from '@module-auth/components/ModalTokenExpired';

/** screens */
import { AuthRouter } from '@module-auth/screens/AuthRouter';

export default function AuthProvider(props: React.PropsWithChildren) {
    const { children } = props;

    return (
        <React.Fragment>
            <ModalTokenExpired />
            <AuthRouter children={children} />
        </React.Fragment>
    );
}
