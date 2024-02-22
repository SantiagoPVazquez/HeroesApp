import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../../hooks/useForm";

export const LoginPage = () => {

  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const {userName, onInputChange} = useForm({userName : ''})

  const onLogin = () => {

    const lastPath = localStorage.getItem('lastPath') || '/';

    if (userName.length === 0) return;
    
    login(userName)

    navigate(lastPath, {
      replace: true
    });
  }

  return (

    <div className="container mt-5">
      <h1>Login</h1>
      <hr />

      <form onSubmit={onLogin}>
        <input 
        type="text"
        placeholder="User"
        className="form-control"
        name='userName' 
        value={userName}
        onChange={onInputChange}/>
      
        <button className="btn btn-primary mt-2">
          Login
        </button>
    
      </form>
    </div>
  )
}
