/**
 *
 * @author 267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TrashIcon, BellOffIcon } from 'lucide-react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useRemoveThread } from '@module-messenger/hooks/useRemoveThread';

/** components */
import {
    DropdownMenuContent,
    DropdownMenuSub,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuShortcut,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@module-base/components/dropdown-menu';

interface MenuSettingItemProps {
    id: string;
    className?: string;
    icon?: React.ReactNode;
    title?: string;
    value?: string;
    divide?: 'top' | 'bottom' | 'top-bottom';
    type?: 'item' | 'sub' | 'group';
    disabled?: boolean;
    subMenu?: MenuSettingItemProps[];
    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
    onChange?(value: string): void;
}

function MenuSettingItem(props: { item: MenuSettingItemProps; step?: number }) {
    const { item, step = 1 } = props;

    return (
        <>
            {item.divide?.includes('top') ? <DropdownMenuSeparator /> : null}

            {/* render group item */}
            {item.type === 'group' && (
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className={item.className}>
                        {step === 1 && <DropdownMenuShortcut className="mr-2 ml-0">{item.icon}</DropdownMenuShortcut>}
                        <FormattedMessage id={item.title} defaultMessage={item.title} />
                        {step !== 1 && <DropdownMenuShortcut>{item.icon}</DropdownMenuShortcut>}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent sideOffset={step * 8}>
                            <DropdownMenuRadioGroup value={item.value} onValueChange={item.onChange}>
                                {item.subMenu?.map((subItem) => (
                                    <DropdownMenuRadioItem key={subItem.id} value={subItem.value!}>
                                        <FormattedMessage id={subItem.title} defaultMessage={subItem.title} />
                                        <DropdownMenuShortcut>{subItem.icon}</DropdownMenuShortcut>
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            )}

            {/* render sub item */}
            {item.type === 'sub' && (
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className={item.className}>
                        {step === 1 && <DropdownMenuShortcut className="mr-2 ml-0">{item.icon}</DropdownMenuShortcut>}
                        <FormattedMessage id={item.title} defaultMessage={item.title} />
                        {step !== 1 && <DropdownMenuShortcut>{item.icon}</DropdownMenuShortcut>}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent sideOffset={step * 8}>
                            {item.subMenu?.map((subItem) => (
                                <MenuSettingItem key={subItem.id} item={subItem} step={step + 1}></MenuSettingItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            )}

            {/* render item */}
            {(!item.type || item.type === 'item') && (
                <DropdownMenuItem className={item.className} disabled={item.disabled} onClick={item.onClick}>
                    {step === 1 && <DropdownMenuShortcut className="mr-2 ml-0">{item.icon}</DropdownMenuShortcut>}
                    <FormattedMessage id={item.title} defaultMessage={item.title} />
                    {step !== 1 && <DropdownMenuShortcut>{item.icon}</DropdownMenuShortcut>}
                </DropdownMenuItem>
            )}

            {item.divide?.includes('bottom') ? <DropdownMenuSeparator /> : null}
        </>
    );
}

interface MenuOptionProps {
    thread: App.ModuleMessenger.Data.Thread;
}

export function MenuOption(props: MenuOptionProps) {
    const { thread } = props;
    const { mutate: removeThread } = useRemoveThread();

    const items: MenuSettingItemProps[] = [
        {
            id: 'Mute',
            type: 'item',
            className: 'cursor-pointer hover:!text-main hover:[&_svg]:!text-main',
            title: 'Mute',
            icon: <BellOffIcon className="size-5 text-inherit" />,
            divide: 'top',
            onClick: () => {},
        },
        {
            id: 'block',
            type: 'item',
            className: 'cursor-pointer hover:!text-main hover:[&_svg]:!text-main',
            title: 'Block',
            icon: <TrashIcon className="size-5 text-inherit" />,
            divide: 'top',
            onClick: () => {},
        },
        {
            id: 'delete',
            type: 'item',
            className: 'cursor-pointer hover:!text-danger hover:[&_svg]:!text-danger',
            title: 'Delete',
            icon: <TrashIcon className="size-5 text-inherit" />,
            divide: 'top',
            onClick: () => removeThread({ tid: thread.id }),
        },
    ];

    return (
        <DropdownMenuContent
            className={cn('w-fit', 'scrollbar-custom scrollbar-thin overflow-auto overscroll-none')}
            side="bottom"
            align="end"
        >
            <DropdownMenuGroup>
                {items.map((item) => (
                    <MenuSettingItem key={item.id} item={item} />
                ))}
            </DropdownMenuGroup>
        </DropdownMenuContent>
    );
}

export default MenuOption;
