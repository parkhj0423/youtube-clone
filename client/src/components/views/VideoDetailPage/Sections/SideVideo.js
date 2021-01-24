import axios from 'axios'
import React,{useEffect,useState} from 'react'

function SideVideo() {

   const [SideVideos, setSideVideos] = useState([])

    useEffect(() => {
        axios.post('/api/video/getSideVideo')
        .then(response => {
            if(response.data.success){
                setSideVideos(response.data.sideVideos)
            }else{
                alert('사이드 비디오 생성 실패!')
            }
        })
    }, [])

    const renderSideVideo = SideVideos.map((video,index)=>{
        let minutes = Math.floor(video.duration /60);
        let seconds = Math.floor((video.duration - minutes * 60));


        return (
        <div key={index} style={{ display:'flex', marginBottom:'1rem', padding:'0 1rem'}}>
            {/* 왼쪽 동영상 이미지 부분 */}
            <div style={{width:'40%',marginRight:'1rem'}}>
                <a href={`/video/${video._id}`}>
                    <img style={{width:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt='thumbnail'/>
                </a>
            </div>
            {/* 오른쪽 동영상 정보 부분 */}
            <div style={{width:'50%'}} >
                <a href={`/video/${video._id}`}>
                    <span style={{fontSize:'1rem', color:'black'}}>{video.title}</span><br/>
                    <span>{video.writer.name}</span><br/>
                    <span>{video.views}</span>
                    <span>{minutes} : {seconds < 10 ? `0${seconds}` : seconds}</span>
                </a>
            </div>
         </div>
        )
    })

    

    return (
        
            <div style={{marginTop:'3rem'}}>
            {renderSideVideo}
            </div>
      
    )
}

export default SideVideo
