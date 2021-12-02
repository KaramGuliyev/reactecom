import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './signinstyles.scss'
import { Link, useHistory } from 'react-router-dom';
import { emailSignInStart, googleSignInStart } from '../../redux/User/user.actions';

// Components
import AuthWrapper from '../AuthWrapper/authwrapper';
import Button from '../forms/Buttons/Buttons';
import FormInput from '../forms/FormInput/forminput';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const SignIn = props => {
    const {currentUser} = useSelector(mapState)
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (currentUser) {
          resetForm();
          history.push('/');
        }
    
      }, [currentUser]);
    
    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(emailSignInStart({ email , password }));

    }

    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart());
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
                                    <Button onClick={handleGoogleSignIn}>
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

export default SignIn;