import { useDispatch } from 'react-redux';
import { setUserDataReducer } from '../../store/user/actions';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './style.css'
import Axios from 'axios';
import LoadingIcon from '../../components/Loading';
import TextField from '@mui/material/TextField';
import ReCAPTCHA from 'react-google-recaptcha'
import { RegLogError } from '../../components/RegLogError';
import { color } from '@mui/system';

const BoxStyles = {
    width: '80%',
    maxWidth: '600px',
    borderRadius: '20px',
    margin: '5vh auto',
    textAlign: 'center',
    padding: '24px 24px 30px'
}

const inputStyles = {
    boxSizing: 'borderBox',
    borderRadius: '5px',
    marginTop: '24px',
    color: 'white'
}

const inputErrorStyles = {
    border: '1px solid transparent',
    boxSizing: 'borderBox',
    borderRadius: '5px',
    marginTop: '24px'
}

const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: '0 auto'
}

const buttonsStyles = {
    background: '#AC80C1',
    borderRadius: '5px',
    color: '#FFFFFF',
    padding: '4%',
    border: '1px solid rgba(175, 175, 175, 0.1)',
    fontSize: '0.8em',
    margin: '0'
}

const inputInfoStyles = {
    boxSizing: 'borderBox',
    borderRadius: '5px',
    width: '100%',
    margin: '0 auto',
    marginTop: '24px'
}

const inputInfoErrorStyles = {
    border: '1px solid transparent',
    boxSizing: 'borderBox',
    borderRadius: '5px',
    width: '100%',
    margin: '0 auto',
    marginTop: '24px'
}

const captcha_style = {
    transform: 'scale(0.57)',
    WebkitTransform: 'scale(0.77)',
    marginTop: '24px'
}

const captcha_cont = {
    display: 'flex',
    justifyContent: 'space-around'
}


export const SignUpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ regging, setRegging ] = useState(false)
    const [ erroredInput, setErroredInput ] = useState([])
    const [ errorWindowState, setErrorWindowState] = useState(false)
    const [ errorWindowInfo, setErrorWindowInfo] = useState('')

    const [ profileName, setProfileName ] = useState('');
    const [ profilePassword, setProfilePassword ] = useState('');
    const [ profileRepeatedPassword, setProfileRepeatedPassword ] = useState('');
    const [ personName, setUserName ] = useState('');
    const [ personSurname, setUserSurname ] = useState('');
    const [ userEmail, setEmail ] = useState('')
    const [ captcha, setCaptcha ] = useState(true)

    const resetInfo = () => {
        setRegging(false)
        // setCaptcha(null)
    }

    async function create_user(){
        let response = await Axios.post('https://sya.syaapihandler.ru/createUser', 
                {
                profile_name: profileName,
                profile_password: profilePassword,
                profile_repeated_password: profileRepeatedPassword,
                profile_email: userEmail,
                person_name: personName,
                person_surname: personSurname
            }
        )
        return response
    }

    const handlerLog = (arg) => {
        if(arg === 'auth'){
            navigate('/login');
        }
        if(captcha){
            setRegging(true)
            if(arg === 'signup'){
                create_user().then((response) => {
                    if(response.data.registered){
                        dispatch(setUserDataReducer({
                            loged: true,
                            profile_id: response.data.id,
                            profileName: profileName, 
                            personName: personName,
                            personSurname: personSurname,
                            email: userEmail,
                            path_to_media: '1.jpg'
                        }))
                        navigate('/')
                        resetInfo()
                    }
                    else{
                        setErroredInput(response.data.exceptionCode)
                        setErrorWindowInfo(response.data.exception)
                        setErrorWindowState(true)
                        resetInfo()
                    }
                }
                )
            }
        }
    }

    const captchaOnChange = (value) => {
        Axios.post('https://sya.syaapihandler.ru/captchaChecker', 
        {
            captcha: value
        }).then((response) => {
            setCaptcha(response.data.result)
        })
    }

    return(
        <div style={{display: 'flex'}}>
            {errorWindowState ? <RegLogError errorInfo={errorWindowInfo} state={setErrorWindowState}/> : null}
            {regging ? <LoadingIcon/> : 
                <div style={BoxStyles} className="box-reglog">
                <h2 style={{fontStyle: 'normal', fontWeight: 'normal',
                    fontSize: '20px', lineHeight: '23px'}} className="reglog-name">Регистрация</h2>
                <div style={formStyles}>
                    <TextField
                        label="Имя профиля"
                        type="name"
                        variant="standard"
                        style={erroredInput.includes(1) ? inputErrorStyles : inputStyles}
                        onChange={e => setProfileName(e.target.value)}
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        variant="standard"
                        autoComplete='new-password'
                        style={erroredInput.includes(2) ? inputErrorStyles : inputStyles}
                        onChange={e => setProfilePassword(e.target.value)}
                    />
                    <TextField
                        label="Повторите пароль"
                        type="password"
                        variant="standard"
                        style={erroredInput.includes(3) ? inputErrorStyles : inputStyles}
                        onChange={e => setProfileRepeatedPassword(e.target.value)}
                    />
                    <TextField
                        type="email"
                        label="Почта"
                        variant="standard"
                        style={erroredInput.includes(7) ? inputErrorStyles : inputStyles}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div style={{display: 'grid', gridTemplateColumns: '3fr 3fr', gridGap: '13px'}}>
                        <TextField
                            label="Имя"
                            type="name"
                            variant="standard"
                            style={erroredInput.includes(4) ? inputInfoErrorStyles : inputInfoStyles}
                            onChange={e => setUserName(e.target.value)}
                        />
                        <TextField
                            label="Фамилия"
                            type="name"
                            variant="standard"
                            style={erroredInput.includes(5) ? inputInfoErrorStyles : inputInfoStyles}
                            onChange={e => setUserSurname(e.target.value)}
                        />
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: '3fr 2fr', gridGap: '13px', marginTop: '24px'}}>
                        <button style={buttonsStyles} onClick={() => {handlerLog('signup')}}>Зарегистрироваться</button>
                        <button style={{...buttonsStyles, background: 'rgba(172, 128, 193, 0.7)'}} onClick={() => handlerLog('auth')}>Вход</button>
                    </div>
                </div>
            </div>}
            {/* <Link className='faq-icon' to='/'><i className="far fa-question-circle" style={{fontSize: '35px'}}></i></Link> */}
        </div>
    )
}