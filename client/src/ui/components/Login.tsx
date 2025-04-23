import "../styles/login.css";

function LoginComponent() {
  return (
    <>
      <div className="content">
        <div className="login-container">
          <h1>Login</h1>
          <form>
            <form className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter username"
                required
              />
            </form>
            <form className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Enter password" required/>
            </form>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
