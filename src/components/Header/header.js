import React from "react";
import './headerstyles.scss'
import Logo from '../../assets/logo.png'
import { Link } from "react-router-dom";

 const Header = props => {
     return (
         <header className="header">
             <div className="wrap">
                 <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="LOGO" />
                    </Link>
                 </div>
                 <div className="callToActions">
                    <ul>
                        <li>
                            <Link to="/registration">Register</Link>
                        </li>
                    </ul>
                 </div>
             </div>
         </header>
     )
 }

 export default Header;