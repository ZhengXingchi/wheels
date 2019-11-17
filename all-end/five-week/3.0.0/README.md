# front

## 表单校验工具
veeValidate
Vuelidate

## 坑
`Do not use built-in or reserved HTML elements as component id: header`

在`/components/Header.vue`
```

<script>
export default {
  name: 'header', //将name改为Header
  
}
</script>

```



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

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
