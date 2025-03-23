# Automated Testing with Jest

This document outlines the steps required to set up and run automated tests using Jest, a delightful JavaScript Testing Framework with a focus on simplicity.

## 1. Prerequisites

Before you begin, ensure you have the following prerequisites installed:

*   **Node.js:** Jest runs on Node.js. You can download it from the official website: [https://nodejs.org/](https://nodejs.org/) (Version 14 or later is recommended).
*   **npm or Yarn:** Node Package Manager (npm) comes bundled with Node.js.  Yarn is an alternative package manager that can be used instead. You can install Yarn globally using `npm install -g yarn`.
*   **Code Editor:** A code editor like VS Code, Sublime Text, or Atom is necessary to write and edit your code and tests.

## 2. Setup

Follow these steps to set up your test environment:

1.  **Create a Project Directory (if you don't have one):**

    bash
    mkdir my-project
    cd my-project
    

2.  **Initialize a Node.js Project:**

    Use `npm init` or `yarn init` to create a `package.json` file.  You can accept the defaults by pressing Enter through all the prompts.

    bash
    npm init -y  # Initializes with default settings
    # OR
    yarn init -y  # Initializes with default settings
    

3.  **Install Jest:**

    Install Jest as a development dependency using npm or Yarn.

    bash
    npm install --save-dev jest
    # OR
    yarn add --dev jest
    

4.  **Create a Source File (Example):**

    Create a source file (e.g., `sum.js`) with the function you want to test.

    javascript
    // sum.js
    function sum(a, b) {
      return a + b;
    }

    module.exports = sum;
    

5.  **Create a Test File (Example):**

    Create a test file (e.g., `sum.test.js`) to write your tests. Conventionally, test files are named with the `.test.js` or `.spec.js` extension.

    javascript
    // sum.test.js
    const sum = require('./sum');

    test('adds 1 + 2 to equal 3', () => {
      expect(sum(1, 2)).toBe(3);
    });
    

6.  **Configure `package.json` for Running Tests:**

    Modify the `scripts` section in your `package.json` file to include a `test` script that runs Jest.

    json
    {
      "name": "my-project",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "jest"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "jest": "^29.0.0" // Or your installed version
      }
    }
    

## 3. Running Tests

Now that you have set up your testing environment, you can run the tests using the following command:

bash
npm test
# OR
yarn test


This command will execute Jest and run all files matching the default test patterns (e.g., `*.test.js`, `*.spec.js`, `**/__tests__/**/*.[jt]s?(x)`).

**Other Useful Commands:**

*   **Watch Mode:** Run tests in watch mode. Jest will re-run tests whenever you save a file.

    bash
    npm test -- --watch
    # OR
    yarn test --watch
    

*   **Watch All:**  Watch all files, including those not covered by tests (useful for detecting unused code).

    bash
    npm test -- --watchAll
    # OR
    yarn test --watchAll
    

*   **Running Specific Tests:** To run a specific test file, you can provide the file path as an argument:

    bash
    npm test -- ./sum.test.js
    # OR
    yarn test ./sum.test.js
    

*   **Running Tests Based on Pattern:** Use `-t` to specify a pattern to match test names.

    bash
    npm test -- -t "adds 1 + 2"
    # OR
    yarn test -t "adds 1 + 2"
    

## 4. Configuration

Jest can be configured using a `jest.config.js` file in the root of your project. This file allows you to customize Jest's behavior, such as:

*   **Test Environment:**  Specify the environment in which your tests will run (e.g., `jsdom` for browser-like environments, `node` for Node.js environments).
*   **Test Match:**  Define the patterns used to find test files.
*   **Module Name Mapper:** Map module names to specific files, useful for mocking modules.
*   **Transform:** Specify how to transform files before testing (e.g., using Babel).
*   **Coverage Threshold:** Set coverage thresholds to ensure code quality.

**Example `jest.config.js`:**

javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  collectCoverage: true,
  coverageReporters: ["lcov", "text"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  verbose: true,
};


**Explanation of `jest.config.js` options:**

*   `testEnvironment`: Specifies the environment in which the tests should run. `node` is used here for a Node.js environment.
*   `testMatch`: Defines the patterns Jest uses to find test files.
*   `collectCoverage`: Enables code coverage reporting.
*   `coverageReporters`:  Specifies the types of coverage reports to generate.
*   `coverageThreshold`: Sets minimum thresholds for code coverage.  The test suite will fail if coverage falls below these values.
*   `moduleNameMapper`: Allows you to map module names to file paths. In this example, any import starting with `@/` will be resolved relative to the `src` directory.
*   `transform`: Defines how to transform files before running tests.  Here, it's using `babel-jest` to transform JavaScript files with Babel.  You might need to install `babel-jest`, `@babel/core`, and any relevant Babel presets/plugins as dev dependencies: `npm install --save-dev babel-jest @babel/core @babel/preset-env`
*   `verbose`: Increases the verbosity of the test output.

**Creating `jest.config.js`:**

Create the `jest.config.js` file in the root directory of your project and populate it with your desired configuration.

## 5. Additional Notes

*   **Code Coverage:**  Jest provides built-in code coverage reporting. Enable it by adding `"collectCoverage": true` to your `jest.config.js` and running your tests.  Review the generated coverage reports (usually in the `coverage` directory) to identify areas of your code that are not adequately tested.
*   **Mocking:**  Use Jest's mocking capabilities to isolate units of code during testing.  `jest.fn()`, `jest.mock()`, and `jest.spyOn()` are powerful tools for creating mocks and spies.
*   **Asynchronous Testing:**  Use `async/await` or return a `Promise` in your test functions to test asynchronous code.
*   **Matchers:**  Jest provides a rich set of matchers (e.g., `toBe`, `toEqual`, `toBeGreaterThan`) for asserting expected results in your tests. Refer to the Jest documentation for a complete list of matchers.
*   **Read the Jest Documentation:** The official Jest documentation is your best resource for learning more about Jest's features and capabilities: [https://jestjs.io/](https://jestjs.io/)
*   **Best Practices:**
    *   Write focused tests that test specific units of functionality.
    *   Follow the Arrange-Act-Assert pattern in your tests.
    *   Keep your tests concise and readable.
    *   Use meaningful test names.
    *   Regularly run your tests as part of your development workflow.

By following these steps, you should be able to set up and run automated tests using Jest effectively. Remember to consult the Jest documentation for more advanced configuration options and best practices.