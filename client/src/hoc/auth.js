import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from '../_actions/user_action'

// eslint-disable-next-line import/no-anonymous-default-export
export default function(SpecificComponent,option,admin, adminRoute=null){

    // option 의 속성
    //! null :  아무나 출입이 가능한 페이지
    //! true : 로그인한 유저만 출입이 가능한 페이지
    //! false :  로그인한 유저는 출입이 불가능한 페이지 ex.login페이지


    //admin 의 속성
    //! admin 유저만 들어가길 원하는 페이지라면 true를 넣어준다
    //! 기본값은 false

    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user)
        const dispatch = useDispatch();
        
        useEffect(() => {
        
            dispatch(auth()).then(response => {
                console.log(response);


                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option === true){
                        props.history.push('/login');
                    }
                }else {
                    //로그인 한 상태
                    if(adminRoute&& !response.payload.isAdmin){
                        props.history.push('/');
                    }else {
                        if(option === false){
                            props.history.push('/');
                        }
                    }
                }

            })

          
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
        return (
            <SpecificComponent {...props} user={user} />
        )
    }

    return AuthenticationCheck
}