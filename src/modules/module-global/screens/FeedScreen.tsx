/** components */
import { TableBase } from '@module-base/components/table-base';
import { VirtualTable } from '@module-base/components/vitual-table';

export default function FeedScreen() {
    return (
        <div className="flex h-full w-full flex-col gap-10 p-10">
            <TableBase
                className="scrollbar-thin scrollbar-custom max-h-[40dvh]"
                hasCheckbox
                dataKeyForCheckbox="id"
                items={Array.from({ length: 99 }, (_, i) => ({
                    id: i + 1,
                    name: `user${i + 1}`,
                    email: `user${i + 1}@gmail.com`,
                    phone: `0900000${String(i + 1).padStart(3, '0')}`,
                    address: `${i + 1} Hoang Quoc Viet, Ha Noi, Viet Nam`,
                    haha: 1,
                }))}
                columns={[
                    { dataKey: 'id', label: 'ID', sortable: true },
                    { dataKey: 'name', label: 'Name', sortable: true },
                    { dataKey: 'email', label: 'Email', sortable: true },
                    { dataKey: 'phone', label: 'Phone' },
                    { dataKey: 'address', label: 'Address' },
                ]}
            />

            <VirtualTable
                className="scrollbar-thin scrollbar-custom max-h-[40dvh]"
                hasCheckbox
                dataKeyForCheckbox="id"
                items={Array.from({ length: 10000 }, (_, i) => ({
                    id: i + 1,
                    name: `user${i + 1}`,
                    email: `user${i + 1}@gmail.com`,
                    phone: `0900000${String(i + 1).padStart(3, '0')}`,
                    address: `${i + 1} Hoang Quoc Viet, Ha Noi, Viet Nam`,
                    haha: 1,
                }))}
                columns={[
                    { dataKey: 'id', label: 'ID', sortable: true },
                    { dataKey: 'name', label: 'Name', sortable: true },
                    { dataKey: 'email', label: 'Email', sortable: true },
                    { dataKey: 'phone', label: 'Phone' },
                    { dataKey: 'address', label: 'Address' },
                ]}
            />
        </div>
    );
}
