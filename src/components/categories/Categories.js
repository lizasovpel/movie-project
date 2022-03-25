import './Categories.sass'

const Categories = () => {
    return(
        <div className="Container">
            <h2>Genres</h2>
            <div className="genres">
                <button type="button" className="btn btn-outline-light">action</button>  
                <button type="button" className="btn btn-outline-light">comedy</button>     
                <button type="button" className="btn btn-outline-light">drama</button>     
                <button type="button" className="btn btn-outline-light">fantasy</button>     
                <button type="button" className="btn btn-outline-light">horror</button>     
                <button type="button" className="btn btn-outline-light">mystery</button>     
                <button type="button" className="btn btn-outline-light">romance</button>     
                <button type="button" className="btn btn-outline-light">thriller</button>     
            </div>
        </div>
    )    
}
export default Categories