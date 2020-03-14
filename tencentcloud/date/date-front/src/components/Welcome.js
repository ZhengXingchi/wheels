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
  <div className="jumbotron headbanmian" style={{ padding: '5px 10px' }}>
    {/* <h1>欢迎使用 <br /> 玉山鹊桥仙</h1> */}
    <h1>欢迎使用 <br /> 玉山便民网</h1>
    <p>祝大家工作顺利，爱情丰收。</p>
    <p>手机用户更多功能请点击右上角功能菜单</p>
    <p>如有疑问请联系助理qq:892625568</p>
    <p style={{ position: 'relative', zIndex: '1000' }}>
      <Link
        to="/add"
        role="button"
        className="btn btn-success btn-lg">
        我要上墙
      </Link>
      <br />
      <div style={{ marginBottom: '10px' }}></div>
      <Link
        to="/showgirl"
        role="button"
        className="btn btn-success btn-lg">
        女生墙
      </Link>
      &nbsp;
      <Link
        to="/showboy"
        role="button"
        className="btn btn-success btn-lg">
        男生墙
      </Link>
    </p>
  </div>
)

export default Welcome
