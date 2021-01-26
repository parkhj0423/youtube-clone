import React,{useState} from 'react'
import { Comment, Avatar, Button, Input} from 'antd';
import axios from 'axios';
import {useSelector} from 'react-redux';
import LikeDislikes from './LikeDislikes';
const {Textarea} = Input;


function SingleComment(props) {

    const [CommentValue, setCommentValue] = useState('')
    const [OpenReply, setOpenReply] = useState(false)

    const user = useSelector(state => state.user)

    const onHandleChange =(event) => {
        const value = event.currentTarget.value;
        setCommentValue(value);
    }

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }
    

    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id}/>,
        <span style={{paddingLeft:'15px',cursor:'pointer'}}onClick={onClickReplyOpen} key='comment-basic-reply-to'>Reply to</span>
    ]

    const onSumbit = (event) => {
        event.preventDefault();


        let variables = {
            content: CommentValue,  
            writer: user.userData._id,
            postId: props.postId,
            responseTo : props.comment._id
        }
        
        axios.post('/api/comment/saveComment',variables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.result)
                setCommentValue('');
                setOpenReply(false);
                props.refreshFunction(response.data.result)
            }else { 
                alert('댓글 저장 실패!')
            }
        })
        
    } 
 

    return (
        <div>
            <Comment
            actions={actions}
            author={props.comment.writer.name}
            avatar={<Avatar src={props.comment.writer.image}  alt='avatarImage'/>}
            content={<p>{props.comment.content}</p>}
            />

            {OpenReply &&
                <form style={{display:'flex'}} onSubmit={onSumbit}>
                    <textarea 
                    style={{width:'100%',borderRadius:'5px'}} 
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder='댓글을 작성해 주세요!'
                    />
                    <br/>
                    <Button type='primary' style={{width:'20%', height:'52px'}} onClick={onSumbit} >Submit</Button>
                </form>
            }   

        </div>
    )
}

export default SingleComment
