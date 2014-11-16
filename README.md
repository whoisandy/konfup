Konfup
======
Nodejs environments and configuration made easy.

[![Build Status](https://travis-ci.org/whoisandie/konfup.svg?branch=develop)](https://travis-ci.org/whoisandie/konfup)
[![npm version](https://badge.fury.io/js/konfup.svg)](http://badge.fury.io/js/konfup)

Konfup is an lightweight **environment and configuration loader**. A few things to note are the .env file
must always be located at the root directory, the config can be loaded via a name of a json file
located at the root or a path to the config file in any directory.

## Quickstart

Install the module from npm as shown.

```javascript
npm install konfup
```

An environment file `.env` located at the root file may be shown as below

```bash
NODE_ENV=dev
PORT=9001
BASIC=basic
S3_KEY=jasgday28y3r98ya0u0f9usg0sdfjh98y
S3_SECRET=kjhashdou20u09ueh00senfs0udfkaguy9e
```

A configuration file named `settings.json` located at the root may be as shown below

```json
{
  "name": "Your application name",
  "database": {
    "host": "localhost",
    "port": 27012,
    "user": "root",
    "pass": "pass",
    "name": "database"
  }
}
```

Thats it. To use the environment and config, just use the following two lines shown below.

```javascript
var express = require('express');
var konf = require('konfup');
var config = konf.env().config('settings');

var app = express();

// use the config object as follows
var db = config.database.name

// use the env variables as follows
app.listen(process.env.port);
```

Alternatively you could use the boot function to load both env and config. Its a wrapper to
run these two functions.

```javascript
var konf = require('konfup');
var config = konf.boot('settings');
```

## License

The MIT License (MIT)

Copyright (c) 2014 Bhargav Anand

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.