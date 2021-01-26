import {Typography, Card, Avatar ,Col, Row} from 'antd';
import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Input, Space } from 'antd';
const { Search } = Input;
const {Title} = Typography;
const {Meta} = Card;

function SearchVideoPage(props) {
    const [Video, setVideo] = useState([])
    const [SearchValue, setSearchValue] = useState('')


    const onSearchHandler = (event) => {
        const value = event.currentTarget.value;
        setSearchValue(value);
    }

    let variable ={ 
        title : SearchValue
    }

    const onSearch = () => {
        axios.post('/api/video/getSearchVideos',variable)
        .then(response => {
            if(response.data.success){
                console.log(response.data)
                console.log(SearchValue)
                setVideo(response.data.videos);
            }else{
                alert('검색한 비디오 가져오기 실패!')
            }
        })
    }


    const renderCards = Video.map((video,index)=> {

        let minutes = Math.floor(video.duration /60);
        let seconds = Math.floor((video.duration - minutes * 60));

        return <Col lg={6} md={8} xs={24}>
        <div key={index} style={{position:'relative'}}>
             <a href={`/video/${video._id}`}>
                <img style={{width:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt='thumbnail'/>
                <div className='duration'>

                <span>{minutes< 10 ? `0${minutes}` : {minutes}} : {seconds < 10 ? `0${seconds}` : seconds}</span>
                </div>
            </a>
        </div>
        
        <br/>

        <Meta 
            avatar={
                <Avatar src={video.writer.image}/>
            }
            title={video.title}
            description=''
        />
        
        
        <span >{video.writer.name}</span>
        <br/>
        <span style={{marginLeft:'3rem'}}>{video.views} views</span> - <span>{moment(video.createdAt).format('MMM Do YY')}</span>

    </Col>
        
    })

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}>Search</Title>
            <Space direction="vertical">
                <Search
                    placeholder="Search Videos!"
                    allowClear
                    enterButton="Search"
                    size="middle"
                    onChange={onSearchHandler}
                    onSearch={onSearch}
                    value={SearchValue}
                />                   
            </Space>
            <hr/>
            <Row gutter={[32,16]}>

                {renderCards}
                
            </Row>
        </div>
    )
}

export default withRouter(SearchVideoPage)
