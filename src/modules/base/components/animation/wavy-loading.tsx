/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';
import { useIntl } from 'react-intl';

/** constants */
import { BaseLanguage } from '@modules/base/constants/language';

interface WavyLoadingProps {
    className?: string;
    text?: string;
}

export function WavyLoading(props: WavyLoadingProps) {
    const { text, className } = props;
    const { formatMessage } = useIntl();

    const placeholder =
        text || formatMessage({ id: BaseLanguage.component.label.loading, defaultMessage: 'Loading...' });

    return (
        <div
            className={cn(
                'flex size-full items-center justify-center',
                'text-main text-2xl font-bold tracking-widest',
                className
            )}
        >
            {placeholder.split('').map((char, index) => (
                <span
                    key={index}
                    className="animate-wavy inline-block"
                    style={{
                        animationDelay: `${index * 0.1}s`,
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </div>
    );
}
