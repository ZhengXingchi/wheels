import React, { Component, PropTypes } from 'react'
import handleChange from 'MIXIN/handleChange'
import { connect } from 'react-redux'
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile'
import userService from 'SERVICE/userService'
import config from 'CONFIG'
import Zmage from 'react-zmage'
// import { Link } from 'react-router'
/**
 * 本组件为欢迎页（首页）
 * 由于几乎没有交互逻辑
 * 因此可以不使用类的写法
 * 
 * 实际上，ES6 的类经由 Babel 转码后
 * 其实还是返回一个类似的函数
 */
/*eslint comma-dangle: [0, "always-multiline"]*/
/*eslint camelcase: [0, {properties: "never"}]*/
@connect( // 功能同 UTIL/createContainer
  ({ userData }) => ({ userData }),
  require('ACTION/user').default
)
export default class Add extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    // const data = [{
    //   url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    //   id: '2121'
    // }, {
    //   url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    //   id: '2122'
    // }]
    const data = []
    this.state = {
      files: data,
      multiple: false,
      birth: '', // 出生日期
      gender: '1', // 性别
      height: '', // 身高
      constellation: '', // 星座
      birthplace: '', // 出生地
      livingplace: '', // 现居地
      degree: '', // 学历
      occupational: '', // 职业
      webchat: '', // 微信号
      // 自我介绍
      character: '', // 性格
      habits: '', // 生活习惯
      hobby: '', // 兴趣爱好
      other: '', // 其它
      photos: [], // 生活照
      // 理想对象
      he_agerange: '', // 年龄范围
      he_appearance: '', // 外貌要求
      he_character: '', // 性格要求
      he_degree: '', // 学历要求
      he_coordinate: '', // 他(她)坐标
    }

    this.handleChange = handleChange.bind(this) // mixin
  }
  handleSubmit = () => {
    var { files, multiple, ...obj } = this.state
    obj.photos = files
    userService.wallhop(obj).then(res => {
      if (res.code === 200) {
        alert('提交成功')
        this.context.router.replace('/')
      } else {
        alert(res.msg)
      }
    })
  }
  onImageClick = (index, fs) => {
    console.log(fs[index].url)
    Zmage.browsing({ src: fs[index].url })
  }

  onChange = async (files, type, index) => {
    console.log(files, type, index)
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        let item = files[i]
        if (/^data:/.test(item.url)) {
          let formData = new FormData()
          if (item.file) {
            formData.append('file', item.file)
            console.log(formData, 'formdta')
            let result = await userService.uploadpic(formData)
            console.log('result', process.env, __DEV__, __PROD__)
            const baseUrl = __DEV__ ? config.baseUrl.dev : config.baseUrl.pro
            if (result.code === 200 && result.data) {
              result.data.url = baseUrl + result.data.url
              files[i] = result.data
            }
          }
        }
      }
    }
    console.log(files, 'files')

    this.setState({
      files
    })
  }
  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex
    this.setState({
      multiple: index === 1
    })
  }
  render () {
    const { files } = this.state
    return (
      <div className="jumbotron" >
        <div className="title" style={{ textAlign: 'center' }}>
          <h1> 我要上墙</h1>
        </div>

        {/* <p>
          <Link
            to="/msg"
            role="button"
            className="btn btn-success btn-lg">
            前往留言板 &gt;
          </Link>
          &nbsp;
          <Link
            to="/todo"
            role="button"
            className="btn btn-success btn-lg">
            前往待办事项(新功能) &gt;
          </Link>
        </p> */}
        <form
          onSubmit={
            (e) => {
              e.preventDefault() // 防页面跳转
              this.handleSubmit()
            }
          }
        >
          <div style={{
            height: '30px',
            lineHeight: '30px',
            fontSize: '20px',
            textAlign: 'center',
            margin: '0 80px 10px',
            borderBottom: '1px solid #a190df'
          }}>基本信息</div>
          <div className="form-group">
            <label for="birth">出生日期</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="例如：1990" />
          </div>
          <div className="form-group">
            <label for="gender">性别</label>
            <select value={this.state.gender} class="form-control" name="gender" style={{ width: '100%', height: '35px' }} onChange={this.handleChange}>
              <option value='1'>男</option>
              <option value='2'>女</option>
            </select>
          </div>
          <div className="form-group">
            <label for="height">身高</label>
            <input onChange={this.handleChange} name="height" className="form-control" id="height" placeholder="" />
          </div>
          <div className="form-group">
            <label for="constellation">星座</label>
            <input onChange={this.handleChange} name="constellation" className="form-control" id="constellation" placeholder="" />
          </div>
          <div className="form-group">
            <label for="birthplace">出生地</label>
            <input onChange={this.handleChange} name="birthplace" className="form-control" id="birthplace" placeholder="" />
          </div>
          <div className="form-group">
            <label for="livingplace">现居地</label>
            <input onChange={this.handleChange} name="livingplace" className="form-control" id="livingplace" placeholder="" />
          </div>
          <div className="form-group">
            <label for="degree">学历</label>
            <input onChange={this.handleChange} name="degree" className="form-control" id="degree" placeholder="" />
          </div>
          <div className="form-group">
            <label for="occupational">职业</label>
            <input onChange={this.handleChange} name="occupational" className="form-control" id="occupational" placeholder="" />
          </div>
          <div className="form-group">
            <label for="webchat">微信号</label>
            <input onChange={this.handleChange} name="webchat" className="form-control" id="webchat" placeholder="仅对会员可见" />
          </div>
          <div style={{
            height: '30px',
            lineHeight: '30px',
            fontSize: '20px',
            textAlign: 'center',
            margin: '0 80px 10px',
            borderBottom: '1px solid #a190df'
          }}>自我介绍</div>
          <div className="form-group">
            <label for="character">性格</label>
            <input onChange={this.handleChange} name="character" className="form-control" id="character" placeholder="" />
          </div>
          <div className="form-group">
            <label for="habits">生活习惯</label>
            <input onChange={this.handleChange} name="habits" className="form-control" id="habits" placeholder="" />
          </div>
          <div className="form-group">
            <label for="hobby">兴趣爱好</label>
            <input onChange={this.handleChange} name="hobby" className="form-control" id="hobby" placeholder="" />
          </div>
          <div className="form-group">
            <label htmlFor="content">其它</label>
            <textarea
              name="other"
              className="form-control"
              rows="3"
              placeholder="请输入内容..."
              onChange={this.handleChange}
              value={this.state.other}>
            </textarea>
          </div>
          <label for="he_degree">生活照</label>
          <div style={{ color: 'rgb(228, 124, 124)', fontSize: '8' }}>微信端暂不支持多选，谢谢</div>
          <WingBlank>
            <SegmentedControl
              values={['切换到单选', '切换到多选']}
              selectedIndex={this.state.multiple ? 1 : 0}
              onChange={this.onSegChange}
            />
            <ImagePicker
              files={files}
              onChange={this.onChange}
              onImageClick={this.onImageClick}
              selectable={files.length < 7}
              multiple={this.state.multiple}
              accept="image/*"
            />
          </WingBlank>
          <div style={{
            height: '30px',
            lineHeight: '30px',
            fontSize: '20px',
            textAlign: 'center',
            margin: '0 80px 10px',
            borderBottom: '1px solid #a190df'
          }}>理想对象</div>
          <div className="form-group">
            <label for="he_agerange">年龄范围</label>
            <input onChange={this.handleChange} name="he_agerange" className="form-control" id="he_agerange" placeholder="" />
          </div>
          <div className="form-group">
            <label for="he_appearance">外貌要求</label>
            <input onChange={this.handleChange} name="he_appearance" className="form-control" id="he_appearance" placeholder="" />
          </div>
          <div className="form-group">
            <label for="he_character">性格要求</label>
            <input onChange={this.handleChange} name="he_character" className="form-control" id="he_character" placeholder="" />
          </div>
          <div className="form-group">
            <label for="he_degree">学历要求</label>
            <input onChange={this.handleChange} name="he_degree" className="form-control" id="he_degree" placeholder="" />
          </div>
          <div className="form-group">
            <label for="he_coordinate">他(她)坐标</label>
            <input onChange={this.handleChange} name="he_coordinate" className="form-control" id="he_coordinate" placeholder="" />
          </div>
          <div className="form-group">
            <label htmlFor="content">其它</label>
            <textarea
              name="he_other"
              className="form-control"
              rows="3"
              placeholder="请输入内容..."
              onChange={this.handleChange}
              value={this.state.he_other}>
            </textarea>
          </div>
          <button type="submit" className="btn btn-default" style={{ display: 'block', margin: '0 auto' }}>提交</button>
        </form >

      </div >
    )
  }
}
