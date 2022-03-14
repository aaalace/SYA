import { useDispatch } from 'react-redux';
import { setUserDataReducer } from '../../store/user/actions';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './style.css'
import Axios from 'axios';
import LoadingIcon from '../../components/Loading';
import TextField from '@mui/material/TextField';
import { RegLogError } from '../../components/RegLogError';
import { Link } from 'react-router-dom';
import { addProfilePhoto } from '../../store/user/actions';

const BoxStyles = {
    width: '80%',
    maxWidth: '600px',
    borderRadius: '20px',
    margin: '20vh auto',
    textAlign: 'center',
    padding: '24px 24px 30px'
}

const inputStyles = {
    background: 'rgba(244, 244, 244, 0.7)',
    boxSizing: 'borderBox',
    borderRadius: '5px',
    marginTop: '24px',
}

const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: '0 auto',
}

const buttonsStyles = {
    background: '#AC80C1',
    border: '1px solid rgba(175, 175, 175, 0.3)',
    borderRadius: '5px',
    color: '#FFFFFF',
    padding: '6px',
}


export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ errorWindowState, setErrorWindowState] = useState(false)
    const [ errorWindowInfo, setErrorWindowInfo] = useState('')

    const [ profileName, setProfileName ] = useState('');
    const [ profilePassword, setProfilePassword ] = useState('');
    const [ logging, setLogging ] = useState(false)

    const handlerLog = (arg) => {
        setLogging(true)
        if(arg === 'home'){
            Axios.post('/checkLoged',
                {
                    profile_name: profileName,
                    profile_password: profilePassword
                }
            ).then((response) => {
                if(response.data.loged){
                    dispatch(setUserDataReducer({
                        loged: true, 
                        profile_id: response.data.id,
                        profileName: profileName, 
                        profilePassword: profilePassword, 
                        personName: response.data.name,
                        personSurname: response.data.surname,
                        userBirthDate: response.data.birth_date,
                        email: response.data.email,
                        liked_posts: response.data.liked_posts
                    }));
                    if (response.data.avatar){
                        dispatch(addProfilePhoto({avatar: response.data.avatar}))
                    }
                    navigate('/')
                    setLogging(false)
                    setProfileName('')
                    setProfilePassword('')
                }
                else{
                    setErrorWindowInfo(response.data.exc)
                    setLogging(false)
                    setProfileName('')
                    setProfilePassword('')
                    setErrorWindowState(true)
                }
            })
        }
        if(arg === 'reg'){
            navigate('/signup')
        }

    }

    return(
        <div style={{display: 'flex'}}>
            {errorWindowState ? <RegLogError errorInfo={errorWindowInfo} state={setErrorWindowState}/> : null}
            {logging ? <LoadingIcon/> :
            <div style={BoxStyles}>
                <h2 style={{fontStyle: 'normal', fontWeight: 'normal',
                fontSize: '20px', lineHeight: '23px', color: 'rgba(0, 0, 0, 0.7)'
                }}>Авторизация</h2>
                <div style={formStyles}>
                    <TextField
                        label="Имя профиля"
                        type="name"
                        variant="standard"
                        style={inputStyles}
                        onChange={e => setProfileName(e.target.value)}
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        variant="standard"
                        style={inputStyles}
                        onChange={e => setProfilePassword(e.target.value)}
                    />
                    <div style={{display: 'grid', gridTemplateColumns: '2fr 3fr', gridGap: '13px', marginTop: '36px'}}>
                        <button style={buttonsStyles} onClick={() => handlerLog('home')}>Войти</button>
                        <button style={{...buttonsStyles, background: 'rgba(172, 128, 193, 0.7)'}} onClick={() => handlerLog('reg')}>Регистрация</button>
                    </div>
                </div>
            </div>}
            {/* <Link className='faq-icon' to='/'><i className="far fa-question-circle" style={{fontSize: '30px'}}></i></Link> */}
        </div>
    )
}