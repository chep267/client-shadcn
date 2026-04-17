/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { Control, FieldPath, FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import type { ComponentProps } from 'react';
import type { AxiosError } from 'axios';

export type TypeAuthBreadcrumbsItem = {
    title: string;
    path: string;
    append?: string;
    hidden?: boolean;
};

export type AuthBreadcrumbsProps = {
    mode?: 'signin' | 'register' | 'recover';
};

export type AuthTitleProps = AuthBreadcrumbsProps;

export interface FormTextFieldProps<T extends FieldValues = FieldValues> extends ComponentProps<'input'> {
    name: FieldPath<T>;
    control: Control<T>;
    label?: string;
}

interface AuthButtonSubmitProps extends ComponentProps<'button'> {
    loading?: boolean;
    mode?: 'signin' | 'register' | 'recover';
}

/** signin */
type TypeFormSigninFieldsName = 'email' | 'password';
type TypeFormSigninData = {
    [Key in TypeFormSigninFieldsName]: string;
};
interface ButtonSigninProps extends ComponentProps<'button'> {
    handleSubmit: UseFormHandleSubmit<TypeFormSigninData>;
    onSubmitError: (error: AxiosError) => void;
}

/** register */
type TypeFormRegisterFieldsName = 'email' | 'password' | 'confirmPassword';
type TypeFormRegisterData = {
    [Key in TypeFormRegisterFieldsName]: string;
};
interface ButtonRegisterProps extends ComponentProps<'button'> {
    handleSubmit: UseFormHandleSubmit<TypeFormRegisterData>;
    onSubmitError: (error: AxiosError) => void;
}

/** recover */
type TypeFormRecoverFieldsName = 'email';
type TypeFormRecoverData = {
    [Key in TypeFormRecoverFieldsName]: string;
};
interface ButtonRecoverProps extends ComponentProps<'button'> {
    handleSubmit: UseFormHandleSubmit<TypeFormRecoverData>;
    onSubmitError: (error: AxiosError) => void;
}
