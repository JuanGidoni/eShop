# E-commerce Application

This project is an e-commerce application built with React, TypeScript, and following Domain-Driven Design (DDD) principles and Hexagonal Architecture.

## Architecture Overview

The application is structured following the Hexagonal Architecture (also known as Ports and Adapters) pattern:

- `src/domain`: Contains the core business logic and entities.
- `src/application`: Houses the application services that orchestrate the use cases.
- `src/infrastructure`: Implements the adapters for external dependencies (e.g., storage).
- `src/components`: React components for the user interface.

## Key Features

- Product listing and details
- Shopping cart functionality
- Checkout process
- Persistent cart storage using localStorage

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Testing

Run the test suite with: `npm test`

## Documentation

The codebase is self-documented with JSDoc comments. For an overview of the architecture and design decisions, refer to the comments in the source files.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.