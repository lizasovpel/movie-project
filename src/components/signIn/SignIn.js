import './SignIn.sass';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="loginPage">
      <div className="Container">
        <h2>Sign in</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
            {/* <div id="loginHelp" className="form-text">error message</div> */}
          </div>
          <button type="submit" className="btn">
            Sign in
          </button>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
