# Module Auth

## Overview

The `module-auth` handles authentication and authorization functionalities within the application. It includes reusable components, utilities, hooks, and state management related to user authentication, such as sign-in, sign-out, and user session management.

This module is designed to ensure ease of integration for authentication capabilities while maintaining security and scalability.

## Folder Structure

The `module-auth` is organized into the following directories:

1. **hooks**: React hooks providing reusable logic for authentication-related functionalities.
2. **types**: TypeScript type definitions for data contracts, API responses, and module-specific typing.
3. **utils**: Utility functions specific to authentication (e.g., validation helpers).
4. **stores**: State management stores for handling session state and authentication flows.
5. **screens**: UI screens related to authentication, such as Sign-in and Sign-up UIs.
6. **services**: Contains services for authentication interaction with APIs or business logic (e.g., login, token handling).
7. **constants**: Static constants or messages used across the module (e.g., error messages, regex patterns).
8. **providers**: Context Providers for handling authentication-related React Context.
9. **components**: Reusable React components for handling authentication tasks such as forms, buttons, or breadcrumbs.

## Key Features

- **Sign-in and Authentication Flow**: Manage user sign-in with input validation, session handling, and error messaging.
- **Reusable Components**: Modular and dynamic components to build a flexible authentication system.
- **Validation Utilities**: Schema-based input validation using `zod`.
- **Multi-language Error Messages**: Localized (i18n) error and status messages for user interactions.

## Installation & Setup

Like `module-base`, `module-auth` is an integral part of the main project and does not require additional setup. It is automatically included and can be imported for usage related to authentication.

## Usage

Below are common use cases and examples for utilizing `module-auth`.

### Example: Using the `SigninForm` Component

The `SigninForm` is a key component for user authentication. Here is an example of how to use it:

```tsx
import { SigninForm } from '@module-auth/screens/SigninForm';

export function App() {
    return <SigninForm />;
}
```

## Contribution Guidelines

Developers contributing to `module-auth` should follow the project's coding standards (see [CODING.md](../../../CODING.md)). Ensure that all new updates or features are **modular, reusable**, and **secure**. Code reviews should be conducted before merging changes to ensure code quality.

## License

This module is provided under the same license as the main project repository.
