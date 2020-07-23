const VueCube = require('../lib');

const vueCube = new VueCube({
  entryDir: './vue',
  output: './src'
})

vueCube.auto();

// vueCube.build().then(({ error }) => {
//   vueCube.run().watching();
// })