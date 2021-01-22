import React, { useState } from 'react'
import {Typography, Button, Form ,message, Input} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {useSelector} from 'react-redux';


const {TextArea} = Input;
const  {Title} = Typography; 

const PrivateOptions = [
    {
        value:0,
        label:'Private'
    },
    {
        value:1,
        label:'Public'
    },
]

const CategoryOptions = [
    {
        value:0,
        label:'Film & Animation'
    },
    {
        value:1,
        label:'Autos & Vehicles'
    },
    {
        value:2,
        label:'Music'
    },
    {
        value:3,
        label:'Pets & Animal'
    }
]


function VideoUploadPage(props) {
    const user = useSelector(state => state.user)

    const [VideoTitle, setVideoTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState('Film & Animation');
    const [FilePath, setFilePath] = useState('');
    const [Duration, setDuration] = useState('');
    const [ThumbnailPath, setThumbnailPath] = useState('');


    const onDrop = (files) => {
        let formData =  new FormData();
        const config = {
            header:{'content-type':'multipart/form-data'}
        }
        formData.append('file',files[0]);
        console.log(files);
        axios.post('/api/video/uploadfiles',formData,config)
        .then(response => {
            if(response.data.success){

                let variable ={
                    url: response.data.url,
                    fileName: response.data.fileName
                }

                setFilePath(response.data.url);

                axios.post('/api/video/thumbnail', variable)
                .then(response => {
                    if(response.data.success){
                        
                        setDuration(response.data.fileDuration);
                        setThumbnailPath(response.data.url);
                    }else{
                        alert('썸네일 생성 실패!');
                    }
                })
            }else {
                alert('비디오 업로드 실패!');
                console.log(response.data);
            }
        })
    }


    const onTitleChange =(event) => {
        const value = event.currentTarget.value;
        setVideoTitle(value);
    }

    const onDescriptionChange = (event) => {
        const value = event.currentTarget.value;
        setDescription(value);
    }

    const onPrivateChange = (event) => {
        const value = event.currentTarget.value;
        setPrivate(value);
    }

    const onCategoryChange = (event) => {
        const value = event.currentTarget.value;
        setCategory(value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            writer : user.userData._id,
            title : VideoTitle,
            description : Description,
            privacy : Private,
            filePath : FilePath,
            category : Category,
            duration : Duration,
            thumbnail :ThumbnailPath
        }

        axios.post('/api/video/uploadVideo',variables)
        .then(response => {
            if(response.data.success){
                message.success('성공적으로 업로드를 했습니다'); //유용
                setTimeout(()=> {
                    props.history.push('/')
                },3000)
                
            }else{
                alert('비디오 업로드 실패!')
            }
        })
    }

    return (
        <div style= {{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center',marginBottom:'2rem'}}>
                <Title level={1}>Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {/* DROP ZONE */}

                    <Dropzone 
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={9999999999}>
                    {({getRootProps, getInputProps}) => (
                        <div style={{width:'300px', height:'240px', border:'1px solid lightgray',display:'flex',
                        alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                            <input {...getInputProps()}/>    
                            <PlusOutlined style={{fontSize: '3rem'}}/>
                        </div>
                    )}

                    </Dropzone>

                    {/* THUMBNAIL */}
                    {ThumbnailPath &&
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt='thumbnail' />
                        </div>
                    }
                </div>

                <br/>
                <br/>

                <label>Title</label>
                <Input onChange={onTitleChange} value={VideoTitle}/>

                <br/>
                <br/>

                <label>Description</label>
                <TextArea onChange={onDescriptionChange} value={Description}/>

                <br/>
                <br/>  

                <select onChange={onPrivateChange}>
                   {PrivateOptions.map((item,index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                   ))}
                </select>

                <br/>
                <br/>

                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item,index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <Button type='primary' size='large' onClick={onSubmit}>Submit</Button>


            </Form>

        </div>
    )
}

export default VideoUploadPage