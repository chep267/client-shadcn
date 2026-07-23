/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ComponentProps } from 'react';
import type { Control, FieldPath, FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import type { AxiosError } from 'axios';

export interface AuthBreadcrumbsItem {
    title: string;
    path: string;
    append?: string;
    hidden?: boolean;
}

export interface AuthBreadcrumbsProps {
    mode?: 'signin' | 'register' | 'recover';
}

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
type FormSigninFieldsName = 'email' | 'password';
type FormSigninData = Record<FormSigninFieldsName, string>;
interface ButtonSigninProps extends ComponentProps<'button'> {
    handleSubmit: UseFormHandleSubmit<FormSigninData>;
    onSubmitError: (error: AxiosError) => void;
}

/** register */
type FormRegisterFieldsName = 'email' | 'password' | 'confirmPassword';
type FormRegisterData = Record<FormRegisterFieldsName, string>;
interface ButtonRegisterProps extends ComponentProps<'button'> {
    handleSubmit: UseFormHandleSubmit<FormRegisterData>;
    onSubmitError: (error: AxiosError) => void;
}

/** recover */
type FormRecoverFieldsName = 'email';
type FormRecoverData = Record<FormRecoverFieldsName, string>;
interface ButtonRecoverProps extends ComponentProps<'button'> {
    handleSubmit: UseFormHandleSubmit<FormRecoverData>;
    onSubmitError: (error: AxiosError) => void;
}
