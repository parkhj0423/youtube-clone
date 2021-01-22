import React from 'react'
import  { GithubOutlined, MessageOutlined, PhoneOutlined } from '@ant-design/icons';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'12px',
            borderTop:'1px solid #e5e5e5',
            marginBottom:'none'
        }}>
            
            <p> 
                <GithubOutlined /> parkhj0423<br/>
                <MessageOutlined /> parkhj0423@naver.com<br/>
                <PhoneOutlined /> 010 - 9071 - 6332
            </p>
           
        </div>
    )
}

export default Footer