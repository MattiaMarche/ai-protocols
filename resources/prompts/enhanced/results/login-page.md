Here is an example of a simple login form component in React that has email validation and password validation for minimum 8 characters. It's also centered and has a very basic CSS styling. You can adjust this code as necessary for your specific needs.

```jsx
import React, { Component } from 'react';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let emailError = '';
    let passwordError = '';

    if (!this.state.email.includes('@')) {
      emailError = 'Invalid email';
    }

    if (this.state.password.length < 8) {
      passwordError = 'Password should be minimum 8 characters long';
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    }

    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      // clear form
      this.setState({ email: '', password: '', emailError: '', passwordError: '' });
    }
  };

  render() {
    return (
      <div className="LoginPage">
        <form onSubmit={this.handleSubmit} style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh'}}>
          <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} />
          <div style={{ color: 'red' }}>{this.state.emailError}</div>
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
          <div style={{ color: 'red' }}>{this.state.passwordError}</div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
```

This login page will log the email and password to the console if they are valid. If not, it will display an error message below each input field. After the form is submitted, it will clear the form regardless of whether the input was valid or not. You may want to adjust this behavior for your needs. The form and its elements are also styled very simply with CSS, using flexbox to center the form on the page.