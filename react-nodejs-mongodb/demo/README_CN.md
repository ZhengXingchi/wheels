## Cannot find module babel-preset-react-app/node_modules/@babel/runtime/helpers/slicedToArray
参考[Cannot find module babel-preset-react-app/node_modules/@babel/runtime/helpers/slicedToArray](https://github.com/facebook/create-react-app/issues/7183)

`yarn add @babel/runtime`


## node_modules/@babel/runtime/helpers/esm/defineProperty
参考[babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js:1 SyntaxError: Unexpected token export at createScript (vm.js:80:10](https://stackoverflow.com/questions/57074916/babel-preset-react-app-node-modules-babel-runtime-helpers-esm-defineproperty-js)
`npm install babel-preset-react-app@9.0.0`


## 关于@babel-node
新版本的@babel-cli并没有包含@babel-node
需要
`npm i @babel-node -S`
`NODE_ENV=test ./node_modules/.bin/babel-node ./server/server.js`