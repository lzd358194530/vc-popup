
## vc-popup-over

-----

描述

### 添加依赖

```shell
> yarn add vc-popup-over || npm i vc-popup-over || cnpm i vc-popup-over --by=yarn
```

### 引入

```javascript
import Vue from 'vue'
import VcPopupOver from 'vc-popup-over'
// 这里名字可以随意

Vue.use(VcPopupOver)
```

### 在具体页面中使用

```javascript
this.over = new this.$popup.Over({
  ...config
  propsData: {}
})

// e为事件Event, 比如click时候取得的evt, 与一些定位方法相关
// config可参考[popup-base/readme.md](https://github.com/deepkolos/vc-popup/blob/master/packages/popup-base/readme.md)

this.over.open(e, {
  ...config
  propsData: {}
})

this.over.close()
```

### propsData配置定义

```json
{
  e: Object // 从open(e, {})传进来的e
  
}
```

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/vc-popup-over.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
