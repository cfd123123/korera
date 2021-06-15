import React from 'react'
import {withRouter, NavLink, Link} from "react-router-dom"
import './SideBar.css'
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
/* import Navbar from '../Navbar/Navbar' */
import SideColumn from '../Navbar/SideColumn/SideColumn';
import {UserAddOutlined, UserDeleteOutlined} from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

const SideBar = (props) => {
    console.log("---------------------------------");
    let element = null;
    
    if (!props.isAuthenticated) {
        element =   <NavLink to = "/login" 
                            exact
                            activeClassName="my-active">
                                                           
                    <UserAddOutlined />
                    </NavLink>
    }else{
        element =   <NavLink to = "/logout" 
                            exact
                            activeClassName="my-active"
                                                       ><UserDeleteOutlined /></NavLink>
    }
    
    return (
        <div className= "nav1" >
            <nav className = "nav">
                <button className = "btn btn-warning b1">Resource Management</button>
                <SideColumn/> 
                <ul>
                    <li>{element}</li>
                    <li><NavLink to = "/help" exact>?</NavLink></li>
                </ul>
            </nav>
        </div>

    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default withRouter(connect( mapStateToProps, null )( SideBar ));;

