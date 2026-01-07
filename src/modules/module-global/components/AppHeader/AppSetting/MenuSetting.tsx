/**
 *
 * @author 267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import { PaletteIcon, LanguagesIcon, MoonStarIcon, SunIcon, LogOutIcon } from 'lucide-react';

/** constants */
import { LocaleObject } from '@module-base/constants/LocaleObject';
import { ThemeObject } from '@module-base/constants/ThemeObject';
import { LangLanguage } from '@module-base/constants/LangLanguage';
import { ThemeLanguage } from '@module-base/constants/ThemeLanguage';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** components */
import { Spinner } from '@module-base/components/spinner';
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

/** hooks */
import { useSignout } from '@module-auth/hooks/useSignout';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';
import { useAuthStore } from '@module-auth/stores/useAuthStore';

interface MenuSettingItemProps {
    id: string;
    className?: string;
    icon?: React.ReactNode;
    title?: React.ReactNode;
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
                        {item.title}
                        {step !== 1 && <DropdownMenuShortcut>{item.icon}</DropdownMenuShortcut>}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent sideOffset={step * 8}>
                            <DropdownMenuRadioGroup value={item.value} onValueChange={item.onChange}>
                                {item.subMenu?.map((subItem) => (
                                    <DropdownMenuRadioItem key={subItem.id} value={subItem.value!}>
                                        {subItem.title}
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
                        {item.title}
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
                    {item.title}
                    {step !== 1 && <DropdownMenuShortcut>{item.icon}</DropdownMenuShortcut>}
                </DropdownMenuItem>
            )}

            {item.divide?.includes('bottom') ? <DropdownMenuSeparator /> : null}
        </>
    );
}

export default function MenuSetting() {
    const theme = useSettingStore((store) => store.data.theme);
    const locale = useSettingStore((store) => store.data.locale);
    const settingAction = useSettingStore((store) => store.action);
    const user = useAuthStore((store) => store.data.user);
    const isAuthentication = Boolean(user);
    const hookSignout = useSignout();

    const menuBase: MenuSettingItemProps[] = [
        {
            id: 'theme',
            type: 'group',
            className: 'cursor-pointer data-[state=open]:text-main data-[state=open]:[&_svg]:!text-main',
            title: <FormattedMessage id={ThemeLanguage.component.label.router} />,
            icon: <PaletteIcon className="size-5 text-inherit" />,
            divide: 'top',
            value: theme,
            onChange: (value) => settingAction.changeTheme(value as typeof theme),
            subMenu: [
                {
                    id: 'theme-dark',
                    className: 'cursor-pointer',
                    disabled: theme === ThemeObject.dark,
                    value: ThemeObject.dark,
                    title: <FormattedMessage id={ThemeLanguage.component.label.dark} />,
                    icon: <MoonStarIcon className="size-5" />,
                    onClick: () => settingAction.changeTheme(ThemeObject.dark),
                },
                {
                    id: 'theme-light',
                    className: 'cursor-pointer',
                    disabled: theme === ThemeObject.light,
                    value: ThemeObject.light,
                    title: <FormattedMessage id={ThemeLanguage.component.label.light} />,
                    icon: <SunIcon className="text-warning size-5" />,
                    onClick: () => settingAction.changeTheme(ThemeObject.light),
                },
            ],
        },
        {
            id: 'language',
            type: 'sub',
            className: 'cursor-pointer data-[state=open]:text-main data-[state=open]:[&_svg]:!text-main',
            title: <FormattedMessage id={LangLanguage.component.label.router} />,
            icon: <LanguagesIcon className="size-5 text-inherit" />,
            divide: 'bottom',
            subMenu: [
                {
                    id: 'Language-Vi',
                    className: 'cursor-pointer',
                    disabled: locale === LocaleObject.vi,
                    title: <FormattedMessage id={LangLanguage.component.label.vi} />,
                    icon: <span>🇻🇳</span>,
                    onClick: () => settingAction.changeLocale(LocaleObject.vi),
                },
                {
                    id: 'Language-En',
                    className: 'cursor-pointer',
                    disabled: locale === LocaleObject.en,
                    title: <FormattedMessage id={LangLanguage.component.label.en} />,
                    icon: <span>🇬🇧</span>,
                    onClick: () => settingAction.changeLocale(LocaleObject.en),
                },
            ],
        },
    ];

    const menuAuth: MenuSettingItemProps[] = [
        {
            id: 'sign-out',
            className: 'group hover:text-danger focus:text-danger cursor-pointer',
            title: <FormattedMessage id={AuthLanguage.component.title.signout} />,
            icon: hookSignout.isPending ? (
                <Spinner className="group-hover:text-danger size-5" />
            ) : (
                <LogOutIcon className="group-hover:text-danger size-5" />
            ),
            divide: 'bottom',
            onClick: (event) => {
                event.preventDefault();
                event.stopPropagation();
                hookSignout.mutate(undefined, { onSettled: () => {} });
            },
        },
    ];

    return (
        <DropdownMenuContent
            className={clsx(
                'mt-3 w-fit',
                'scrollbar-thin scrollbar-custom overflow-auto overscroll-none',
                'max-h-[calc(100dvh-var(--app-size-height-header)-8px)]'
            )}
            side="bottom"
            align="end"
        >
            <DropdownMenuGroup>
                {menuBase.map((item) => (
                    <MenuSettingItem key={item.id} item={item} />
                ))}
            </DropdownMenuGroup>
            <DropdownMenuGroup>
                {!isAuthentication && menuAuth.map((item) => <MenuSettingItem key={item.id} item={item} />)}
            </DropdownMenuGroup>
        </DropdownMenuContent>
    );
}
