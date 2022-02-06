import { useDispatch } from 'react-redux';
import { setUserDataReducer } from '../../store/user/actions';
import { useNavigate } from 'react-router-dom';


export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerLog = () => {
        dispatch(setUserDataReducer({loged: true}));
        navigate('/');

    }

    return(
        <div>
            <button onClick={handlerLog}>Log in</button>
        </div>
    )
}