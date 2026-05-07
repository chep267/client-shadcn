# Module Base

## Overview

The `module-base` is a foundational module in the project, providing utilities, constants, hooks, services, and components that are commonly used across other modules. It serves as the core building block to ensure code reusability, consistency, and maintainability across the project.

## Folder Structure

The `module-base` contains the following directories:

1. **apis**: Contains API services and interfaces used throughout the application.
2. **hooks**: Custom React hooks for shared logic and functionality.
3. **types**: TypeScript type definitions used globally within the module or across modules.
4. **utils**: Utility functions for common operations, such as data manipulation or string normalization.
5. **mixins**: Contains reusable styles or JavaScript logic that can be mixed into components.
6. **stores**: State management stores (e.g., Zustand) for shared application state.
7. **screens**: Placeholder for any screens or UIs managed within this module.
8. **services**: Application-specific services, such as data-fetching or transformation logic.
9. **constants**: Static constants or configuration values used throughout the module.
10. **providers**: Context Providers for application-wide React Context Management.
11. **components**: Shared UI components (e.g., buttons, modals, etc.) that are generic and reusable.

## Key Features

- **Reusable Utilities**: Common utility functions to support shared operations like string normalization, data deep checking, and more.
- **Centralized State Management**: Shared global state with lightweight and efficient state management tools.
- **Extensible Components**: Predefined components that are configurable and easy to integrate.
- **Services and APIs**: A layer for interacting with external APIs or handling application-specific logic.

## Installation & Setup

This module is part of the overall project monorepo and does not require separate installation. It is included as a core module and can be directly imported into other modules or components.

## Usage

You can import and use functions, components, or hooks from `module-base` wherever necessary. Examples include:

1. **Using Utility Functions:**

    ```typescript
    import { normalizeString } from '@module-base/utils/string';

    const normalized = normalizeString('àéïöú');
    console.log(normalized); // Output: 'aeiou'
    ```

2. **Using Custom Hooks:**

    ```typescript
    import { useCustomHook } from '@module-base/hooks/useCustomHook';

    const { data, error } = useCustomHook();
    ```

3. **Accessing Constants / Components:**
    ```typescript
    import { BASE_CONSTANT } from '@module-base/constants/base';
    import { Button } from '@module-base/components/button';
    ```

## Contribution Guidelines

Developers working on the `module-base` should adhere to the project's coding guidelines (see [CODING.md](../../../CODING.md)) and ensure that any modifications here continue to serve the functionality of other dependent modules.

## License

This module is licensed under the same license as the rest of the project.
