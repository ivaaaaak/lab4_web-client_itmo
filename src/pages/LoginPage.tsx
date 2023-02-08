import {sendLoginRequest, sendRegisterRequest} from "../services/auth_requests";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
// @ts-ignore
import common from "../styles/common.module.css";
// @ts-ignore
import loginPage from "../styles/loginPage.module.css";
// @ts-ignore
import formStyle from "../styles/form.module.css";
import ErrorMessage from "../components/ErrorMessage";


export default function LoginPage() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    async function signIn(e: React.FormEvent) {
        e.preventDefault()
        setLoginError('');
        setLoading(true);
        sendLoginRequest(login, password).then(() => navigate("/main"), err => setLoginError(err.message))
            .finally(() => setLoading(false));
    }

    function signUp(e: React.FormEvent) {
        e.preventDefault();
        setLoginError('');
        setLoading(true);
        sendRegisterRequest(login, password).then(() => navigate("/main"), err => setLoginError(err.message))
            .finally(() => setLoading(false));
    }

    return (
        <div className={loginPage.loginBlock}>
            <form className={formStyle.form}>
                <p>
                    <input className={formStyle.input} type="text" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)}/>
                </p>
                <p>
                    <input className={formStyle.input} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                </p>
                <p>
                    <button onClick={signIn} className={common.button}>Sign in</button>
                    <button onClick={signUp} className={common.button}>Sign up</button>
                </p>
            </form>
            <ErrorMessage error={loginError}/>
            {loading && <p className={common.loading}>Loading...</p>}
        </div>
    )
}