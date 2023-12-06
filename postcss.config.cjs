/*
const path = require('path');

const aliasMapping = {
  'store@css': (filename) => path.resolve(__dirname, `src/app/_css/${filename}`),
  'store@fonts': (filename) => path.resolve(__dirname, `src/app/_assets/fonts/${filename}`),
};
*/

module.exports = {
  plugins: {
    //    'postcss-omit-import-tilde': {},
    'postcss-import': {
      /*
      root: path.resolve(__dirname, 'src'),
//      path: ['app/_assets', 'app/_css'],
      skipDuplicates: true,
      resolve: (id, basedir, importOptions) => {
        const [aliasName, filename] = id.split('/');
        return aliasMapping[aliasName](filename);
      }
*/
    },
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
