/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** services */
import { userServices } from '@module-user/services';
import { faker } from '@faker-js/faker';

export const queryKey = 'MODULE_USER_QUERY_KEY_GET_USER';

export const createFakeUser = (): App.ModuleUser.Data.TypeUser => {
    const createdAt = faker.date.past().toISOString();

    return {
        uid: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        // Đảm bảo số điện thoại tuân thủ chuẩn E.164 (+16505550101)
        phone: faker.helpers.fromRegExp(/\+1[2-9]\d{2}[2-9]\d{6}/),
        photo: faker.image.avatar(),
        role: faker.helpers.arrayElement(['admin', 'user', 'manager']),
        createdAt: createdAt,
        updatedAt: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
    };
};

export function useGetUser(uid: string = '') {
    const { isPending, data } = useQuery({
        queryKey: [queryKey],
        queryFn: () => userServices.getUser({ uid }),
        enabled: !!uid,
    });

    return { isPending, data: data?.data || createFakeUser() };
}
