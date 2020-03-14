import React, { Component, PropTypes } from 'react'
import handleChange from 'MIXIN/handleChange'
import { connect } from 'react-redux'
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile'
import userService from 'SERVICE/userService'
import config from 'CONFIG'
import Zmage from 'react-zmage'
import storage from 'UTIL/storage'
import { Modal } from 'antd-mobile'
import { List, Picker, InputItem, TextareaItem } from 'antd-mobile'

import { createForm } from 'rc-form'
const alert = Modal.alert
// import imageConversion from 'image-conversion'
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
class Add extends Component {
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
      fileTouch: false,
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
    this.setState({
      fileTouch: true
    })
    if (this.state.files.length <= 0) {
      return
    }
    this.props.form.validateFields((error, value) => {
      if (error) {
        return
      }
      this.setState({
        fileTouch: false
      })
      var { files, fileTouch, multiple, ...obj } = this.state
      value.photos = files
      value.gender = value.gender[0]
      userService.wallhop(value).then(res => {
        if (res.code === 200) {
          alert('提交成功')
          this.context.router.replace('/')
        } else {
          alert(res.msg)
        }
      })
    })



  }
  onImageClick = (index, fs) => {
    console.log(fs[index].url)
    Zmage.browsing({ src: fs[index].url })
  }

  onChange = async (files, type, index) => {
    console.log(files, type, index)
    const token = storage.get('token')

    if (!token) {
      alert('没有登录，或者登录已经失效。请您先登录！')
      this.context.router.replace('/login')
      return
    }
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        let item = files[i]
        if (/^data:/.test(item.url)) {
          let formData = new FormData()
          if (item.file) {

            // let image = new Image()
            // image.src =
            //   let orientation = await window.EXIF.getTag(item.file, 'Orientation')
            // console.log(orientation, 'orientation')


            window.EXIF.getData(item.file, async () => {
              let orientation = window.EXIF.getTag(item.file, 'Orientation')
              let options = {
                size: 500
              }
              console.log('----------------', orientation)
              if (orientation) {
                options.orientation = orientation
              }

              // let file2dataurl = await window.imageConversion.filetoDataURL(item.file)
              // let dataurl2Image = await window.imageConversion.dataURLtoImage(file2dataurl)
              let res = await window.imageConversion.compressAccurately(item.file, options)
              res = await new File([res], item.file.name, { type: item.file.type, lastModified: Date.now() })
              console.log(res)
              formData.append('file', res)
              // formData.append('file', item.file)
              console.log(formData, 'formdata')
              let result = await userService.uploadpic(formData)
              console.log('result', process.env, __DEV__, __PROD__)
              const baseUrl = __DEV__ ? config.baseUrl.dev : config.baseUrl.pro
              if (result.code === 200 && result.data) {
                result.data.url = baseUrl + result.data.url
                files[i] = result.data
              }

            })
          }
        }
      }
    }

    this.setState({
      fileTouch: true,
      files
    })
  }
  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex
    this.setState({
      multiple: index === 1
    })
  }
  componentWillMount () {
    const token = storage.get('token')
    console.log('token,-------', token)
    if (!token) {
      alert('请您先登录', <div>该板块需要先登录。您目前没有登录，或者登录已经失效。</div>)
      this.context.router.replace('/login')
      return
    }
  }
  render () {
    const { getFieldProps, getFieldDecorator, getFieldError } = this.props.form
    const genderdata = [{
      value: 1,
      label: '男'
    }, {
      value: 2,
      label: '女'
    }]
    const gender = this.state.gender
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


        <List renderHeader={() => ''}>
          <div style={{
            height: '50px',
            lineHeight: '50px',
            fontSize: '20px',
            textAlign: 'center',
            margin: '0 80px 10px',
            borderBottom: '1px solid #a190df'
          }}>基本信息</div>
          {getFieldDecorator('birth', {
            rules: [{ required: true, message: '出生日期为必填项' }]
          })(<InputItem
            clear
            type='number'
            placeholder="例如：1990"
          ><span style={{ color: 'red' }}>*</span>出生日期</InputItem>)}
          <div style={{ marginLeft: '10px', color: 'red' }}>{getFieldError('birth') ? getFieldError('birth').join(',') : null}</div>

          {getFieldDecorator('gender', { rules: [{ required: true, message: '请选择性别' }] })(
            <Picker data={genderdata} cols={1} className="forss">
              <List.Item arrow="horizontal"><span style={{ color: 'red' }}>*</span>性别</List.Item>
            </Picker>
          )}
          <div style={{ marginLeft: '10px', color: 'red' }}>{getFieldError('gender') ? getFieldError('gender').join(',') : null}</div>

          {getFieldDecorator('height', {
            rules: [{ required: true, message: '身高为必填项' }]
          })(<InputItem
            clear
            type='number'
            placeholder="例如：178"
          ><span style={{ color: 'red' }}>*</span>身高</InputItem>)}
          <div style={{ marginLeft: '10px', color: 'red' }}>{getFieldError('height') ? getFieldError('height').join(',') : null}</div>

          {getFieldDecorator('birthplace', {
            rules: [{ required: true, message: '出生地为必填项' }]
          })(<InputItem
            clear
            type='text'
            placeholder=""
          ><span style={{ color: 'red' }}>*</span>出生地</InputItem>)}
          <div style={{ marginLeft: '10px', color: 'red' }}>{getFieldError('birthplace') ? getFieldError('birthplace').join(',') : null}</div>

          {getFieldDecorator('livingplace', {
            rules: [{ required: true, message: '现居地为必填项' }]
          })(<InputItem
            clear
            type='text'
            placeholder=""
          ><span style={{ color: 'red' }}>*</span>现居地</InputItem>)}
          <div style={{ marginLeft: '10px', color: 'red' }}>{getFieldError('livingplace') ? getFieldError('livingplace').join(',') : null}</div>

          {getFieldDecorator('degree', {
            rules: [{ required: true, message: '学历为必填项' }]
          })(<InputItem
            clear
            type='text'
            placeholder=""
          ><span style={{ color: 'red' }}>*</span>学历</InputItem>)}
          <div style={{ marginLeft: '10px', color: 'red' }}>{getFieldError('degree') ? getFieldError('degree').join(',') : null}</div>

          {getFieldDecorator('occupational', {
            rules: [{ required: true, message: '职业为必填项' }]
          })(<InputItem
            clear
            type='text'
            placeholder=""
          ><span style={{ color: 'red' }}>*</span>职业</InputItem>)}
          <div style={{ marginLeft: '10px', color: 'red' }}>{getFieldError('occupational') ? getFieldError('occupational').join(',') : null}</div>

          {getFieldDecorator('webchat', {
            rules: [{ required: true, message: '微信号为必填项' }]
          })(<InputItem
            clear
            type='text'
            placeholder="会员可见"
          ><span style={{ color: 'red' }}>*</span>微信号</InputItem>)}
          <div style={{ marginLeft: '10px', color: 'red' }}>{getFieldError('webchat') ? getFieldError('webchat').join(',') : null}</div>

          {getFieldDecorator('constellation')(<InputItem
            clear
            type='text'
            placeholder=""
          >星座</InputItem>)}


          <div style={{
            height: '50px',
            lineHeight: '50px',
            fontSize: '20px',
            textAlign: 'center',
            margin: '0 80px 10px',
            borderBottom: '1px solid #a190df'
          }}>自我介绍</div>

          {getFieldDecorator('character')(<InputItem
            clear
            type='text'
            placeholder=""
          >性格</InputItem>)}

          {getFieldDecorator('habits')(<InputItem
            clear
            type='text'
            placeholder=""
          >生活习惯</InputItem>)}

          {getFieldDecorator('hobby')(<InputItem
            clear
            type='text'
            placeholder=""
          >兴趣爱好</InputItem>)}


          {getFieldDecorator('other')(<TextareaItem
            clear
            title="其它"
            type='text'
            placeholder=""
            autoHeight
          />)}

          < List.Item >
            <div className="am-input-label am-input-label-5"><span style={{ color: 'red' }}>*</span>生活照 </div>
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
                selectable={files.length < 10}
                multiple={this.state.multiple}
                accept="image/*"
              />
            </WingBlank>

          </List.Item>
          <div style={{ marginLeft: '10px', color: 'red' }}>{(this.state.files.length <= 0 && this.state.fileTouch) ? '生活照是必传项' : null}</div>
          <div style={{
            height: '50px',
            lineHeight: '50px',
            fontSize: '20px',
            textAlign: 'center',
            margin: '0 80px 10px',
            borderBottom: '1px solid #a190df'
          }}>理想对象</div>

          {getFieldDecorator('he_agerange')(<InputItem
            clear
            type='text'
            placeholder=""
          >年龄范围</InputItem>)}

          {getFieldDecorator('he_appearance')(<InputItem
            clear
            type='text'
            placeholder=""
          >外貌要求</InputItem>)}

          {getFieldDecorator('he_character')(<InputItem
            clear
            type='text'
            placeholder=""
          >性格要求</InputItem>)}

          {getFieldDecorator('he_degree')(<InputItem
            clear
            type='text'
            placeholder=""
          >学历要求</InputItem>)}

          {getFieldDecorator('he_coordinate')(<InputItem
            clear
            type='text'
            placeholder=""
          >他(她)坐标</InputItem>)}

          {getFieldDecorator('he_other')(<TextareaItem
            clear
            title="其它"
            type='text'
            placeholder=""
            autoHeight
          />)}



          < List.Item >
            <div
              style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
              onClick={() => this.handleSubmit()}
            >
              提交
            </div>
          </List.Item>
        </List>
        {/* 
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
        </WingBlank> */}
      </div >
    )
  }
}


Add = createForm()(Add)
export default Add