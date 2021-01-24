import React,{useEffect, useState} from 'react'
import {Row,Col, List, Avatar} from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe';


function VideoDetailPage(props) {  


    //이런식으로 url에 나타난 videoId를 가져올 수 있는 이유는 app.js 에 /video/:videoId 로 작성했기 때문
    const videoId = props.match.params.videoId
        const variable = {
            videoId: videoId
        }
        
        const [VideoDetail, setVideoDetail] = useState([])

        useEffect(() => {
            axios.post('/api/video/getVideoDetail',variable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.videoDetail.filePath);
                    setVideoDetail(response.data.videoDetail);
                }else{
                    alert('비디오 정보를 가져오기를 실패했습니다!')
                }
            })
        }, [])



    if(VideoDetail.writer){
        // filePath 앞에 /server를 잘라냄
        let path = VideoDetail.filePath.substr(6);
        console.log(path);
        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{width:'100%', padding:'3rem 4rem'}}>
                        {/* 비디오 */}
                        <video style={{width:'100%'}} src={`http://localhost:5000/${path}`} controls/>
                        {/* 구독, 좋아요, 작성자 */}
                        <List.Item
                            actions={[<Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image}/>}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>
    
                        {/* 댓글 */}
    
                    </div>
    
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo/>
    
                </Col>  
    
            </Row>
        )
    }else{
        return (
            <div>...Loading</div>
        )
    }

    
}

export default VideoDetailPage
