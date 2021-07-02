// import axios from 'axios'  // redux를 사용하기때문에 axios가 필요x
import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../_actions/user_action'

function RegisterPage(props) {
    const dispatch = useDispatch();

    // const [state, setstate] = useState(initialState)
    // initialState : 초기값
    // setstate 함수가 실행돼서 state에 값을 넣어준다

    // email과 password를 위한 state를 만들어줘야한다
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log('email', Email);
        console.log('name', Name);
        console.log('password', Password);
        console.log('confirmPassword', ConfirmPassword);

        if(Password !== ConfirmPassword) {
             return alert('비밀번호가 다릅니다!');
        }

        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        dispatch(registerUser(body))
            .then(response => {
                console.log(response.payload)
                if(response.payload.success) {
                    props.history.push('/login')
                } else {
                    alert('가입에러!')
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

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

                <br />
                <button>
                     Join
                </button>
            </form>
        </div>
    )
}

export default RegisterPage
