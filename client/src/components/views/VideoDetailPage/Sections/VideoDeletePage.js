import React from 'react'
import { Popconfirm, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function VideoDeletePage(props) {


    function cancel(e) {
        message.error('Canceled!');
      }
      
      const variable = {
          videoId : props.videoId
      }
      
      const onVideoDelete = () => {
            axios.post('/api/video/videoDelete',variable)
            .then(response => {
                if(response.data.success){
                  message.success('Successfully Deleted!')
                  props.history.push("/");
                }else{
                    alert('Failed to Delete Video')
                }
      
            })            
      }

    return (
        <div>
            <Popconfirm
                title="Are you sure to delete this Video?"
                icon={<QuestionCircleOutlined style={{ color: 'red' }}/>}
                onConfirm={onVideoDelete}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
                 <button style={{backgroundColor:'#CC0000',borderRadius:'6px',
                            color:'white', padding:'10px 16px',
                            fontWeight:'500', fontSize:'1rem',textTransform:'uppercase', cursor:'pointer'}}
                            >
                        Video Delete
                </button>
             </Popconfirm>    
        </div>
    )
}

export default withRouter(VideoDeletePage)
