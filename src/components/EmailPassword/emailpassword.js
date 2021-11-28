import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import './emailpasswordstyles.scss'
import { withRouter } from "react-router";
import { resetPassword, resetAllAuthForms } from "../../redux/User/user.actions";

import AuthWrapper from '../AuthWrapper/authwrapper';
import FormInput from '../forms/FormInput/forminput';
import Button from '../forms/Buttons/Buttons';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError,
})

const EmailPassword = props => {

    const { resetPasswordSuccess , resetPasswordError } = useSelector(mapState)
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(resetPasswordSuccess) {
            dispatch(resetAllAuthForms())
            props.history.push('/login')
        }
    }, [resetPasswordSuccess])

    useEffect(() => {
        if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
            setErrors(resetPasswordError);
            console.log(2);
    }
    }, [resetPasswordError])

    const handleSubmit = e => {
        e.preventDefault();
        dispatch (resetPassword({email}));
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

export default withRouter(EmailPassword);