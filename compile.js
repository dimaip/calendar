import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import filesize from 'filesize';

const config = require(path.join(__dirname, 'webpack.config.js'));
const compiler = webpack(config);

compiler.run((err, stats) => {
  stats.stats.map(stat => {
    console.log(`Completed in ${((stat.endTime - stat.startTime) / 1000)}`);
    const errors = stat.compilation.errors;
    if (errors && errors.length) {
      for (const error of errors) {
        console.log(error);
      }
    } else {
      const opts = stat.compilation.outputOptions;
      const resultSize = fs.statSync(path.join(opts.path, opts.filename)).size;
      console.log(filesize(resultSize));
    }
  });
});
