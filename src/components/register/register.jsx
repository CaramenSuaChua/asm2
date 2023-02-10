import "./register.css";
import Navbar from "../navbar/Navbar";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const handleRegistration = (data) => {
        return axios.post('/register', data)
            .then(res => {
                alert(res.data)
                if (res.data === "User created!") {
                    navigate('/login')
                }
            })
    };
    return (
        <div>
            <Navbar />
            <form className="form" onSubmit={handleSubmit(handleRegistration)}>
                <h1 className="headerReg">SIGN UP</h1>
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
                <button className="buttonReg">Register</button>
            </form>
        </div>
    )
}

export default Register