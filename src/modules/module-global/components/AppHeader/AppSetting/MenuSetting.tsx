/**
 *
 * @author 267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { PaletteIcon, LanguagesIcon, MoonStarIcon, SunIcon } from 'lucide-react';

/** constants */
import { AppLocale, AppTheme } from '@module-base/constants/config';
import { BaseLanguage } from '@module-base/constants/language';

/** utils */
import { cn } from '@module-base/utils/shadcn';

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

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

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

export function MenuSetting() {
    const theme = useSettingStore((store) => store.data.theme);
    const locale = useSettingStore((store) => store.data.locale);
    const settingAction = useSettingStore((store) => store.action);

    const menuBase: MenuSettingItemProps[] = [
        {
            id: 'theme',
            type: 'sub',
            className: 'cursor-pointer data-[state=open]:text-main data-[state=open]:[&_svg]:!text-main',
            title: BaseLanguage.component.label.theme.router,
            icon: <PaletteIcon className="size-5 text-inherit" />,
            divide: 'top',
            value: theme,
            onChange: (value) => settingAction.changeTheme(value as typeof theme),
            subMenu: [
                {
                    id: 'theme-dark',
                    className: 'cursor-pointer',
                    disabled: theme === AppTheme.dark,
                    value: AppTheme.dark,
                    title: BaseLanguage.component.label.theme.dark,
                    icon: <MoonStarIcon className="size-5" />,
                    onClick: () => settingAction.changeTheme(AppTheme.dark),
                },
                {
                    id: 'theme-light',
                    className: 'cursor-pointer',
                    disabled: theme === AppTheme.light,
                    value: AppTheme.light,
                    title: BaseLanguage.component.label.theme.light,
                    icon: <SunIcon className="text-warning size-5" />,
                    onClick: () => settingAction.changeTheme(AppTheme.light),
                },
            ],
        },
        {
            id: 'language',
            type: 'sub',
            className: 'cursor-pointer data-[state=open]:text-main data-[state=open]:[&_svg]:!text-main',
            title: BaseLanguage.component.label.locale.router,
            icon: <LanguagesIcon className="size-5 text-inherit" />,
            divide: 'bottom',
            subMenu: [
                {
                    id: 'Language-Vi',
                    className: 'cursor-pointer',
                    disabled: locale === AppLocale.vi,
                    title: BaseLanguage.component.label.locale.vi,
                    icon: <span>🇻🇳</span>,
                    onClick: () => settingAction.changeLocale(AppLocale.vi),
                },
                {
                    id: 'Language-En',
                    className: 'cursor-pointer',
                    disabled: locale === AppLocale.en,
                    title: BaseLanguage.component.label.locale.en,
                    icon: <span>🇬🇧</span>,
                    onClick: () => settingAction.changeLocale(AppLocale.en),
                },
            ],
        },
    ];

    return (
        <DropdownMenuContent
            className={cn(
                'mt-3 w-fit',
                'scrollbar-custom scrollbar-thin overflow-auto overscroll-none',
                'max-h-[calc(var(--app-size-height-sidebar)-var(--spacing)*2)]'
            )}
            side="bottom"
            align="end"
        >
            <DropdownMenuGroup>
                {menuBase.map((item) => (
                    <MenuSettingItem key={item.id} item={item} />
                ))}
            </DropdownMenuGroup>
        </DropdownMenuContent>
    );
}
