/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React,{useEffect,useState} from 'react'
import {message} from 'antd';
import { withRouter } from 'react-router-dom';

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);
    
    
    useEffect(() => {
        let variable = {
            userTo: props.userTo
        }
        axios.post('/api/subscribe/subscribeNumber',variable)
        .then(response => {
            if(response.data.success){
                setSubscribeNumber(response.data.subscribeNumber);
            }else{
                alert('구독자 정보 불러오기 실패!')
            }
        })

        //로그인한 계정이 동영상을 올린 계정을 구독했는지 안했는지 체크
        let subscribedVariable = {
            userTo: props.userTo,
            userFrom : window.localStorage.getItem('userId')
        }
        
        axios.post('/api/subscribe/subscribed',subscribedVariable)
        .then(response => { 
            if(response.data.success){
                
                setSubscribed(response.data.subscribed)
            }else{
                alert('정보 불러오기 실패!')
            }
        })
        
    }, [])



    const onSubscribe = () => {

        let subscribedVariable = {
            userTo : props.userTo,
            userFrom : props.userFrom
        }

        if(!window.localStorage.getItem('userId')){
            message.error('구독은 로그인 후 이용 가능 합니다')
            props.history.push('/login');
        }


        //이미 구독 중이라면
        if(Subscribed){
            axios.post('/api/subscribe/unSubscribe',subscribedVariable)
            .then(response => {
                if(response.data.success){
                    console.log(subscribedVariable)
                    setSubscribeNumber(SubscribeNumber - 1);
                    setSubscribed(!Subscribed);    
                }else{
                    alert('구독 취소하기 실패!')
                } 
            })
        }else{
            //아직 구독중이 아니라면
            axios.post('/api/subscribe/subscribe',subscribedVariable)
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber + 1);
                    setSubscribed(!Subscribed);
                }else{
                    // alert('구독 하기 실패!')
                }
            })
        }
    }

    return (
        <div>
            <button style={{backgroundColor:`${Subscribed ? '#AAAAAA' : '#CC0000'}`,borderRadius:'6px',
                            color:'white', padding:'10px 16px',
                            fontWeight:'500', fontSize:'1rem',textTransform:'uppercase', cursor:'pointer'}}
                            onClick={onSubscribe}>
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default withRouter(Subscribe)
