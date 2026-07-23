/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce } from 'immer';

export const useTicketStore = create<App.ModuleDashboard.Store.DashboardStore>((set) => ({
    data: {
        itemDelete: null,
        itemEdit: null,
        ticketIds: [],
        tickets: [],
    },
    action: {
        setData: (updateData = {}) => {
            set(
                produce<App.ModuleDashboard.Store.DashboardStore>(({ data }) => {
                    Object.assign(data, updateData);
                })
            );
        },
    },
}));
