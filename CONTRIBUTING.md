# Contributing to Qualinova Frontend

First off, thanks for taking the time to contribute! 🙌

The following are some guidelines to help you make meaningful contributions to this project.

## How to Contribute

### Reporting Bugs

If you find a bug in the project, please follow these steps:

1. **Search for existing issues** to make sure it hasn't been reported yet.
2. If it hasn’t been reported, open a new issue using the **Bug Report** template.
3. Provide as much detail as possible, including:
   - Steps to reproduce the bug
   - Expected vs. actual behavior
   - Relevant logs or screenshots

### Requesting Features

We welcome new feature suggestions! Please:

1. **Check for existing feature requests** to avoid duplicates.
2. If your feature hasn't been requested, open a new issue using the **Feature Request** template.
3. Provide a clear and detailed description of the feature, its use cases, and why it's important.

### Making Code Changes

We accept code contributions! If you want to contribute code, please follow these steps:

1. Fork the repository and clone it locally.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and write tests to cover them.
4. Make sure your code adheres to our coding standards.
5. Commit your changes with a clear and descriptive message.
6. Push your changes and open a Pull Request (PR).
   - Please ensure your PR description explains the **what**, **why**, and **how** of your changes.

### Code Style and Quality

- Follow the existing **coding style** in the project.
- **Test your code** thoroughly and ensure that it passes the tests before submitting a PR.

## Testing

We follow a **unit testing** approach, and **tests are written alongside each component** to ensure their functionality and integrity. When adding new components or making changes to existing ones, please include corresponding unit tests.

## Project Structure

This project follows **Atomic Design** principles to organize components. The structure is modular and organized into five levels:

1. **Atoms**: Basic building blocks like buttons, inputs, labels, etc.
2. **Molecules**: Groups of atoms that form more complex elements (e.g., a form group, a card).
3. **Organisms**: Larger, reusable components (e.g., a navigation bar, a user profile).
4. **Templates**: Page-level components that define the layout and structure.
5. **Pages**: Specific pages that use templates and organize the content for the app.

The project is built using **Next.js** and styled with **Tailwind CSS** for utility-first styling.

## Commit Guidelines

- Follow the GIT_GUIDELINE.md

## Thank You!

Thanks again for contributing! 🎉 Every contribution is greatly appreciated, whether it's code, documentation, or bug reports. Your efforts help make this project better for everyone.

---

### Extra Notes

Feel free to link to any other related documentation, guides, or examples here.

- Link to similar open-source projects or code snippets
- Links to related research or design discussions
