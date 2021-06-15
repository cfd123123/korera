import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {RouteData} from './RouteData'
import {RightCircleFilled,CloseOutlined} from '@ant-design/icons';
import './SideColumn.css'
import {withRouter} from "react-router-dom"
import { connect } from 'react-redux';

const SideCoulmn = function SideColumn() {
        const [sidebar, setSideBar] = useState(false)

        const showSideBar = () => setSideBar(!sidebar)

        return (
            <>    
                <div className = 'navbar'>
                    <Link to = '#' className = 'menu-bars'>
                        <RightCircleFilled style={{fontSize:"3rem", marginLeft:"10px"}} onClick = {sidebar ? null : showSideBar }/>
                    </Link>
                </div>

                <nav className = {sidebar? 'nav-menu active' : 'nav-menu'}>
                    <ul className = 'nav-menu-items'>
                        <li className = 'navbar-toggle'>
                            <Link to = '#' className = 'menu-bars' >
                                    <CloseOutlined onClick = {showSideBar} style = {{fontSize:"2rem",marginLeft:"10px"} }/>
                            </Link>
                        </li>
                    
                    {RouteData.map((item,index) => {
                        return (
                            <li key = {index} className = {item.cName}>
                                <Link to={item.path}>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                    </ul>
                </nav>

            </>
        )
    }

    
const mapStateToProps = state => {
    return {
        isAuthenticated: (state.auth.token != null),
    };
};


export default withRouter(connect( mapStateToProps, null )(SideCoulmn ));


