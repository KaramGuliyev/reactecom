import React, { useState} from "react";
import './emailpasswordstyles.scss'
import { withRouter } from "react-router";

import AuthWrapper from '../AuthWrapper/authwrapper';
import FormInput from '../forms/FormInput/forminput';
import Button from '../forms/Buttons/Buttons';
import { auth } from '../../firebase/utils';

const EmailPassword = props => {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const config = {
                url: 'http://localhost:3000/login'
            };

            await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                props.history.push('/login')
            })
            .catch (() => {
                const err = ['Email not found, please try again.']
                setErrors(err);
            });
        } catch(err) {
                // console.log(err);
        }
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