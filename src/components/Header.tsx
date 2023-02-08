// @ts-ignore
import headerStyle from '../styles/header.module.css';
// @ts-ignore
import common from '../styles/common.module.css';
// @ts-ignore
import kittie1 from "../images/kitty1.gif";
// @ts-ignore
import kittie2 from "../images/kitty2.gif";
// @ts-ignore
import kittie3 from "../images/kitty3.gif";
import {useState} from "react";
import {store} from "../redux/store";
import {logout} from "../services/auth_requests";
import {useNavigate} from "react-router-dom";


export default function Header() {
    const [visible, setVisibility] = useState(true);
    const navigate = useNavigate();

    function showKitties() {
        setVisibility(false);
    }

    function hideKitties() {
        setVisibility(true);
    }

    function onClick () {
        logout();
        navigate("/login");
    }

    return(
        <header className={headerStyle.header} onMouseEnter={showKitties} onMouseLeave={hideKitties}>
            <div className={headerStyle.headerText}>
                <h1>Канукова Ева, P32302</h1>
                <h2>Вариант 21352</h2>
            </div>
            <div>
                <img className={headerStyle.kitties} hidden={visible} src={kittie1} width="140" height="110" alt="kittie 1"/>
                <img className={headerStyle.kitties} hidden={visible} src={kittie2} width="140" height="110" alt="kittie 2"/>
                <img className={headerStyle.kitties} hidden={visible} src={kittie3} width="140" height="110" alt="kittie 3"/>
            </div>
            <div>
                {store.getState().loggedIn && <button hidden={visible} className={common.button} onClick={onClick}>Logout</button>}
            </div>
        </header>
    )
}