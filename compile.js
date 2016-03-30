import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import filesize from 'filesize';

const config = require(path.join(__dirname, 'webpack.config.js'));
const compiler = webpack(config);

compiler.run((err, stats) => {
  console.log(`Completed in ${((stats.endTime - stats.startTime) / 1000)}`);

  const errors = stats.compilation.errors;
  if (errors && errors.length) {
    for (const error of errors) {
      console.log(error);
    }
  } else {
    const opts = stats.compilation.outputOptions;
    const resultSize = fs.statSync(path.join(opts.path, opts.filename)).size;
    console.log(filesize(resultSize));
  }
});
