import AppHeader from "../appHeader/AppHeader"
import { BrowserRouter as Router, Route , Routes} from "react-router-dom"
import {MoviesPage, MoviePage, SignInPage, SignUpPage} from '../pages'
const App = () => {
    return(
        <Router>
            <AppHeader/>
            <main>
                <Routes>
                    <Route path="/" element = {<MoviesPage/>}/>
                    <Route path="/signIn" element = {<SignInPage/>}/>
                    <Route path="/signUp" element = {<SignUpPage/>}/>
                    <Route path="/movieInfo" element = {<MoviePage/>}/>
                </Routes>
            </main>
        </Router>
    )
}

export default App