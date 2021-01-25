import React,{useEffect} from 'react'
import {Tooltip} from 'antd'
import {LikeOutlined,DislikeOutlined} from '@ant-design/icons';
import axios from 'axios';

function LikeDislikes() {

    useEffect(() => {
        axios.post('/api/like/getLikes')
    }, [])

    return (
        <div style={{display:'flex'}}>
            <div style={{paddingRight:'20px'}}>
                <span key='comment-basic-like' >
                    <Tooltip title='Like'>
                        <LikeOutlined theme='filled' onClick/>
                    </Tooltip>
                    <span style={{paddingLeft:'8px',cursor:'auto'}}>1</span>
                </span>
            </div>

            <div>
                <span key='comment-basic-dislike'>
                    <Tooltip title='Dislike'>
                        <DislikeOutlined onClick/>
                    </Tooltip>
                    <span style={{paddingLeft:'8px',cursor:'auto'}}>1</span>
                </span>
            </div>
        </div>
    )
}

export default LikeDislikes
{/* <DislikeFilled />
<LikeFilled /> */}