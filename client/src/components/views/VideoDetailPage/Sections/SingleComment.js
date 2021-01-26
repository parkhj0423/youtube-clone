import React,{useState} from 'react'
import { Comment, Avatar, Button,message} from 'antd';
import axios from 'axios';
import {useSelector} from 'react-redux';
import LikeDislikes from './LikeDislikes';
import {DeleteFilled} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';


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


    //!
    const deleteComment = () => {


        let variables = {
            content: props.comment.content,  
            writer: localStorage.getItem('userId'),
            postId: props.postId
        }
        console.log(props.comment.content)
        console.log(props.comment.writer._id)
        console.log(props.postId)
        

        if(props.comment.writer._id === localStorage.getItem('userId')){
            axios.post('/api/comment/deleteComment',variables)
            .then(response => {
            if(response.data.success){
                message.success('댓글 삭제 성공!')
                window.location.reload()
            }else { 
                alert('댓글 삭제 실패!')
            }
        })
        }else{
            message.error('본인의 댓글만 지울 수 있습니다!')
        }
    }
    

    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id}/>,
        <span style={{paddingLeft:'15px',cursor:'pointer'}}onClick={onClickReplyOpen} key='comment-basic-reply-to'>Reply to</span>,
        <DeleteFilled onClick={deleteComment}/>
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
            {props.comment.writer &&
                <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image}  alt='avatarImage'/>}
                content={<p>{props.comment.content}</p>}
                />
            }          
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

export default withRouter(SingleComment)
