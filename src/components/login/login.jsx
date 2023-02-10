import Navbar from "../navbar/Navbar";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import './login.css'

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const handleRegistration = (acc) => {
        return axios.post('/login', acc).then(res => {
            alert(res.data.message)
            if (res.data.message === 'Login Sucessful!') {
                localStorage.setItem('user', JSON.stringify(res.data.user))
                navigate('/')
            }
        })
    };
    return (
        <div>
            <Navbar />
            <form className="form" onSubmit={handleSubmit(handleRegistration)}>
                <h1 className="headerLog">Login</h1>
                <div>
                    <div>
                        <label className="username">Username</label>
                    </div>
                    <div>
                        <input className="usernameInput" name="username" type="text" {...register('username', { required: true })} />
                    </div>
                </div>
                <div>
                    <div>
                        <label className="password">Password</label>
                    </div>
                    <div>
                        <input className="passwordInput" name="password" type="password" {...register('password', { required: true })} />
                    </div>
                </div>
                <button className="buttonLog">Login</button>
            </form>
        </div>
    )
}

export default Login;