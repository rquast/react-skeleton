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
- Add lerna update wizard for dependency management: https://github.com/Anifacted/lerna-update-wizard
- Create a serverless.yml to deploy the Apollo Server and Websocket handler
- Add Apollo Client to the react app
- Add serverless-offline plugin with Websocket support
- Add serverless-dynamodb offline plugin for local development
- Clean up linting and config
- Add dotenv/babel-env to link to environment /config
- Add BDD feature tests to drive outside-in development: https://github.com/bencompton/jest-cucumber
- Create a guide for example mapping and specification for developing feature tests
- Integrate TSOA for external webhooks and swagger documentation
- Add CI/CD pipeline configuration (CodeBuild/CodeDeploy?) or something else. Needs good monorepo support for building individual components.
- Bundle client app to S3 endpoint behind cloudfront config and add domain/cert configuration
- Add OpenID Connect authentication for Apollo and TSOA (via lambda function?).. maybe use Anvil Connect but port to DynamoDB so it can run serverless
- Improve the PubSub system for Apollo Lambda
- Standardize code commit messages for changelog history: https://github.com/conventional-changelog/standard-version

### Caveats
Debugging React repos shows transpiled code only since CRA2 doesn't support monorepos well.
