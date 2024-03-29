class Storage {

  constructor(props) {
    this.props = props || {}
    this.source = this.props.source || window.localStorage
    this.initRun()
  }
  remove (key) {
    this.source.removeItem([key])
    this.source.removeItem([`${key}__expires__`])
    let value = this.source.getItem([key])
    return value
  }
  get (key) {
    /*
    * get 获取方法
    * @ param {String}     key 键
    * @ param {String}     expired 存储时为非必须字段，所以有可能取不到，默认为 Date.now+1
    * @ 由@IT·平头哥联盟-首席填坑官∙苏南 分享,交流：912594095
    */

    let expired = this.source.getItem([`${key}__expires__`]) || (Date.now() + 1)
    let now = Date.now()

    if (now >= expired) {
      this.remove(key)
      return
    }
    const value = this.source.getItem([key]) ? JSON.parse(this.source.getItem([key])) : this.source.getItem([key])
    return value
  }
  set (key, value, expired) {
    /*
    * set 存储方法
    * @ param {String}     key 键
    * @ param {String}     value 值，
    * @ param {String}     expired 过期时间，以分钟为单位，非必须
    * @ 由@IT·平头哥联盟-首席填坑官∙苏南 分享,交流：912594095
    */

    this.source.setItem([key], JSON.stringify(value))
    if (expired) {
      this.source.setItem([`${key}__expires__`], Date.now() + 1000 * 60 * expired)
    }
    return value
  }
  initRun () {
    /*
    * set 存储方法
    * @ param {String}     key 键
    * @ param {String}     value 值，存储的值可能是数组/对象，不能直接存储，需要转换 JSON.stringify
    * @ param {String}     expired 过期时间，以分钟为单位
    * @ 由@IT·平头哥联盟-首席填坑官∙苏南 分享,交流：912594095
    */
    const reg = new RegExp('__expires__')
    let list = Object.keys(this.source)
    if (list.length > 0) {
      list.map((key, v) => {
        if (!reg.test(key)) {
          let now = Date.now()
          let expires = this.source.getItem([`${key}__expires__`]) || (Date.now() + 1)
          if (now >= expires) {
            this.remove(key)
          };
        };
        return key
      })
    };
  }
}
export default new Storage()
