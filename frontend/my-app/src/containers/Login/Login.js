import React from "react";
import Input from '../../components/UI/Input';
import { connect } from 'react-redux';
import './Login.css';
//import * as actions from '../../store/antions/index';
import * as actions from '../../store/antions/index'
import { withRouter,NavLink,Link, Redirect } from 'react-router-dom'



class Login extends React.PureComponent{

    state = {
        LoginForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'username',
                    placeholder: 'username'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength:20
                },
                valid: false,
                touched: false
            }
        },
        formIsValid:false,
    }
               //event.target.value, validations.
    checkValidity(value, rules){
        let isValid = true;
        if ( !rules ) {      // it means state "validation" is not exist in the state. 
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }
                                  // name password
    inputChangedHandler = ( event, inputIdentifier ) => {
        // check whether each form is valid
        //console.log(event.target.value);
          const updatedLoginForm = {
              ...this.state.LoginForm,                                       
              [inputIdentifier]: {
                  ...this.state.LoginForm[inputIdentifier],
                  value: event.target.value,
                  valid: this.checkValidity( event.target.value, this.state.LoginForm[inputIdentifier].validation),
                  touched: true
              }
          };

          let formIsValid = true;                                
          for(let inputIdentifier in this.state.LoginForm){ 
               // console.log("----------------");
               // console.log(updatedLoginForm[inputIdentifier].valid);
                formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;  //to check whether the whole form is valid 
          }
          this.setState( { LoginForm: updatedLoginForm , formIsValid: formIsValid } );      
      }

      submitHandler = ( event ) => {
            event.preventDefault();
            //alert("submit");
            //console.log("actions-----------------------");
           // console.log(this.props.onAuth);
            this.props.onAuth( this.state.LoginForm.username.value, this.state.LoginForm.password.value, this.state.formIsValid );

            if(localStorage.getItem("token")){
                this.props.history.push('/help');
            }
            
        }

        componentDidMount() {
            console.log("this.props.authRedirectPath-----------------------");
            console.log(this.props.authRedirectPath);
            /* if (this.props.isAuthenticated) {
                console.log("localStorage info-----------------------------------------");
                this.props.history.push('/resource');
            } */
            console.log(this.props.isAuthenticated);
           
            
        }

    render(){

        // reusebility
        const formElementsArray = [];
        for ( let key in this.state.LoginForm ) {
            formElementsArray.push( {
                id: key,
                config: this.state.LoginForm[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input className= "input_form"
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        let authRedirect = null;
        console.log("token: " + this.props.token);

        if (this.props.isAuthenticated) {
            //authRedirect = <Redirect to={this.props.authRedirectPath}/> //redirect if successful log in
            authRedirect = <Redirect to= '/resource'/>
            console.log(this.props.isAuthenticated);
        }
        console.log("authed:" + this.props.isAuthenticated);
        return (
            <div className = "login_container">   
               {authRedirect}
                <h1 className = "signin_title">Sign In</h1> 
                    <form className = "input_form" onSubmit={this.submitHandler}>
                        {/* <div className = "login_container"> */}
                            {form}
                        {/* </div> */}
                        <button type="submit" className="btn btn-warning b1" disabled = {!this.state.formIsValid}>Login</button>
                    </form>
                
                <div className ="signup_password">
                    <button type="submit" className="btn btn-warning b2"> 
                        <NavLink to = "/signup" exact activeStyle={{
                            fontWeight: 'bold',
                        }}> SignUp</NavLink>
                    </button>
                    <p className="forgot-password" >
                            Forgot <a href="#">password?</a>
                    </p>
                </div>       
            </div> 
        );
    }
}


const mapStateToProps = state => {
    console.log("in map: " );
    console.log(state);
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: (state.auth.token != null),
        //authRedirectPath: state.auth.authRedirectPath,
        //token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
       //onAuth: ( email, password, isSignup ) => dispatch({type:actionTypes.AUTH_START}）,     
        onAuth: ( username, password , formIsValid ) => dispatch( actions.auth( username, password, formIsValid ) ),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
   };
};

export default  withRouter(connect( mapStateToProps, mapDispatchToProps )( Login ));
//export default Login;
