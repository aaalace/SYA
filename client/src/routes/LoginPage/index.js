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


export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [ profileName, setProfileName ] = useState('');
    const [ profilePassword, setProfilePassword ] = useState('');

    const handlerLog = (arg) => {
        if(arg === 'home'){
            dispatch(setUserDataReducer({
                loged: true, profileName, profilePassword
            }));
            navigate('/');
        }
        if(arg === 'reg'){
            navigate('/signup');
        }

    }

    return(
        <div style={BoxStyles}>
            <h2 style={{fontStyle: 'normal', fontWeight: 'normal',
                fontSize: '20px', lineHeight: '23px', color: 'rgba(0, 0, 0, 0.7)'
            }}>Авторизация</h2>
            <div style={formStyles}>
                <input style={inputStyles} placeholder='Имя профиля' type='name'
                    onChange={e => setProfileName(e.target.value)}/>
                <input style={inputStyles} placeholder='Пароль' type='password'
                    onChange={e => setProfilePassword(e.target.value)}/>
                <div style={{display: 'flex', alignItems: 'center', marginTop: '36px', marginBottom: '14px'}}>
                    <input
                        style={{ color: '#AC80C1', width: '11px', height: '11px'}}
                        checked={checked}
                        onChange={() => {setChecked(prevState => !prevState)}}
                        id="happy" name="happy" value="yes" type="checkbox"
                    />
                    <label htmlFor='happy' style={{fontSize: '12px', marginLeft: '10px'}}>запомнить</label>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '2fr 3fr', gridGap: '13px'}}>
                    <button style={buttonsStyles} onClick={() => handlerLog('home')}>Войти</button>
                    <button style={{...buttonsStyles, background: 'rgba(172, 128, 193, 0.7)'}} onClick={() => handlerLog('reg')}>Регистрация</button>
                </div>
                <div className='faq'/>
            </div>
        </div>
    )
}