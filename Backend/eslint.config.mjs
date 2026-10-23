export default [
  {
    // files to check when running eslint
    files: ["**/*.js"], //only check for .js files in server dir
    rules:{
      semi:'error', //for semi colons
      'no-unused-vars':'warn' //warn if variables are unused
    }
  },
];
