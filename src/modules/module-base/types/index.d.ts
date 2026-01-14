/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from '@module-base/types/data.d';
import type * as TypeHook from '@module-base/types/hook.d';
import type * as TypeComponent from '@module-base/types/component.d';
import type * as TypeStore from '@module-base/types/store.d';

declare global {
    namespace App.ModuleBase {
        namespace Api {
            type Response<Data, Metadata = Record<string, any>> = {
                message: string;
                data: Data;
                metadata: { timestamp: number } & Metadata;
            };
        }
        namespace Data {
            type ItemIds = TypeData.TypeItemIds;
            type Items<Data = any> = TypeData.TypeItems<Data>;
            type StorageName = TypeData.TypeStorageName;
            type StorageValue = TypeData.TypeStorageValue;
        }
        namespace Hook {
            type UseCountdownProps = TypeHook.TypeUseCountdownProps;
            type UseListSearchProps = TypeHook.TypeUseListSearchProps;
        }
        namespace Store {
            type Theme = TypeStore.TypeTheme;
            type Locale = TypeStore.TypeLocale;
            type LanguageMessages = TypeStore.TypeLanguageMessages;
            type SiderState = TypeStore.TypeSiderState;
            type SettingStore = TypeStore.TypeSettingStore;
        }
        namespace Component {
            type InputElement = TypeComponent.TypeInputElem;
            type NotifyProviderProps = TypeComponent.TypeNotifyProviderProps;
            type NotifyProviderStates = TypeComponent.TypeNotifyProviderStates;
            type FallbackDefaultProps = TypeComponent.TypeFallbackDefaultProps;

            type IconBaseProps = TypeComponent.TypeIconBaseProps;
            type IconSVGProps = TypeComponent.TypeIconSVGProps;
            type IconList = TypeComponent.TypeIconList;

            type OrderType = TypeComponent.TypeOrderType;
            type TableData = TypeComponent.TypeTableData;
            type DataKey<Data extends TableData> = TypeComponent.TypeDataKey<Data>;
        }
    }
}
