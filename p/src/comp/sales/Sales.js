import { StylesProvider } from '@material-ui/core';
import axios from 'axios';
import React, { Component } from 'react'
import Addsales from './Addsales'
import Stockupdate from './Stockupdate'
import styles from './sale.module.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

export default class  Sales extends Component {
    
    constructor(){
        super();
        this.state={
            data:[],
            profit:[],
            Value1:'1',
            
        };
       
        
        
    }



    componentDidMount(){                 //get data from backend
        axios.get('http://localhost:3001/receiveddata',{
            params:{user:localStorage.getItem('user')}
        })
        .then(response=>{
            const data=response.data
            this.setState({data})
            
            
        })

    }

   

   
    
    handleChange = (event, newValue) => {
        this.setState({Value1:newValue});
    };
      

    

    render(){
        
    return (
        <div className={styles.desktopview}>

<TabContext value={this.state.Value1}>
                    <div className={styles.tabs}>
                        <Tabs onChange={this.handleChange} >
                            <Tab label="Add Sale Record&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" value="1" />
                            <Tab label="Update Stock" value="2" />
                        </Tabs>
                    </div>
                    <div className={styles.panel}>
                        <TabPanel value="1">
                        <h2>Sale Update</h2>
                            {this.state.data.map((item)=>(    //map the data 
                                <Addsales 
                                key={item.product_id}
                                product_id={item.product_id}
                                product_name={item.product_name}
                                product_price={item.product_price} 
                                user={item.user}
                                
                                
                                />
                            ))}
                              
                        </TabPanel>
                        <TabPanel value="2">
                        
                        <h2>Stock Update</h2>
                            {this.state.data.map((item)=>(    //map the data 
                                <Stockupdate 
                                key={item.product_id}
                                product_id={item.product_id}
                                product_name={item.product_name}
                                product_price={item.product_price} 
                                user={item.user}
                                
                                
                                />
                            ))}

                        </TabPanel>
                    </div>
                </TabContext>


           
            
            
           
        </div>
    )
            }
}
