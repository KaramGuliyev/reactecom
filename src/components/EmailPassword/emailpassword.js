import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import './emailpasswordstyles.scss'
import { withRouter,useHistory } from "react-router";
import { resetPasswordStart, resetUserState } from "../../redux/User/user.actions";

import AuthWrapper from '../AuthWrapper/authwrapper';
import FormInput from '../forms/FormInput/forminput';
import Button from '../forms/Buttons/Buttons';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr,
})

const EmailPassword = props => {

    const { resetPasswordSuccess, userErr } = useSelector(mapState)
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        console.log(2)

        if(resetPasswordSuccess) {
            dispatch(resetUserState());
            history.push('/login')

        }
    }, [resetPasswordSuccess])

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
    }
    }, [userErr])

    const handleSubmit = e => {
        e.preventDefault();
        dispatch (resetPasswordStart ({ email }));
    }
        
        const configAuthWrapper = {
            headline: 'Email Passowrd'
        }
        
        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">

                    {errors.length > 0 && (
                        <ul>
                            {errors.map((e, index) => {
                                return(
                                    <li key={index}>
                                        {e}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <FormInput 
                        type="email" 
                        name="email" 
                        value={email} 
                        placeholder="E-Mail" 
                        handleChange={e => setEmail(e.target.value)}
                        />

                        <Button type="submit">
                            Reset password
                        </Button>
                    </form>
                </div>
            </AuthWrapper>
        );
}

export default EmailPassword;