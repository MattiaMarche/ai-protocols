Here is an example of how to create a login page in React using hooks:

```jsx
import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();

        if (validateEmail() && validatePassword()) {
            console.log('Logged in!');
        } else {
            setEmailError(!validateEmail());
            setPasswordError(!validatePassword());
        }
    }

    const validateEmail = () => {
        const emailRegEx = /^\S+@\S+\.\S+$/;
        
        return emailRegEx.test(email);
    }

    const validatePassword = () => {
        return password.length >= 8;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Email: </label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    {emailError && <p>Please enter a valid email!</p>}
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    {passwordError && <p>Password must be at least 8 characters long!</p>}
                </div>
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default LoginPage;
```
In the `LoginPage` functional component:
- `useState` is used to manage `email`, `password`, `emailError`, and `passwordError` states.
- We are using an `onSubmit` function to handle form submission where email and password validators are called. If the inputs are valid, a 'Logged in!' message is logged in the console. Otherwise, error messages are enabled to display below the input fields.
- `validateEmail` function tests the email against a simple regular expression for email validation.
- `validatePassword` function checks if the password length is at least 8 characters long.
- The form is styled to be centered on the screen.
  
This is a very simplistic example and for a real project you would want to use a library to manage form state and validations, connect to an authentication service in the onSubmit function, and have a more robust user interface.