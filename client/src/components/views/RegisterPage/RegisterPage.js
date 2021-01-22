import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Name, setName] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const onEmailHandler = (event) => {
        const value = event.currentTarget.value;
        setEmail(value);
    }

    const onNameHandler = (event) => {
        const value = event.currentTarget.value;
        setName(value);
    }

    const onPasswordHandler = (event) => {
        const value = event.currentTarget.value;
        setPassword(value);
    }


    const onConfirmPasswordHandler = (event) => {
        const value = event.currentTarget.value;
        setConfirmPassword(value);
    }


    const onSumbitHandler = (event) => {
        event.preventDefault();

        if(Password !== ConfirmPassword){
            return alert('비밀번호를 다시 한번 확인해 주세요!')
        }


        let body = {
            email:Email,
            name:Name,
            password:Password
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload){
                    props.history.push('/login');
                }else {
                    alert('Failed to Sign Up');
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
                label="Name"
                name="Name"
                rules={[
                {
                    required: true,
                    message: 'Please input your Name',
                },
                ]}
            >
                <Input value={Name} onChange={onNameHandler}/>
                </Form.Item>     

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
                name="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
            >
                <Input.Password value={Password} onChange={onPasswordHandler}/>
            </Form.Item>

            <Form.Item
                label="Confirm Pass"
                name="Confirm Pass"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
            >
                <Input.Password value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
            </Form.Item>

            <Form.Item {...tailLayout} >
                <Button type="primary" htmlType="submit" onClick={onSumbitHandler}>
                Submit
                </Button>
            </Form.Item>
        </Form>


    )
}

export default withRouter(RegisterPage)
