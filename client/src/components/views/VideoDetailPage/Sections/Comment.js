import React,{useState} from 'react'
import {useSelector} from 'react-redux' //useSelector 는 redux hook임... react에서 import 하는거아님...
import {Button, Typography} from 'antd';
import axios from 'axios';
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment';
const {Title} = Typography;


function Comment(props) {
    
    const [CommentValue, setCommentValue] = useState('');
    const user = useSelector(state => state.user)
    const videoId = props.postId


    const handleClick = (event) => {
        const value = event.currentTarget.value;
        setCommentValue(value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        let variables = {
            content: CommentValue,  
            writer: user.userData._id,
            postId: props.postId
        }
        
        axios.post('/api/comment/saveComment',variables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.result)
                props.refreshFunction(response.data.result)
            }else {
                alert('댓글 저장 실패!')
            }
        })
        setCommentValue('');
    }


    return (
        <div>
            <div>
                <br/>
                <Title level={4}>Replies</Title>
                <hr/>


                {/* commments Lists */}

                {props.commentLists && props.commentLists.map((comment,index) =>(
                    (!comment.responseTo &&
                        <>
                            <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId} commentLists={props.commentLists}/>
                            <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={videoId} commentLists={props.commentLists}/>
                        </>    
                    )
                ))}
                

                {/* Root comment Form */}

                <form style={{display:'flex'}} onSubmit={onSubmit}>
                    <textarea 
                    style={{width:'100%',borderRadius:'5px'}} 
                    onChange={handleClick}
                    value={CommentValue}
                    placeholder='댓글을 작성해 주세요!'
                    />
                    <br/>
                    <Button type='primary' style={{width:'20%', height:'52px'}} onClick={onSubmit} >Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default Comment
