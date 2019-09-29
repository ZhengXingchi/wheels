import React ,{Component}  from 'react'
import {request} from '../../lib'
import {Link} from 'react-router-dom'
import{
  Form,
  Icon,
  Input,
  Button
}from 'antd'
import './login.sass'



@Form.create()
export default class Login  extends Component{
  constructor(props){
    super(props)

    this.state={
      login:false
    
    
    }
  }
  _toggleLoading=(status=false)=>{
    this.setState({
      loading:status
    })
  }

_handleSubmit=(e)=>{
  e.preventDefault()
  this.props.form.validateFields(async(err,values)=>{
    if(!err){
      request(this._toggleLoading)({
        method:'post',
        url:'/admin/login',
        data:{
          ...values
        }
      }).then(res=>{
        console.log(res);
         (res==='sucess')&&this.props.history.replace('/admin/list')
      })
    }
  })
}


  



  render(){
    const {getFieldDecorator}=this.props.form
    return(
      <div> 
        <Form onSubmit={this._handleSubmit} className='login-form'>
          <h3 style={{textAlign:"center"}}>预告片网站</h3>
          <Form.Item>
            {
              getFieldDecorator('email',{
                rules:[{
                  required:true,
                  message:'请输入邮箱'
                }] 
              })(
                <Input prefix={<Icon type="user" style={{fontSize:13}}/>} placeholder='Email'></Input>
              )
            }
            
          </Form.Item>

          <Form.Item>
            {
              getFieldDecorator('password',{
                rules:[{
                  required:true,
                  message:'请输入密码'
                }] 
              })(
                <Input prefix={<Icon type="user" style={{fontSize:13}}/>} placeholder='Password'></Input>
              )
            }
            
          </Form.Item>

          <Form.Item>
               <Button style={{width:"100%"}} htmlType='submit' loading={this.state.loading}>Login In</Button>
            
          </Form.Item>
        </Form>

      </div>
    )
         
     
  }
}