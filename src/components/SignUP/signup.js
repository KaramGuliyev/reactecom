import React, { Component } from "react";
import './signupstyles.scss';
import { auth, handleUserProfile } from "../../firebase/utils";

//Components
import FormInput from "../forms/FormInput/forminput";
import Button from "../forms/Buttons/Buttons";
import AuthWrapper from '../AuthWrapper/authwrapper';

const initalState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: [],
};

class Signup extends Component {

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

    handleFormSubmit = async e => {
        e.preventDefault();
        const {displayName, email,password,confirmPassword} = this.state;

        if(password !== confirmPassword) {
            const err = ['Password don\'t match!'];
            this.setState({
                errors: err
            });
            return ;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, {displayName});

            this.setState({
                ...initalState
            });
        } catch(err) {
            // console.log(err)
        }

    }

    render () {

        const {displayName, email, password, confirmPassword, errors} = this.state;

        const configAuthWrapper = {
            headline: 'registration'
        };
        return (
                <AuthWrapper {...configAuthWrapper}>
                    <div className="formWrap">
                        {errors.length > 0 && (
                            <ul>
                                {errors.map((err, index) => {
                                    return (
                                        <li key={index}>
                                            {err}
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                        
                        <form onSubmit={this.handleFormSubmit}>
                            <FormInput
                                type="text"
                                name="displayName"
                                value={displayName}
                                placeholder="Full Name"
                                onChange={this.handleChange}
                            />
                            
                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                placeholder="E-mail"
                                onChange={this.handleChange}
                            />
                            
                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={this.handleChange}
                            />
                            
                            <FormInput
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={this.handleChange}
                            />
                                <Button type="submit" >Register</Button>
                        </form>
                    </div>
                </AuthWrapper>        
        );
    }
}

export default Signup;