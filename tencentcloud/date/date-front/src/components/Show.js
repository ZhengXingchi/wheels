import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ListView } from 'antd-mobile'
import userService from 'SERVICE/userService'
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
  genData = async (pIndex = 0) => {
    let dataBlob = {}
    let gender = this.props.location.pathname.startsWith('/showgirl') ? '2' : '1'
    let result = await userService.getlist({ gender })
    if (result.code === 200) {
      dataBlob = result.data
    }

    console.log('dataBlob', dataBlob)
    return dataBlob
  }
  componentWillMount () {

  }
  async componentDidMount () {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax

    this.rData = await this.genData()
    console.log('rdata', this.rData)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false
    })

  }
  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }
  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    console.log('reach end', event)
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.rData = { ...this.rData, ...this.genData(++pageIndex) }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false
      })
    }, 1000)
    // console.log('rData', this.rData)
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
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div
            style={{
              lineHeight: '50px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6'
            }}
          >{rowData.username}&nbsp;&nbsp;{rowData.birth}年生</div>
          {/* eslint-disable */}
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
            <div>
              <img style={{ width: '100px', marginRight: '15px' }} src={(rowData.photos && rowData.photos.length > 0) ? rowData.photos[0].url : ''} alt="" />
            </div>
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>性格{rowData.character}</div>
              <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span>¥</div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>

        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderHeader={() => <div className="jumbotron"><div className="title" style={{ textAlign: 'center' }}><h1>玉山便民网</h1></div>
          </div >}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? 'Loading...' : '我是有底线的'}
          </div>)}
          renderRow={row}
          renderSeparator={separator}
          className="am-list"
          pageSize={4}
          useBodyScroll
          onScroll={() => { console.log('scroll') }}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    )
  }
}
