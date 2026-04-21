/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { faker } from '@faker-js/faker';
import { useQuery } from '@tanstack/react-query';

/** utils */
import { poems } from '@module-poem/utils/poem';

/** services */
import { poemService } from '@module-poem/services';

export const queryKey = 'use-get-poem-all';

const items = poems.map((poem, index) => {
    const item: App.ModulePoem.Data.TypePoem = {
        id: `${index + 1}`,
        title: 'Thơ chế',
        description: '',
        content: poem,
        author: {
            uid: faker.string.uuid(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            role: faker.helpers.arrayElement(['admin', 'user']),
            name: 'Chép nèe',
            photo: faker.image.avatar(),
        },
        createdAt: faker.date.past().getTime(),
        updatedAt: null,
    };
    return item;
});

export function useGetAllPoem() {
    const { isPending, data } = useQuery({
        queryKey: [queryKey],
        queryFn: poemService.getAll,
        retry: 0,
    });

    return { isPending, items: data?.data.data.items || items };
}
