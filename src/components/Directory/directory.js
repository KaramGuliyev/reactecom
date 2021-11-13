import { Link } from 'react-router-dom';
import Man from '../../assets/shopMens.jpg'
import Women from '../../assets/shopWomens.jpg'
import './directorystyles.scss'

const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div className="item" style={{backgroundImage: `url(${Women})`}}>
                    <Link to="/">Shop Womens</Link>
                </div>
                
                <div className="item" style={{backgroundImage: `url(${Man})`}}>  
                    <Link to="/">Shop Mens</Link>
                </div>
            </div>
        </div>
    );
};

export default Directory;