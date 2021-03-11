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
- Run the Application (Note: This will run for default path('./demo-files'), default filter('TODO') and default extension('.js'))
```
cd scan-node/
npm start
```

- Run Custom File Scan (Note: the default parameter can change in here.)
```
cd scan-node/
node -e 'require("./index").searchFilesInDirectoryAsync("./", "TODO", ".js")' 
```

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