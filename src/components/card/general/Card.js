import './Card.css'

function Card(props){
    return <div key={props.key} className="card">{props.children}</div>
}

export default Card;