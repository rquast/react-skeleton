# Serverless (AWS) React & Apollo Server Monorepo

### Includes
- Lerna
- TypeScript
- Apollo Server Lambda with Lambda Subscriptions & Apollo Client
- ESLint/Prettier for TypeScript and React
- Bulma React Components (bulma.io)

### Installing dependencies
```
yarn run bootstrap
```

### Running the frontend
```
yarn run watch
```
Then in a second terminal...
```
yarn run start
```

### Building the backend
```
yarn run build
yarn run test
```

### TODO
- Create a serverless.yml to deploy the Apollo Server and Websocket handler
- Add Apollo Client to the react app
- Add serverless-offline plugin with Websocket support
- Add serverless-dynamodb offline plugin for local development
- Clean up linting and config
- Add dotenv/babel-env to link to environment /config

### Caveats
Debugging React repos shows transpiled code only since CRA2 doesn't support monorepos well.
