import { useDispatch } from 'react-redux';
import { setUserDataReducer } from '../../store/user/actions';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './style.css'
import Axios from 'axios';
import LoadingIcon from '../../components/Loading';

const BoxStyles = {
    width: '70%',
    maxWidth: '600px',
    border: '2px solid rgba(175, 175, 175, 0.3)',
    borderRadius: '20px',
    margin: '70px auto',
    textAlign: 'center',
    padding: '24px 24px 30px'
}

const inputStyles = {
    background: 'rgba(244, 244, 244, 0.7)',
    border: '1px solid rgba(175, 175, 175, 0.3)',
    boxSizing: 'borderBox',
    borderRadius: '5px',
    marginTop: '24px',
    padding: '2%'
}

const inputErrorStyles = {
    background: 'rgba(244, 244, 244, 0.7)',
    border: '1px solid rgba(200, 0, 0, 0.5)',
    boxSizing: 'borderBox',
    borderRadius: '5px',
    marginTop: '24px',
    padding: '2%'
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

const inputInfoStyles = {
    background: 'rgba(244, 244, 244, 0.7)',
    border: '1px solid rgba(175, 175, 175, 0.3)',
    boxSizing: 'borderBox',
    borderRadius: '5px',
    padding: '4%',
    width: '100%',
    margin: '0 auto',
    marginTop: '24px'
}

const inputInfoErrorStyles = {
    background: 'rgba(244, 244, 244, 0.7)',
    border: '1px solid rgba(200, 0, 0, 0.5)',
    boxSizing: 'borderBox',
    borderRadius: '5px',
    padding: '4%',
    width: '100%',
    margin: '0 auto',
    marginTop: '24px'
}

const dateStyle = {
    padding: '2%',
    borderRadius: '5px',
    border: '1px solid rgba(175, 175, 175, 0.3)',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'rgba(0, 0, 0, 0.7)'
}

const dateErrorStyle = {
    padding: '2%',
    borderRadius: '5px',
    border: '1px solid rgba(200, 0, 0, 0.5)',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'rgba(0, 0, 0, 0.7)'
}



export const SignUpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ checked, setChecked ] = useState(false)
    const [ regging, setRegging ] = useState(false)
    const [ erroredInput, setErroredInput ] = useState([])

    const [ profileName, setProfileName ] = useState('');
    const [ profilePassword, setProfilePassword ] = useState('');
    const [ profileRepeatedPassword, setProfileRepeatedPassword ] = useState('');
    const [ personName, setUserName ] = useState('');
    const [ personSurname, setUserSurname ] = useState('');
    const [ userBirthDate, setUserBirthDate ] = useState('');

    const resetInfo = () => {
        setChecked(false)
        setRegging(false)
        setProfileName('')
        setProfileRepeatedPassword('')
        setUserName('')
        setUserSurname('')
        setUserBirthDate('')
    }

    async function create_user(){
        let response = await Axios.post('/create_user', 
                {
                profile_name: profileName,
                profile_password: profilePassword,
                profile_repeated_password: profileRepeatedPassword,
                person_name: personName,
                person_surname: personSurname,
                birth_date: userBirthDate
            }
        )
        return response
    }

    const handlerLog = (arg) => {
        setRegging(true)
        if(arg === 'auth'){
            navigate('/login');
        }
        if(arg === 'signup'){
            create_user().then((response) => {
                if(response.data.registered){
                    dispatch(setUserDataReducer({
                        loged: true, 
                        profileName: profileName, 
                        profilePassword: profilePassword, 
                        personName: personName,
                        personSurname: personSurname, 
                        userBirthDate: userBirthDate
                    }))
                    setRegging(false)
                    navigate('/')
                }
                else{
                    console.log(response.data)
                    setErroredInput(response.data.exceptionCode)
                    resetInfo()
                }
            }
            )
        }
    }

    return(
        <div style={{display: 'flex'}}>
            {regging ? <LoadingIcon/> : 
                <div style={BoxStyles}>
                <h2 style={{fontStyle: 'normal', fontWeight: 'normal',
                    fontSize: '20px', lineHeight: '23px', color: 'rgba(0, 0, 0, 0.7)'
                }}>Регистрация</h2>
                <div style={formStyles}>
                    <input autoComplete="new-password" style={erroredInput.includes(1) ? inputErrorStyles : inputStyles} placeholder='Имя профиля' type='name' 
                        onChange={e => setProfileName(e.target.value)}/>
                    <input autoComplete="new-password" style={erroredInput.includes(2) ? inputErrorStyles : inputStyles} placeholder='Пароль' type='password' 
                        onChange={e => setProfilePassword(e.target.value)}/>
                    <input style={erroredInput.includes(3) ? inputErrorStyles : inputStyles} placeholder='Повторите пароль' type='password' 
                        onChange={e => setProfileRepeatedPassword(e.target.value)}/>
                    <div style={{display: 'grid', gridTemplateColumns: '3fr 3fr', gridGap: '13px'}}>
                        <input style={erroredInput.includes(4) ? inputInfoErrorStyles : inputInfoStyles} placeholder='Имя' type='name'
                            onChange={e => setUserName(e.target.value)}/>
                        <input style={erroredInput.includes(5) ? inputInfoErrorStyles : inputInfoStyles} placeholder='Фамилия' type='name'
                            onChange={e => setUserSurname(e.target.value)}/>
                    </div>
                    <form className="birthDate" style={{display: 'grid', gridTemplateColumns: '3fr 3fr', gridGap: '13px', marginTop: '24px'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <a style={{color: "rgba(0, 0, 0, 0.7)"}}>Дата рождения &nbsp;</a>
                            <a data-tooltip={'Заполненная дата рождения помогает друзьям легче найти вас, а также подбирать для вас интересные материалы'}><i style={{color: '#AC80C1'}} class="fa fa-info-circle"></i></a>
                        </div>
                            <input type="date" style={erroredInput.includes(6) ? dateErrorStyle : dateStyle} onChange={e => setUserBirthDate(e.target.value)}/>
                    </form>
                    <input style={inputStyles} placeholder='Почта (необязательно)' type='password' 
                        onChange={e => setProfileRepeatedPassword(e.target.value)}/>
                    <div style={{display: 'flex', alignItems: 'center', marginTop: '24px'}}>
                        <input
                            style={{ color: '#AC80C1', width: '11px', height: '11px'}}
                            checked={checked}
                            onChange={() => {setChecked(prevState => !prevState)}}
                            id="happy" name="happy" value="yes" type="checkbox"
                        />
                        <label htmlFor='happy' style={{fontSize: '12px', marginLeft: '10px'}}>запомнить</label>
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: '3fr 2fr', gridGap: '13px', marginTop: '24px'}}>
                        <button style={buttonsStyles} onClick={() => handlerLog('signup')}>Зарегестрироваться</button>
                        <button style={{...buttonsStyles, background: 'rgba(172, 128, 193, 0.7)'}} onClick={() => handlerLog('auth')}>Вход</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}