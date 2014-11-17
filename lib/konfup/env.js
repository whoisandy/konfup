// TODO: Roll out your own environment loader

// 1. A single .env file no matter what
// 2. Takes in two parameters, one parameters or no parameters
//    - 2 params: Set the env & remove them from the process env scope
//    - 1 param: Set the NODE_ENV prop on process env to param
//    - 0 params: Set the NODE_ENV prop to a default or since this is
//        being handled leave it to undefined.