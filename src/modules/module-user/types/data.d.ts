/**
 *
 * @author dongntd267@gmail.com
 *
 */

export declare interface TypeUser {
    /**
     * The display name of the user.
     */
    readonly name: string | null;
    /**
     * The email of the user.
     */
    readonly email: string | null;
    /**
     * The phone number normalized based on the E.164 standard (e.g. +16505550101) for the
     * user.
     *
     * @remarks
     * This is null if the user has no phone credential linked to the account.
     */
    readonly phone: string | null;
    /**
     * The profile photo URL of the user.
     */
    readonly photo: string | null;
    readonly uid: string;
    readonly role: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;
}
