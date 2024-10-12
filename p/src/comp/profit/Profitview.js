import axios from 'axios';
import React, { Component } from 'react'
import styles from './profit.module.css'
import Profit from './Profit'
import MProfit from './MProfit'
import Salehistory from './Salehistory'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

export default class  Profitview extends Component {
    
    constructor(){
        super();
        this.state={
            profit:[],
            Mprofit:[],
            totalprofit:0,
            salehistory:[],
            Value1:'1',
            filter:"true"
        };
       
        
        
    }



    componentDidMount(){                 //get data from backend
        

        axios.get(`http://localhost:3001/dailyprofit`,{
          params:{user:localStorage.getItem('user'),
          filter:this.state.filter}
        })
          .then(res => {
            const data1 = res.data;
            this.setState({profit:data1})
           
          })
        axios.get(`http://localhost:3001/monthlyprofit`,{
          params:{user:localStorage.getItem('user')}
        })
          .then(res => {
            const data1 = res.data;
            this.setState({Mprofit:data1})
            console.log('monthly',this.state.Mprofit)
          })

        axios.get(`http://localhost:3001/totalprofit`,{
          params:{user:localStorage.getItem('user')}
        })
          .then(res => {
            const data2 = res.data;
            
            this.setState({totalprofit:Object.values(data2[0])})
           
          })

          axios.get(`http://localhost:3001/salehistory`,{
          params:{user:localStorage.getItem('user'),
          filter:this.state.filter}
        })
          .then(res => {
            const data1 = res.data;
            this.setState({salehistory:data1})
           
          })
    }

   
    
   filter=()=>{
     if(this.state.filter==='true')
    this.setState({filter:"false"})
    else if(this.state.filter==='false')
    this.setState({filter:"true"})

    axios.get(`http://localhost:3001/dailyprofit`,{
          params:{user:localStorage.getItem('user'),
          filter:this.state.filter
        }
        })
          .then(res => {
            const data1 = res.data;
            this.setState({profit:data1})
           
          })

    axios.get(`http://localhost:3001/salehistory`,{
            params:{user:localStorage.getItem('user'),
            filter:this.state.filter}
          })
            .then(res => {
              const data1 = res.data;
              this.setState({salehistory:data1})
             
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
                            <Tab label="Daily Profit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" value="1" />
                            <Tab label="Average Monthly Profit" value="2" />
                        </Tabs>
                    </div>
                    <div className={styles.panel}>
                        <TabPanel value="1">
                          <div className={styles.bigbox1}>
                            <div className={styles.profitbox}>
                              <div className={styles.ptag}>Profit</div>
                              <div className={styles.value}>${this.state.totalprofit}</div>      
                            </div>
                            
                              
                            <div className={styles.tableheading}>
                              <div className={styles.date1}>Date</div>
                              <div className={styles.filter} onClick={this.filter}>&#x2195;</div>
                              <div className={styles.flex1}>
                              <div className={styles.profit1}>Profit</div>
                              <div className={styles.growth1}>Growth</div>
                              </div>
                            </div>
                              {this.state.profit.map((item)=>(    //map the data 
                                  <Profit 
                                  key={item.date,item.product_id,item.user}
                                  date={item.date}
                                  profit={item.prof}
                                  growth={item.growth_percentage}
                                  />
                              ))}
                          </div>
                        </TabPanel>
                        <TabPanel value="2">
                        <div className={styles.bigbox1}>
                            <div className={styles.profitbox}>
                              <div className={styles.ptag}>Profit</div>
                              <div className={styles.value}>${this.state.totalprofit}</div>      
                            </div>
                              
                            <div className={styles.tableheading}>
                              <div className={styles.date1}>Month</div>
                              <div className={styles.flex1}>
                              <div className={styles.profit1}>Profit</div>
                      
                              </div>
                            </div>
                              {this.state.Mprofit.map((item)=>(    //map the data 
                                  <MProfit 
                                  key={item.month}
                                  month={item.month}
                                  avg={item.avg}
                                  
                                  />
                              ))}
                          </div>
                        </TabPanel>
                    </div>
                </TabContext>



            


            <div className={styles.bigbox1}>
            < div className={styles.profitbox}>
                <div className={styles.ptag}>Sale history</div>   
            </div>

          <div className={styles.tableheading}>
            <div className={styles.date1}>Date</div>
            <div className={styles.filter} onClick={this.filter}>&#x2195;</div>
            <div className={styles.flex1}>
            <div className={styles.profit1}>Product</div>
            <div className={styles.growth1}>Quantity</div>
            </div>
          </div>

            {this.state.salehistory.map((item)=>(    //map the data 
                <Salehistory 
                key={item.date,item.product_id,item.user}
                date={item.date}
                profit={item.profit}
                product_name={item.product_name}
                product_price={item.product_price}
                quantity={item.sale_count}
                />
            ))}
            </div>
           
        </div>
    )
            }
}
