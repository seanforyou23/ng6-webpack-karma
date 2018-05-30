# ng6-webpack-karma

1. Notice the build and demo scripts work

 ```bash
 npm install
 npm run build
 npm run start:demo
 ```

2. Notice the testing framework does not properly startup

 ```bash
 npm run test
 ```

3. Notice that by upgrading to typescript 2.8.1, the testing framework suddenly works again

```bash
npm install typescript@2.8.1
npm run test
```

4. But angular 6 will not build with typescript 2.8.1

```bash
npm run build
npm run start:demo
```

## Assumed Problem - Conflicting TypeScript version support
Angular 6 requires typescript@2.7.2, while karma-webpack requires typescript@2.8.1.
