/**
 *
 * @author dongntd267@gmail.com
 *
 */

export function genAvatarFallbackFromName(name?: string) {
    return name
        ?.split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}
