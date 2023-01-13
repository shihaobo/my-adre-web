# hr-cadre-web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

页面代码结构
# Props 顺序
  * 标签的 Props 应该有统一的顺序，依次为指令、属性和事件。
  <my-component
    v-if="if"
    v-show="show"
    v-model="value"
    ref="ref"
    :key="key"
    :text="text"
    @input="onInput"
    @change="onChange"
  />

# 组件选项的顺序
  * 组件选项应该有统一的顺序。

  export default {
    name: '',

    mixins: [],

    components: {},

    props: {},

    data() {},

    computed: {},

    watch: {},

    created() {},

    mounted() {},

    destroyed() {},

    methods: {},
  };

  # components
    * import ChooseFlow from "./components/choose-flow.vue"
    * 大驼峰
      components: {
        ChooseFlow
      },
    * 使用，在单文件组件中没有内容的组件应该是自闭合的。
      <choose-flow />
