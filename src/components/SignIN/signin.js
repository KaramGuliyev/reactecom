import Button from '../forms/Button/button';
import './signinstyles.scss'
import { signInWithGoogle } from '../../firebase/utils';
import { Component } from 'react';

class SignIn extends Component {

    handlesubmit = async e => {
        e.preventDefault();
    }

    render () { 
        return (
        <div className="signin">
            <div className="wrap">
                <h2>Log IN</h2>
                <div className="formWrap">
                    <form onSubmit={this.handlesubmit}>
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