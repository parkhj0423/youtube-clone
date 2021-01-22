import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';



function LoginPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const onEmailHandler = (event) => {
        const value = event.currentTarget.value;
        setEmail(value);
    }

    const onPasswordHandler = (event) => {
        const value = event.currentTarget.value;
        setPassword(value);
    }

    const onSumbitHandler = (event) => {
        event.preventDefault();

        let body = {
            email:Email,
            password:Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/');
                }else {
                    alert('Login Error');
                }
            })
    }

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

      const tailLayout = {
        wrapperCol: {
          offset: 8,
          span: 16,
        },
      };
    
    

    return (
       
        <Form {...layout} style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100vw', height:'100vh'}}>
      <Form.Item
        label="Email"
        name="Email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input value={Email} onChange={onEmailHandler}  />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password value={Password} onChange={onPasswordHandler}/>
      </Form.Item>

      <Form.Item {...tailLayout} >
        <Button type="primary" htmlType="submit" onClick={onSumbitHandler}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    )
}


export default withRouter(LoginPage)
