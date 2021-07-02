import axios from 'axios';
import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
    //SpecificComponent : 컴포넌트
    //option
        // null : 아무나 출입 가능한 페이지
        // true : 로그인 한 유저만 출입 가능
        // false : 로그인한 유저는 출입 불가능한 페이지
    //adminRoute : true를 반환하면 admin page

    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                // console.log(response);

                //로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        props.history.push('/');
                    }
                
                //로그인 했을 때
                } else {
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if(option === false) {
                            props.history.push('/')
                        }
                    }
                }
                 

            })
            
        }, [])

        return ( 
            <SpecificComponent />
        )
    }


    
    return AuthenticationCheck;
}
