import './Tile.css'

export default function Tile(props) {
    return (
        <div className="container" id={props.id} onClick={props.handleClick}>
            <span className="value">{props.value}</span>
        </div>
    )
}