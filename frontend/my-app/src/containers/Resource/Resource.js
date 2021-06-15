import React from "react";
import { withRouter,NavLink,Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../store/antions/index';
import {Input, Space, Card, Table, Button} from 'antd'
import 'antd/dist/antd.css';
import SearchBox from '../../components/UI/SearchBox'
import {PlusOutlined,PlusSquareFilled} from '@ant-design/icons';
import "./Resource.css";
import Popup from "../../components/UI/Popup"
import NewCol from "../../components/UI/newCol/NewCol"
  
let num = 0;
const { Search } = Input;
/* const { Column, ColumnGroup } = Table; */



class Resource extends React.PureComponent{

   /*  constructor() {
    
        super();
        this.state = {
         data: {
        } 
    }
      } */

      state = {
                isInResourcePage: false,
                searchName: '',
                seen:false,
                addRow:{
                    shouldAdd:false,
                    inputform:{
                        name:{
                            placeholder:'name',
                            value:''
                        },
                        code:{
                            placeholder:'code',
                            value:''
                        },
                    }
                }
            }
        

    componentDidMount(){
       this.props.onStoreResourceDetails();
       console.log(this.props.ResourceDetails);
       
    }; 

    inputChangedHandler = (e) =>{
        this.setState({searchName : e.target.value});
    }

    handleSearch = () => {
        this.props.onStoreSearchResult(this.state.searchName)
    }
    
     onKeyPress = (event) =>{
        if(event.key === 'Enter'){
            this.handleSearch();
        }
    }

    togglePop = () => {
        this.setState({
         seen: !this.state.seen
        });
    }

    setSeen = (flag) => {
        this.setState({
            seen:!this.state.seen
        })
        console.log(this.state.seen); 
    }
    
    addRowHandler = () =>{
        this.setState({
            addRow: {
                shouldAdd:!this.state.shouldAdd
            },
        })

        console.log(this.state.addRow.shouldAdd); //because setState is asny, so it returns false and setState excuted after it.
    }
    
    render(){    
        let columns = [{
            title: "Resource Name",
            key:"recordId",
            dataIndex: "name",
            align: "center",
            width:850,
            
        },{
            title: "Resource Code",
            key:"recordId",
            dataIndex: "code"
        }];

        const formElementsArray = [];
        for(let key in this.state.addRow.inputform){
            formElementsArray.push({
                id : key,
                config: this.state.addRow.inputform[key]
            })
        }

        console.log(this.state.addRow.shouldAdd);
        let newform = formElementsArray.map( formElement => (
             <NewCol  key={formElement.id}
                     placeholder = {formElement.config.placeholder}
                     changed={( event ) => this.inputChangedHandler( event, formElement.id )}/> 
                     
        ))

        let element = null;

        if(this.props.ResourceDetails != null && this.props.AfterSearchData == null){
            let resourceElmentArray = [];
            console.log("this.props.ResourceDetails");
            console.log(typeof (this.props.ResourceDetails));
            this.props.ResourceDetails.map( resource =>(
                console.log(resource.recordId),
                resourceElmentArray.push( {
                    key:resource.recordId,
                    name: resource.column_value,
                    code: resource.resources_code
                } )
            )
            )
            console.log(resourceElmentArray); 

            element = <div className = "card_header">
                        <Card title = "Resource Catalog" type = "inner" headStyle = {{textAlign:"center"}} bordered >
                            <Table  pagination={false} bordered    columns = {columns}   dataSource = { resourceElmentArray} >               
                            </Table>          
                        </Card>  
                    </div>
        }else if(this.props.AfterSearchData !== null){
            let resourceElmentArray = [];
        
            this.props.AfterSearchData.map( resource =>(
                console.log(resource.recordId),
                resourceElmentArray.push( {
                    key:resource.recordId,
                    name: resource.column_value,
                    code: resource.resources_code
                } )
            )
            )

            element = <div className = "card_header">
                       {/* <Search className = "Search_box" placeholder="input search text" onChange={this.inputChangedHandler} onSearch={this.handleSearch}   onKeyPress={this.onKeyPress}  style={{ width: 200 }} />  */}
                        <Card title = "Resource Catalog" type = "inner" headStyle = {{textAlign:"center"}} bordered >
                            <Table  pagination={false} bordered    columns = {columns}   dataSource = { resourceElmentArray} >               
                                
                            </Table>          
                        </Card>  
                    </div>
        }
        
        return(
            <div className = "parent">
                    {this.state.seen ? <Popup setSeen = {this.setSeen} addRowHandler = {this.addRowHandler}/> : null}
                    <Space size = {900}>
                        <Search size ='middle' placeholder="input search text" onChange={this.inputChangedHandler} onSearch={this.handleSearch}   onKeyPress={this.onKeyPress}  style={{ width: 200 }} />
                        <PlusSquareFilled onClick={this.togglePop}  style={{color:'rgb(231, 136, 12)',fontSize: '32px'}}/>
                        {/* {this.state.seen ? <Popup/> : null} */}
                    </Space> 
            
            {element}

             {(this.state.addRow.shouldAdd) ? <form className = "input_form" onSubmit={this.submitHandler}>                 
                                                        {newform}
                                                        <Button type='primary'>submit</Button>
                                              </form> : null }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ResourceDetails: state.resource.ResourceDetails, 
        AfterSearchData: state.resource.AfterSearchData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onStoreResourceDetails: () => dispatch( actions.storeResourceAction()),
        onStoreSearchResult:(name)=> dispatch(actions.storeSearchResult(name))       
   };
};

export default  withRouter(connect( mapStateToProps, mapDispatchToProps )( Resource ));
