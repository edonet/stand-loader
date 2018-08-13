# stand-loader
stand in modules for webpack


## Installation
npm
``` shell
$ npm install -g @arted/stand-loader
```

or yarn
``` shell
$ yarn global add @arted/stand-loader
```

## Usage
``` javascript
// webpack.config.js
const standloader = require('@arted/stand-loader');

module.exports = {
	...
    module: {
        rules: [
            ...
            standLoader({
                test: '/path/to/module.js'
                ...
            })
        ]
    }
};

// app.js
import mod from '@arted/stand-loader?name=test';
```
