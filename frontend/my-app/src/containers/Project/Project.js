import React from "react";

import { withRouter,NavLink,Link, Redirect } from 'react-router-dom'
import { Table, Radio, Divider,Input, Space, Card, Button, Modal,Popover,  Checkbox } from 'antd';
import axios from 'axios';
import {UnorderedListOutlined,ExportOutlined, DeleteFilled } from '@ant-design/icons';
import './Project.css'
let res = null;


class Project extends React.PureComponent{
    
    state = {
        resourceData:null,
        isModalVisible:false,
        selectedRows:null,
        rowsInProject:null,
        shouldBeDelete:null
    }

    showModal = () =>{
        this.setState({
            isModalVisible: !this.state.isModalVisible
        })
        

        console.log(this.state.isModalVisible);
    }

    handleCancel = () =>{
        this.setState({
            isModalVisible: !this.state.isModalVisible
        })
    }

    handleRowSelectChange = () => {

    }
    componentDidMount(){

        let url = 'http://localhost:8080/resource/getAllResourceDetail';

        axios.get(url)
                .then(response => {
                    console.log(response)
                    console.log(response.data); 
                    //localStorage.setItem('resourceData',response.data)
                    this.setState({
                        resourceData:response.data
                    })
                })
                .catch(err => {
                    console.log("errmessage----------------------");
                    console.log(err);
                    alert("cannot load data")
                }); 
    }
    
    onSelectChange = (selectRow) =>{
            const res = selectRow;
            console.log(res);
             this.setState({selectedRows: res })
           /*  this.setState((preState,props)=>({selectedRows:preState.concate(selectRow)})) */ 
            console.log(this.state.selectedRows);
    }

    onProjectSelectChange =  (selectRow) =>{
        this.setState({shouldBeDelete : selectRow })
       /*  this.setState((preState,props)=>({selectedRows:preState.concate(selectRow)})) */ 
        //console.log(this.state.rowsInProject);
    }

    transferData = () => {
        const data = this.state.selectedRows;
        const res = [];
        //console.log(data);
        for(let id of data){
            for(let resource of this.state.resourceData){
                if(resource.recordId == id){
                    res.push(resource);
                    continue;
                }
            }
        }
        //console.log(res);
        this.setState({rowsInProject: res })
        console.log(this.state.rowsInProject);
    }

    deleteSelect = () => {
        const res = this.state.shouldBeDelete;  
        const array = this.state.rowsInProject;  
         console.log(this.state.rowsInProject); 
        console.log(array);
        const newArray = [];
        for(let arr of array){
            if(res.indexOf(arr.recordId) > -1){
                newArray.push(arr);
            }
        }

        const diff = array.concat(newArray).filter(function(v, i, arr) {
            return arr.indexOf(v) === arr.lastIndexOf(v);
       });

        this.setState({rowsInProject: diff }) 
    }
    
    render(){
        let element = null;

        let columns = [{
            title: "Resource Name",
            key:"resourceName",
            dataIndex: "name",  //match to resourceElmentArray
            width:250,
            /* render: (text) => <a>{text}</a> */
        },{
            title: "Resource Code",
            key:"resourceCode",
            dataIndex: "code",
            width:250,
        }];


        let projectColumns = [{
            title: "Project Name",
            key:"project name",
            dataIndex: "name",  //match to projectElmentArray
            width:250,
            /* render: (text) => <a>{text}</a> */
        },{
            title: "project Code",
            key:"project code",
            dataIndex: "code",
            width:250,
        }];


        const resourceElmentArray = [];
        const projectElmentArray = [];

        const rowSelection = {
            /*  selectedRowKeys, */
            onChange: this.onSelectChange, 
            /* getCheckboxProps: record => ({
              disabled: record.disabled,
            }), */
        
        }

        const projectRowSelection = {
            /*  selectedRowKeys, */
            onChange: this.onProjectSelectChange, 
            /* getCheckboxProps: record => ({
              disabled: record.disabled,
            }), */
        
        } 
        

        if(this.state.resourceData !== null){
            console.log(this.state.resourceData);
            this.state.resourceData.map( resource =>(
                 console.log(resource), 
                /* console.log(resource.column_value), */
                resourceElmentArray.push( {
                    key:resource.recordId,
                    name: resource.column_value,
                    code: resource.resources_code
                } )
                )
            )

            if(this.state.rowsInProject !== null){
                console.log(this.state.rowsInProject);
                this.state.rowsInProject.map( resource =>(
                         console.log(resource), 
                        /* console.log(resource.column_value), */
                        projectElmentArray.push( {
                            key:  resource.recordId,
                            name: resource.column_value,
                            code: resource.resources_code
                        } )
                    )
                )
            }

            element = <div className = "card_header">
                        <Card title = "Resource Catalog" type = "inner" headStyle = {{textAlign:"center"}} bordered >
                            <Table rowSelection={rowSelection}  /* rowSelection={{type:"checkbox"}} */ pagination={false} bordered    columns = {columns}   dataSource = { resourceElmentArray} >               
                            </Table>          
                        </Card> 
                        
                        <Card title = "Project" type = "inner" headStyle = {{textAlign:"center"}} bordered >
                            <DeleteFilled onClick = {this.deleteSelect}/>
                            <Table  rowSelection={projectRowSelection} pagination={false} bordered    columns = {projectColumns}   dataSource = { projectElmentArray} >               
                            </Table>       
                        </Card> 

                    </div>
        }

        

        const content = (
            <div>
                    <div className = "popover">
                        <Checkbox className = "c1" onChange={this.selectAll}  >
                            <p className = "p1">Select All</p>
                        </Checkbox>
                        <br/>
                        <Checkbox className = "c2" /* onChange={this.clearAll} */ >
                            <p className = "p2">Clear Selection </p> 
                        </Checkbox>
                    </div>
            </div>
            
        );
        

        return(
            <div>
                <h1>project page</h1>
                <div>
                    <Popover /* visible = {true} */content={content} placement="rightBottom" /* visible={true} */>
                        <UnorderedListOutlined onClick = {this.showModal} />
                    </Popover>
                    <span><ExportOutlined onClick = {this.transferData}/></span>
                </div>
                
                    {/* <Modal visible={this.state.isModalVisible}  onOk={handleOk}  onCancel={this.handleCancel}>
                        <p>sagasg </p>
                    </Modal> */}
                    {element}

                    
            </div>
            
        )
    }
}

export default Project;