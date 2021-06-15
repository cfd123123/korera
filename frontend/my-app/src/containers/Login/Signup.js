import React from "react";
import Input from '../../components/UI/Input';
import { connect } from 'react-redux';
import './Login.css';
//import * as actions from '../../store/antions/index';
import * as actions from '../../store/antions/index'
import { withRouter,NavLink,Link } from 'react-router-dom'


class SignUp extends React.PureComponent{
state = {
        SignupForm: {
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
            },
            /*
            role:{
                elementType: 'select',
                elementConfig: {
                    options: [
                       {value: 'Manager', displayValue: 'Manager'},
                       {value: 'Customer', displayValue: 'Customer'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
            */
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
        console.log(event.target.value);
          const updatedSignupForm = {
              ...this.state.SignupForm,                                       
              [inputIdentifier]: {
                  ...this.state.SignupForm[inputIdentifier],
                  value: event.target.value,
                  valid: this.checkValidity( event.target.value, this.state.SignupForm[inputIdentifier].validation),
                  touched: true
              }
          };
          console.log("inputChangedHandler is below");

          let formIsValid = true;                                
          for(let inputIdentifier in this.state.SignupForm){ 
                console.log(updatedSignupForm[inputIdentifier].valid);
                formIsValid = updatedSignupForm[inputIdentifier].valid && formIsValid;  //to check whether the whole form is valid 
          }
          this.setState( { SignupForm: updatedSignupForm , formIsValid: formIsValid } );      
      }

      submitHandler = ( event ) => {
            event.preventDefault();
            //alert("submit");
            console.log("actions-----------------------");
            console.log(this.props.onSignUp);
            this.props.onSignUp( this.state.SignupForm.username.value, this.state.SignupForm.password.value, this.state.formIsValid );
            this.props.history.push('/login');
        }

        componentDidMount() {
            console.log(this.props.authRedirectPath);
            /*
            if (this.props.authRedirectPath !== '/') {
                this.props.onSetAuthRedirectPath('/help');
            }
            */
        }

    render(){
        // reusebility
        const formElementsArray = [];
        for ( let key in this.state.SignupForm ) {
            formElementsArray.push( {
                id: key,
                config: this.state.SignupForm[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
           // console.log("formElementID"),
           // console.log(formElement.id),
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
        
        return (
            <div className = "login_container">   
                <h1 className = "signin_title">Sign up</h1> 
                    <form className = "input_form" onSubmit={this.submitHandler}>
                        {/* <div className = "login_container"> */}
                            {form}
                        {/* </div> */}
                        <button type="submit" className="btn btn-warning b1" disabled = {!this.state.formIsValid}>submit</button>
                    </form>

                
            </div> 
            
            
        );
    }
}


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        //authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
       //onSignUp: ( email, password, isSignup ) => dispatch({type:actionTypes.AUTH_START}）,     
        onSignUp: ( username, password , role, formIsValid ) => dispatch( actions.SignUp( username, password, formIsValid ) ),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
   };
};

export default  withRouter(connect( mapStateToProps, mapDispatchToProps )( SignUp ));