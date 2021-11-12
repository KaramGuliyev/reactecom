import React from "react";
import './headerstyles.scss'
import Logo from '../../assets/logo.png'

 const Header = props => {
     return (
         <header className="header">
             <div className="wrap">
                 <div className="logo">
                    <img src={Logo} alt="LOGO" />
                 </div>
             </div>
         </header>
     )
 }

 export default Header;