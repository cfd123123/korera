import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount () {
            importComponent()  // function we imported which is a promise.
                .then(cmp => {  //resolver
                    /*
                    console.log("-----------------------");
                    console.log(cmp);
                    */
                    this.setState({component: cmp.default}); 
                });
        }
        
        render () {
            const C = this.state.component;
            /*
            console.log("111111111111111");
            console.log(this.props);
            console.log(C);
            */
            //问题： conditional operator
            return C ? <C {...this.props} /> : null;   //router-related props  这个组件会得到 相对应的route的所有属性。
        }
    }
}

export default asyncComponent;