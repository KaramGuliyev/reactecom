import Footer from "../components/Footer/Footer";
import Header from "../components/Header/header";

const MainLayout = props => {
    return (
        <div>
            <Header {...props}/>
            <div className="main">
                {props.children}
                <Footer />
            </div>
        </div>
    );
}

export default MainLayout;