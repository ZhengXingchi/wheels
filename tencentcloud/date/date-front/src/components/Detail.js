import React, { Component, PropTypes } from 'react'
import handleChange from 'MIXIN/handleChange'
import { connect } from 'react-redux'
import { ImagePicker, WingBlank } from 'antd-mobile'
import userService from 'SERVICE/userService'
import { Modal } from 'antd-mobile'
const alert = Modal.alert
import Zmage from 'react-zmage'
import storage from 'UTIL/storage'
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

  genData = async (data) => {
    let dataBlob = {}
    let result = await userService.getdetail(data)
    if (result.code === 200) {
      dataBlob = result.data
    }
    return dataBlob
  }

  async componentDidMount () {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax

    // this.rData = await this.genData()
    // console.log('rdata', this.rData)
    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows(this.rData),
    //   isLoading: false
    // })
    let id = this.props.params.id
    let rData = await this.genData({ _id: id })
    this.setState({
      ...rData
    })

  }

  onImageClick = (index, fs) => {
    let token = storage.get('token')
    if (token) {
      Zmage.browsing({ src: fs[index].url })
    } else {
      alert('查看高清大图需要登录')
    }
  }
  getnumber = async (id) => {
    console.log(id, 'getnumber')
    let result = await userService.getwebchat({ id })
    console.log(result)
    if (result.code === 200) {
      alert(`微信号为${result.data.webchat}`)
    } else {
      alert(result.msg)
    }

  }
  getWebchat = (id) => {
    let token = storage.get('token')
    if (token) {
      let userdata = storage.get('userdata')
      if (userdata._id) {
        if (userdata.isVip != 0) {
          alert('注意', '尊金的超级会员，您好！为了健康交友,请慎重获取微信号，是否继续?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => this.getnumber(id) },
          ])
        } else {
          alert('注意', '为了健康交友,普通会员每周只能获取一个微信号，是否继续?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => this.getnumber(id) },
          ])
        }

      } else {
        alert('该操作需要登录')
      }
    } else {
      alert('该操作需要登录')
    }

  }





  render () {
    const data = this.state
    const files = []
    return (
      <div className="jumbotron" >
        <div className="title" style={{ textAlign: 'center' }}>
          <h1> {data.username}</h1>
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
          {
            data.birth ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">出生日期</label>
              {data.birth}
            </div> : null
          }
          {
            data.gender ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">性别</label>
              {data.gender === '2' ? '女' : '男'}
            </div> : null
          }
          {
            data.height ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">身高</label>
              {data.height}
            </div> : null
          }
          {
            data.constellation ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">星座</label>
              <span style={{ display: 'inline-block', maxWidth: '200px' }}>{data.constellation}</span>

            </div> : null
          }
          {
            data.birthplace ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">出生地</label>
              <span style={{ display: 'inline-block', maxWidth: '200px' }}>{data.birthplace}</span>

            </div> : null
          }
          {
            data.livingplace ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">现居地</label>
              <span style={{ display: 'inline-block', maxWidth: '200px' }}>{data.livingplace}</span>

            </div> : null
          }
          {
            data.degree ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">学历</label>
              <span style={{ display: 'inline-block', maxWidth: '200px' }}>{data.degree}</span>

            </div> : null
          }
          {
            data.occupational ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">职业</label>
              <span style={{ display: 'inline-block', maxWidth: '200px' }}>{data.occupational}</span>

            </div> : null
          }
          {
            data.webchat ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">微信号</label>
              {data.webchat}
            </div> : null
          }
          <div style={{
            height: '30px',
            lineHeight: '30px',
            fontSize: '20px',
            textAlign: 'center',
            margin: '0 80px 10px',
            borderBottom: '1px solid #a190df'
          }}>自我介绍</div>
          {
            data.character ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">性格</label>
              <span style={{ display: 'inline-block', maxWidth: '200px' }}>{data.character}</span>

            </div> : null
          }
          {
            data.habits ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">生活习惯</label>
              <span style={{ display: 'inline-block', maxWidth: '200px' }}> {data.habits}</span>

            </div> : null
          }
          {
            data.hobby ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">兴趣爱好</label>
              <span style={{ display: 'inline-block', maxWidth: '200px' }}> {data.hobby}</span>

            </div> : null
          }
          {
            data.other ? <div className="form-group">
              <label style={{ width: '80px', verticalAlign: 'top' }} for="birth">其它</label>
              <span style={{ display: 'inline-block', maxWidth: '200px' }}>{data.other}</span>

            </div> : null
          }
          <label style={{ width: '80px' }} for="he_degree">生活照</label>
          <div style={{ color: '#aa9999', fontSize: '8' }}>点击查看大图</div>
          <WingBlank>
            <ImagePicker
              files={data.photos}
              onChange={this.onChange}
              onImageClick={this.onImageClick}
              selectable={files.length < 7}
              multiple={this.state.multiple}
              accept="image/*"
              disableDelete={true}
              selectable={false}
              style={{ marginLeft: '-15px' }}
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
          {
            data.he_agerange ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">年龄范围</label>
              <span style={{ display: 'inline-block', maxWidth: '200px' }}> {data.he_agerange}</span>

            </div> : null
          }
          {
            data.he_appearance ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">外貌要求</label>
              <span style={{ display: 'inline-block', maxWidth: '200px' }}>{data.he_appearance}</span>
            </div> : null
          }
          {
            data.he_character ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">性格要求</label>
              <span style={{ display: 'inline-block', maxWidth: '200px' }}>{data.he_character}</span>
            </div> : null
          }
          {
            data.he_degree ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">学历要求</label>
              <span style={{ display: 'inline-block', maxWidth: '200px' }}>{data.he_degree}</span>
            </div> : null
          }
          {
            data.he_coordinate ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">他(她)坐标</label>
              <span style={{ display: 'inline-block', maxWidth: '200px' }}>{data.he_coordinate}</span>
            </div> : null
          }
          {
            data.he_other ? <div className="form-group">
              <label style={{ width: '80px' }} for="birth">其它</label>
              <span style={{ display: 'inline-block', maxWidth: '200px' }}>{data.he_other}</span>
            </div> : null
          }


          <button onClick={() => this.getWebchat(data._id)} className="btn btn-default" style={{ display: 'block', margin: '0 auto' }}>进一步了解</button>
        </form >

      </div >
    )
  }
}
