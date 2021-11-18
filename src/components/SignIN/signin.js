import { Component } from 'react';
import './signinstyles.scss'
import { signInWithGoogle, auth } from '../../firebase/utils';
import { Link } from 'react-router-dom';

// Components
import AuthWrapper from '../AuthWrapper/authwrapper';
import Button from '../forms/Buttons/Buttons';
import FormInput from '../forms/FormInput/forminput';

const initalState = {
    email: '',
    password: '',
}

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initalState
        };

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const {name, value } = e.target;

        this.setState ({
            [name]:value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const {email, password} = this.state;

        try {

            await auth.signInWithEmailAndPassword(email,password)
            this.setState({
                ...initalState
            });

        } catch(err) {
            // console.log(err)
        }
    }

    render (index) { 
        const {email, password} = this.state;

        const configAuthWrapper = {
            headline: 'LogIn'
        };

        return (
                <AuthWrapper {...configAuthWrapper}>
                    <div className="formWrap">
                        <form onSubmit={this.handleSubmit}>

                            <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="E-Mail"
                            handleChange={this.handleChange}
                            />

                            <FormInput 
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            handleChange={this.handleChange}
                            />

                            <Button type="submit">Login</Button>

                            <div className="socialSignin">
                                <div className="row">
                                    <Button onClick={signInWithGoogle}>
                                        Sign IN with Google
                                    </Button>
                                </div>
                            </div>
                            <div className="links">
                                <Link to="/recovery">
                                    Forget Password ?
                                </Link>
                            </div>

                        </form>
                    </div>
                </AuthWrapper>
        );
    }
}

export default SignIn