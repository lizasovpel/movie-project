import './AppHeader.sass'
import { Link } from 'react-router-dom'
import search from '../../img/search.png'
const AppHeader = () => {    
    return(
        <header>
            <Link to="/"><h1>MOVIES</h1></Link>
            <div className='right'>
                <div className="container-fluid">
                    <form className="d-flex">
                        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
                        <img src={search} alt="search" />
                    </form>
                </div>
                <div className='loginBtn'>
                    <Link to="/signIn"><button type="button" className="btn">Sign in</button></Link>            
                </div>
            </div>
        </header>
    )
}

export default AppHeader