Konfup [![Build Status](https://travis-ci.org/whoisandie/konfup.svg?branch=master)](https://travis-ci.org/whoisandie/konfup)
============================================================================================================================
Nodejs configuration made easy.

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

Do Whatever The Fuck You Want License (DWTFYT)

Copyright (c) 2014 Whoever uses it.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation, to use it ("Software") without
restriction. You are free to copy, modify merge, publish distribute, sublicense
and/or sell copies of the Software.

THE SOFTWARE IS PROVIDED WITHOUT ANY WARRANTY OF ANY KIND. THE AUTHOR IS
NOT RESPONSIBLE FOR ANY EVENT OR DAMAGES THAT THE LIBRARY MIGHT CAUSE, AND
ARENT LIABLE FOR ANY CLAIM.

Cheers !!