/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import { ModalTokenExpired } from '@module-auth/components/ModalTokenExpired';

export default function AppModal() {
    return (
        <React.Fragment>
            <ModalTokenExpired />
        </React.Fragment>
    );
}
