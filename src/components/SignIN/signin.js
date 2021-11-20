import { useState } from 'react';
import './signinstyles.scss'
import { signInWithGoogle, auth } from '../../firebase/utils';
import { Link, withRouter } from 'react-router-dom';

// Components
import AuthWrapper from '../AuthWrapper/authwrapper';
import Button from '../forms/Buttons/Buttons';
import FormInput from '../forms/FormInput/forminput';

const SignIn = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {

            await auth.signInWithEmailAndPassword(email,password)
            resetForm();
            props.history.push('/');


        } catch(err) {
            // console.log(err)
        }
    }

        const configAuthWrapper = {
            headline: 'LogIn'
        };

        return (
                <AuthWrapper {...configAuthWrapper}>
                    <div className="formWrap">
                        <form onSubmit={handleSubmit}>

                            <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="E-Mail"
                            handleChange={e => setEmail(e.target.value)}
                            />

                            <FormInput 
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            handleChange={e => setPassword(e.target.value)}
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

export default withRouter(SignIn);