import './style.css';
import LiquidButton from '../LiquidButtonFromNodes/index'

export const Button = ({text}) => {
    return (
        <button className="button__sign browse-posts" style={{verticalAlign: 'middle'}}><span>Log In </span></button>
        // <LiquidButton class="browse-posts" name={text} background="#AC80C1" 
        //     firstcolor="#AC80C1" secondcolor="#483D8B" />
    )
}