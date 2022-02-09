import './style.css';
import LiquidButton from '../LiquidButtonFromNodes/index'

export const Button = ({text}) => {
    return (
        <LiquidButton class="browse-posts" name={text} background="#AC80C1" 
            firstcolor="#AC80C1" secondcolor="#483D8B" />
    )
}