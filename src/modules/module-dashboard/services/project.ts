import { faker } from '@faker-js/faker';

faker.seed(123); // optional: giữ data cố định

const STATUSES = ['todo', 'in_progress', 'done', 'warning', 'error'] as const;

export interface TaskData {
    id: number;
    title: string;
    assignee: {
        name: string;
        avatar?: string;
    };
    status: (typeof STATUSES)[number];
    createdAt: number;
    deadline: number;
}

export function generateTasks(count: number): TaskData[] {
    return Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        title: faker.hacker.phrase(),
        assignee: {
            name: faker.person.fullName(),
            avatar: faker.image.avatar(),
        },
        status: faker.helpers.arrayElement(STATUSES),
        createdAt: faker.date.past().getTime(),
        deadline: faker.date.future().getTime(),
    }));
}
