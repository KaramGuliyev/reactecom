import react from "react";
import Man from '../../assets/shopMens.jpg'
import Women from '../../assets/shopWomens.jpg'
import { BrowserRouter, Link } from "react-router-dom";
import './directorystyles.scss'

const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div className="item" style={{backgroundImage: `url(${Women})`}}>
                        <a to="/">
                            Shop Womens
                        </a>
                </div>
                
                <div className="item" style={{backgroundImage: `url(${Man})`}}>
                        <a to="/">
                            Shop Mens
                        </a>
                </div>
            </div>
        </div>
    );
};

export default Directory;