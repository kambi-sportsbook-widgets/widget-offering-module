# Kambi Offering Module

> The offering module is used as an interface for widgets and applications using the Kambi Offering API.

## Kambi Offering API

The documentation for the API is accessible on: https://e1-api.kambi.com/offering/v2018/docs/#/docs/intro/overview

## Development

```bash
# Install dependencies
npm install

# Start webpack
npm start

# Run tests
npm run test
# in watch mode
npm run test --watch

# Start flow
npm run flow
# in watch mode
npm run flow:watch
```

### VS Code

Running the tests in the vscode debugger is setup based on the `/.vscode/launch.json` file. To run **all tests** press `F5` and you will be able to put breakpoints in your code and inspect API responses etc.
