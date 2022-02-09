import { useDispatch } from 'react-redux';
import { setUserDataReducer } from '../../store/user/actions';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './style.css'

const BoxStyles = {
    width: '70%',
    maxWidth: '600px',
    border: '2px solid rgba(175, 175, 175, 0.3)',
    borderRadius: '20px',
    margin: '92px auto',
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


export const SignUpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ checked, setChecked ] = useState(false);
    const [ profileName, setProfileName ] = useState('');
    const [ profilePassword, setProfilePassword ] = useState('');
    const [ profileRepeatedPassword, setProfileRepeatedPassword ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ userSurname, setUserSurname ] = useState('');

    const create_user = () => {
        
    }

    const handlerLog = (arg) => {
        if(arg === 'auth'){
            navigate('/login');
        }
        if(arg === 'home'){
            dispatch(setUserDataReducer({
                loged: true, profileName, profilePassword,
                profileRepeatedPassword, userName, userSurname
            }));
            navigate('/');
        }
    }

    return(
        <div style={BoxStyles}>
            <h2 style={{fontStyle: 'normal', fontWeight: 'normal',
                fontSize: '20px', lineHeight: '23px', color: 'rgba(0, 0, 0, 0.7)'
            }}>Регистрация</h2>
            <div style={formStyles}>
                <input style={inputStyles} placeholder='Имя профиля' type='name' 
                    onChange={e => setProfileName(e.target.value)}/>
                <input style={inputStyles} placeholder='Пароль' type='password' 
                    onChange={e => setProfilePassword(e.target.value)}/>
                <input style={inputStyles} placeholder='Повторите пароль' type='password' 
                    onChange={e => setProfileRepeatedPassword(e.target.value)}/>
                <div style={{display: 'grid', gridTemplateColumns: '3fr 3fr', gridGap: '13px'}}>
                    <input style={inputInfoStyles} placeholder='Имя' type='name'
                        onChange={e => setUserName(e.target.value)}/>
                    <input style={inputInfoStyles} placeholder='Фамилия' type='name'
                        onChange={e => setUserSurname(e.target.value)}/>
                </div>
                <form className="birthDate" style={{display: 'grid', gridTemplateColumns: '3fr 3fr', gridGap: '13px', marginTop: '24px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <a style={{color: "rgba(0, 0, 0, 0.7)"}}>Дата рождения</a>
                        <a data-tooltip={'Заполненная дата рождения помогает друзьям легче найти вас, а также подбирать для вас интересные материалы'}>🛈</a>
                    </div>
                        <input type="date" className="date"/>
                </form>
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
                    <button style={buttonsStyles} onClick={() => handlerLog('home')}>Зарегестрироваться</button>
                    <button style={{...buttonsStyles, background: 'rgba(172, 128, 193, 0.7)'}} onClick={() => handlerLog('auth')}>Вход</button>
                </div>
            </div>
        </div>
    )
}