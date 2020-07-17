const VueCube = require('../src');

const vueCube = new VueCube({
  entry: './cube.vue',
  output: './src'
})

vueCube.auto();

// vueCube.build().then((res) => {
//   vueCube.output(res).watching();
//   vueCube.run();
// })