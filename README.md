# Email Stringify

email-stringify is a utility function to stringify emails html files to string with named parameters

## Installation
```bash
npm i email-stringify --save
```
## How to use
* `Create email-files folder in project root directory`
* `Create email.config.js in project root directory`

## Usage

`email.config.js`
```javascript

module.exports = {
//Prefix to wrap named variables in html files 
  prefix: "%%",
//Html Files to include with an array of available variables
  files: {
    test: ["Name"],
  },
};

```
`Get Email String`
```javascript

const { stringifyEmail } = require("email-stringify");
//stringifyEmail takes two paramters
// filename : name of html file
//args : Object containing each variable to change with value
const emailString = await stringifyEmail({
    filename: "test",
    args: { Name: "Ismail" },
  });

```

## License
[MIT](https://choosealicense.com/licenses/mit/)