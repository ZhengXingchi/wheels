import React from 'react'
import { Link } from 'react-router'
/**
 * 本组件为欢迎页（首页）
 * 由于几乎没有交互逻辑
 * 因此可以不使用类的写法
 * 
 * 实际上，ES6 的类经由 Babel 转码后
 * 其实还是返回一个类似的函数
 */
const Welcome = () => (
  <div className="jumbotron">
    <h1>欢迎使用 <br /> 玉山鹊桥仙网站</h1>
    <p>祝大家工作顺利，爱情丰收</p>
    <p>
      <Link
        to="/add"
        role="button"
        className="btn btn-success btn-lg">
        我要报名 &gt;
      </Link>
      &nbsp;
      <Link
        to="/todo"
        role="button"
        className="btn btn-success btn-lg">
        前往待办事项(新功能) &gt;
      </Link>
    </p>
  </div>
)

export default Welcome
