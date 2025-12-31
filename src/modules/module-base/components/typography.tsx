/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

export function Typography(
    props: React.PropsWithChildren<{
        component?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        className: string;
    }>
) {
    const { children, className, component: TextComponent = 'span', ...rest } = props;

    return (
        <TextComponent
            className={cn(
                {
                    ['text-base font-normal tracking-normal']: TextComponent === 'span',
                    ['scroll-m-20 font-semibold tracking-tight']: TextComponent !== 'span',
                    ['text-4xl font-extrabold text-balance']: TextComponent === 'h1',
                    ['text-3xl']: TextComponent === 'h2',
                    ['text-2xl']: TextComponent === 'h3',
                    ['text-xl']: TextComponent === 'h4',
                    ['text-lg']: TextComponent === 'h5',
                    ['text-base']: TextComponent === 'h6',
                },
                className
            )}
            {...rest}
        >
            {children}
        </TextComponent>
    );
}
