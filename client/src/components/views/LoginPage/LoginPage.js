import axios from 'axios'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import {loginUser} from '../../../_actions/user_action'

function LoginPage(props) {
    const dispatch = useDispatch();

    // const [state, setstate] = useState(initialState)
    // initialState : 초기값
    // setstate 함수가 실행돼서 state에 값을 넣어준다

    // email과 password를 위한 state를 만들어줘야한다
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log('email', Email);
        console.log('password', Password);

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert('error!')
                }
            })
        
    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}}
            onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br />
                <button>
                     Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage