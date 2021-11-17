import Button from '../forms/Buttons/Buttons';
import './signinstyles.scss'
import { signInWithGoogle, auth } from '../../firebase/utils';
import { Component } from 'react';
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

        return (
        <div className="signin">
            <div className="wrap">
                <h2>Log IN</h2>
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
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default SignIn