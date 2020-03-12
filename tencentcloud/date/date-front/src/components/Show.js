import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ListView, Icon } from 'antd-mobile'
import userService from 'SERVICE/userService'
import Zmage from 'react-zmage'
import storage from 'UTIL/storage'
import { Modal } from 'antd-mobile'
const alert = Modal.alert
// import { Link } from 'react-router'
/**
 * 本组件为欢迎页（首页）
 * 由于几乎没有交互逻辑
 * 因此可以不使用类的写法
 * 
 * 实际上，ES6 的类经由 Babel 转码后
 * 其实还是返回一个类似的函数
 */

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒'
  }
]
// const NUM_ROWS = 20
let pageIndex = 0
let rData = []
let scrollY = 0
let scrollX = 0
let genderold

// function genData (pIndex = 0) {
//   const dataBlob = {}
//   for (let i = 0; i < NUM_ROWS; i++) {
//     const ii = (pIndex * NUM_ROWS) + i
//     dataBlob[`${ii}`] = `row - ${ii}`
//   }
//   console.log('dataBlob', dataBlob)
//   return dataBlob
// }




@connect( // 功能同 UTIL/createContainer
  ({ userData }) => ({ userData }),
  require('ACTION/user').default
)
export default class Show extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
    this.state = {
      dataSource,
      isLoading: true
    }
  }
  scrollEvent = (e) => {
    this.scrollX = e.path[1].scrollX
    this.scrollY = e.path[1].scrollY
    console.log('x', 'y', scrollY, this.scrollY)

  }
  previewPhoto = (path) => {

    let token = storage.get('token')
    if (token) {
      Zmage.browsing({ src: path })
    } else {
      alert('查看高清大图需要登录')
    }
  }
  gotodetail = (id) => {
    scrollX = this.scrollX
    scrollY = this.scrollY
    this.context.router.push(`/detail/${id}`)
  }
  genData = async (pIndex = 0) => {
    let dataBlob = {}
    let gender = this.props.location.pathname.startsWith('/showgirl') ? '2' : '1'
    let result = await userService.getlist({ gender, page: pIndex, limit: 5 })
    if (result.code === 200) {
      dataBlob = result.data
    }

    // console.log('dataBlob', dataBlob)
    return dataBlob
  }
  componentWillMount () {
    // scrollTo(100, 5000)

  }
  async componentDidMount () {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax

    console.log('getMetrics', this.lv.getMetrics)
    console.log('getMetrics', this.props.location)
    let gender = this.props.location.pathname.startsWith('/showgirl') ? '2' : '1'
    console.log(pageIndex, genderold, gender)
    if (rData.length !== 0 && genderold === gender) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(rData),
        isLoading: false
      })
      setTimeout(() => {
        // this.lv.scrollTo({ left: scrollX, top: scrollY, behavior: 'smooth' })
        this.lv.scrollTo({ left: scrollX, top: (scrollY) })
      }, 100)
      return
    }
    if (genderold !== gender || rData.length === 0) {
      pageIndex = 0
      rData = []
      scrollY = 0
      scrollX = 0
      genderold = gender
      rData = await this.genData()
      console.log('rdata', rData)
      setTimeout(() => {
        // this.lv.scrollTo({ left: scrollX, top: scrollY, behavior: 'smooth' })
        this.lv.scrollTo({ left: scrollX, top: (scrollY) })
      }, 100)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(rData),
        isLoading: false
      })
    }


  }
  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }
  onEndReached = async (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    console.log('8888888888hasMore', pageIndex, this.state.hasMore)
    if (this.state.isLoading && !this.state.hasMore) {
      console.log('9999999999999999999999hasMore', pageIndex, this.state.hasMore)
      return
    }
    console.log('reach end', event)
    this.setState({ isLoading: true })
    let temp = await this.genData(++pageIndex)
    if (temp.length > 0) {
      // console.log('---------------------')
      // console.log(rData, 'rdata')
      // console.log(temp, 'temp')
      // rData = { ...rData, ...temp }
      rData = rData.concat(temp)
      console.log(rData, 'rdata')
      // console.log('---------------------')
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(rData),
        isLoading: false
      })
    } else {
      this.setState({
        hasMore: false,
        isLoading: false
      })
      pageIndex--
    }


    // console.log('rData', rData)
    // console.log('dataSource', this.state.dataSource)
  }
  render () {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED'
        }}
      />
    )
    let index = data.length - 1
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1
      }
      const picPath = (rowData.photos && rowData.photos.length > 0) ? rowData.photos[0].url : ''
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          {/* eslint-disable */}
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
            <div
              style={{
                lineHeight: '20px',
                fontSize: 14,
                borderBottom: '1px solid #F6F6F6'
              }}
            >{rowData.username}&nbsp;&nbsp;{rowData.birth}年生</div>
            <div
              style={{
                marginLeft: 'auto',
                lineHeight: '20px',
                fontSize: 14,
                borderBottom: '1px solid #F6F6F6'
              }}
              onClick={() => this.gotodetail(rowData._id)}

            >详情请戳</div>
          </div>

          {/* eslint-disable */}
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
            <div onClick={() => this.previewPhoto(picPath)} style={{ width: '150px', flexShrink: 0, height: '100px', background: `url(${picPath})   no-repeat  center`, backgroundSize: 'contain' }}>
              {/* <img style={{ width: '100px', marginRight: '15px' }} src={(} alt="" /> */}
            </div>
            <div className="imitate_ellipsis" style={{ color: '#888', lineHeight: '20px', height: '100px', marginLeft: '5px' }}>
              <div style={{ marginBottom: '8px' }}>性格{rowData.character}，{rowData.occupational}，喜欢{rowData.hobby}，拼搏在{rowData.livingplace}的{rowData.birthplace}{rowData.gender === '2' ? '小姐姐' : '小哥哥'}</div>

              {/* <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span>¥</div> */}
            </div>
          </div>
        </div >
      )
    }
    return (
      <div>

        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          // renderHeader={() => <div className="jumbotron"><div className="title" style={{ textAlign: 'center' }}><h1>玉山便民网</h1></div>
          // </div >}
          renderFooter={() => (<div style={{ padding: '5px', height: '30px', color: '#747070', textAlign: 'center' }}>
            {this.state.isLoading ? 'Loading...' : '~~ ~~ ~我是有底线的~ ~~ ~~'}
          </div>)}
          renderRow={row}
          renderSeparator={separator}
          className="am-list"
          pageSize={4}
          useBodyScroll
          onScroll={(e) => { this.scrollEvent(e) }}
          scrollEventThrottle={30}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
        <Icon type="up" size="lg" style={{ position: 'fixed', bottom: 50, right: 20, zIndex: 1000, backgroud: 'black' }} onClick={() => this.lv.scrollTo({ left: 0, top: 0, behavior: 'smooth' })}></Icon>
      </div >
    )
  }
}
