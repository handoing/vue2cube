vue2cube
=================

使用类似vue的开发方式开发cube应用。

主要特性：

- 将tpl、css、js文件合为vue文件
- 可配合编辑器vue插件进行代码高亮或提示
- 可使用css预处理器


安装
------------

    npm init -y
    npm install https://github.com/handoing/vue2cube

使用
------------
首先通过cube开发者工具初始化项目，在cube根目录下，创建`run.js`，通过require方式引入vue2cube。
例如：

```js
const VueCube = require('vue2cube');

const vueCube = new VueCube({
  entry: './cube.vue', // entry指定的文件存在，使用该文件，不存在时，会生成名为cube.vue的默认模板
  output: './src'
})

vueCube.auto();
```

执行`node run.js`。

参数
------------
#### VueCube({ entry, output[, options] })

- `entry <string>` vue入口文件路径。
- `output <string>` 输出文件路径（一般直接输出为`cube_root/src`）
- `options <object>` 详见Options

#### Options

- `compiler <object>` 自定义vue文件解析工具，详见[vue-template-compiler](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler "vue-template-compiler")。
- `typesHandler <object>` 可用来操作template、script、styles
- `vueFileExtension <array>` 指定可解析的vue文件后缀
- `styleParser <function>` 自定义方法解析style，详见`StyleParser`

#### TypesHandler

- `template <function>` 可覆盖默认tpl解析操作。
```js
  template: function({ content }) {
    const templateParser = new TemplateParser();
    return templateParser.parse(content);
  }
```
- `script <function>` 可覆盖默认js解析操作。
```js
  script: function({ content }) {
    const scriptParser = new ScriptParser();
    return scriptParser.parse(content);
  },
```
- `styles <function>` 可覆盖默认css解析操作。
```js
  styles: function(styles) {
	return styles.reduce((total, content) => {
	    const styleParser = new StyleParser();
        return total += styleParser.parse(content);
    }, '');
  }
```

#### StyleParser

目前只支持less预处理器，如果想用其他预处理器，可通过styleParser进行解析。
```js
var sass = require('node-sass');
const vueCube = new VueCube({
  entry: './cube.vue',
  options: {
    styleParser: function(code) {
      const result = sass.renderSync({
        data: code
      });
      return result.css.toString();
    }
  }
})
```

方法
------------
#### auto()

如果不想拆解执行步骤可直接调用auto方法即可。

#### build()

只进行解析，返回promise，result为数组，元素分别为tpl、js、styles解析后的代码。

#### output()

输出cube.tpl、cube.js、cube.css到指定目录。

#### watching()

监听vue文件变化，只可在output返回的对象上调用。

#### run()

调用cubetool run。

#### 组合使用：

```js
vueCube.build().then((res) => {
  vueCube.output(res).watching();
  vueCube.run();
})
```

说明
------------
因为vue与cube的实现及使用存在一些差异，该工具已最大程度将其抹平，以下列出了相关差异，更好的使开发者理解和融入其中。

#### 插值
- [x] `<span>Message: {{ msg }}</span>`

#### 指令
- [x] v-show
- [x] v-model
- [x] v-text
- [x] v-html
- [x] v-for
- [x] v-if
- [x] v-else
- [x] v-else-if
- [x] v-bind
- [x] v-on
- [x] class
- [x] style
- [x] filter
- [ ] v-once
- [ ] v-pre
- [ ] v-cloak
- [ ] 动态参数
- [ ] 修饰符
- [ ] 生命周期（请使用cube提供的开发方式）
- [ ] 计算属性
- [ ] 属性侦听
- [ ] 组件
- [ ] 动画

建议
------------
- 不建议在用了cube较独立的模板特性的项目下使用

示例
------------
见`example`目录。

