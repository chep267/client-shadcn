/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

interface WavyLoadingProps {
    className?: string;
    text?: string;
}

export function WavyLoading(props: WavyLoadingProps) {
    const { text = 'Loading...', className = 'text-main' } = props;

    return (
        <div
            className={cn(
                'flex h-full w-full items-center justify-center text-2xl font-bold tracking-widest',
                className
            )}
        >
            {text.split('').map((char, index) => (
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
