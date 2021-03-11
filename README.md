# Scan NodeJS App
Node Js Application for scanning &amp; matching files in directories

## Requirements & Installation
- Install Nodejs at here : https://nodejs.org/en/
- Installation 
```
git clone https://github.com/zawmyolatt/scan-node.git
cd scan-node/
npm install
```

## Configuration and Run
- Run the Application
```
cd scan-node/
npm start
```
- (Note: This will run for default path('./demo-files'), default filter('TODO') and default extension('.js'))

- Run Custom File Scan
```
cd scan-node/
node -e 'require("./index").searchFilesInDirectoryAsync("./", "TODO", ".js")' 
```
- (Note: the default parameter can change in here.)

## Tests
- Run the unit tests
```
cd scan-node/
npm test
```
- Unit Test Files
```
/scan-node/test/index.test.js
```

## License

The Scan Node App is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).