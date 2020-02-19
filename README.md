# egg-validator

A validate middleware for egg.js

## Install

```
$ npm i eggjs-validator --save
```

## Usage

1.Create a middleware file ```app/middleware/validator.js```

```
'use strict';

module.exports = require('eggjs-validator');

```
2.Open a middleware in ```config/config.default.js```

```
config.middleware = [
    'validator'
];

```
3.Add rules to ```app/rules/```
```
// app/rules/user.js

"use strict";

module.exports = {
  getUserInfo: {
    id: {
      required: true,
      message: 'id不能为空'
    }
  }
}

// app/rules/news.js

"use strict";

module.exports = {
  addNews: {
    link: [
      {
        required: true,
        message: 'link不能为空'
      },
      {
        type: 'string',
        message: 'link 必须为是链接',
        validator: (rule, value) => {
          return rules.isURL(value);
        },
      },
    ]
  }
}

```

## Api

#### type
- string: Must be of type string. This is the default type.
- number: Must be of type number.
- boolean: Must be of type boolean.
- method: Must be of type function.
- regexp: Must be an instance of RegExp or a string that does not generate an exception when creating a new RegExp.
- integer: Must be of type number and an integer.
- float: Must be of type number and a floating point number.
- array: Must be an array as determined by Array.isArray.
- object: Must be of type object and not Array.isArray.
- enum: Value must exist in the enum.
- date: Value must be valid as determined by Date
- url: Must be of type url.
- hex: Must be of type hex.
- email: Must be of type email.
- any: Can be any type.

#### message
error message.

#### asyncValidator
Asynchronous check.
```
{
        type: 'string',
        message: 'link 必须为是链接',
        asyncValidator: async(rule, value) => {
          const res = await request.get(...)
          ...
          return true
        },
},
```

#### validator
Synchronous check.

## Rules

Please refer to https://www.npmjs.com/package/validator

## License
Everything is MIT.












