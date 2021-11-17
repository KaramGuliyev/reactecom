import Footer from "../components/Footer/Footer";
import Header from "../components/Header/header";

const HomepageLayout = props => {
    return (
        <div className="fullHeight">
            <Header {...props}/>
            {props.children}
            <Footer />
        </div>
    );
}

export default HomepageLayout;