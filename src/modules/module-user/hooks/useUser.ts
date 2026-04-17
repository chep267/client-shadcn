/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { validateId } from '@module-base/utils/validateId';

/** hooks */
import { useListUser } from '@module-user/hooks/useListUser';

/** types */

type UseUserProps = {
    uid?: App.ModuleUser.Data.TypeUser['uid'];
};

export function useUser(props: UseUserProps) {
    const { uid: uidProps } = props;
    const hookListUser = useListUser();

    const uid = validateId(`${uidProps}`, 'uid');

    return {
        isLoading: hookListUser.isLoading,
        data: hookListUser.data?.data?.items?.find((user) => user.uid === uid),
    };
}
