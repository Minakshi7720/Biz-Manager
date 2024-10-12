import React from 'react'
import styles from './action.module.css'
import axios from 'axios'
import Top_product from './Top_product'
import icon1 from '../../assets/addcart.png'
import icon2 from '../../assets/listp.png'
import icon3 from '../../assets/charts.png'
import icon4 from '../../assets/sale.png'
import icon5 from '../../assets/profit.png'
import icon6 from '../../assets/bill.png'
import icon7 from '../../assets/profile.png'
import {Route,Link,Switch} from 'react-router-dom'
import Products from '../products/Products'
import List from '../list/List'
import Charts from '../chart/Chart'
import sales from '../sales/Sales'
import Profit from '../profit/Profitview'
import Sales from '../sales/Sales'
import Invoice from '../invoice/Invoice'
import Profile from '../profile/Profile'






export default class Action extends React.Component {

    constructor(props)
  {
    super(props);
    this.state={
      topproduct:[],
      login:true,
    };
  };

  
    componentDidMount()
    {
           axios.get(`http://localhost:3001/top_product`,{
             params:{user:localStorage.getItem('user')}
           })
          .then(res => {
            const data1 = res.data;
            this.setState({topproduct:data1})
            
          })

    }

    componentWillUpdate(nextProps, nextState) {
      
      if(nextProps.login_status==true&&nextState.login==true)
      {
        axios.get(`http://localhost:3001/top_product`,{
             params:{user:localStorage.getItem('user')}
           })
          .then(res => {
            const data1 = res.data;
            this.setState({topproduct:data1})
            this.setState({login:false})
          })

      }
        
      
    }
     

    render(){
    
        return (
          <div>
            <div className={styles.desktopview}>
      
                    <div className={styles.topbox}>
                        <div className={styles.toptag}>TOP ITEMS</div>
                    {this.state.topproduct.map((data) => (
                    <Top_product 
                    key={data.product_name}
                    pname={data.product_name} />
                    ))}
    
                    </div>
                    
                    
    
    
                    <div className={styles.actionbox}>
                        <div className={styles.products} onClick={this.props.func} ><img alt='img' src={icon1} className={styles.img1} /><Link to='/addproduct' className={styles.tag3}>Add Products</Link><div className={styles.line} /></div>
                        <div className={styles.products} onClick={this.props.showlist} ><img alt='img' src={icon2} className={styles.img1} /><Link to='/list' className={styles.tag3}>List Products</Link><div className={styles.line} /></div>
                        <div className={styles.products} onClick={this.props.showchart}><img alt='img' src={icon3} className={styles.img1} /><Link to='/charts' className={styles.tag3}>Charts</Link><div className={styles.line} /></div>
                        <div className={styles.products} onClick={this.props.handleaddsales}><img alt='img' src={icon4} className={styles.img1} /><Link to='/sale' className={styles.tag3}>Sales</Link><div className={styles.line} /></div>
                        <div className={styles.products} onClick={this.props.handleprofitview}><img alt='img' src={icon5} className={styles.img1} /><Link to='/profit' className={styles.tag3}>Profit</Link><div className={styles.line} /></div>
                        <div className={styles.products} onClick={this.props.handleinvoice}><img alt='img' src={icon6} className={styles.img1} /><Link to='/invoice' className={styles.tag3}>Invoice</Link><div className={styles.line} /></div>
                        <div className={styles.products} onClick={this.props.handleinvoice}><img alt='img' src={icon7} className={styles.img1} /><Link to='/profile' className={styles.tag3}>Profile</Link><div className={styles.line} /></div>
                    </div>

                      </div>
                    <Switch className={styles.rightside}>
                        <Route path='/addproduct'>
                          <Products />
                        </Route>
                        <Route path='/list'>
                          <List />
                        </Route>
                        <Route path='/charts'>
                          <Charts />
                        </Route>
                        <Route path='/sale'>
                          <Sales />
                        </Route>
                        <Route path='/profit'>
                          <Profit />
                        </Route>
                        <Route path='/invoice'>
                          <Invoice />
                        </Route>
                        <Route path='/profile'>
                          <Profile />
                        </Route>
                        <Route path='/'>
                          <Charts />
                        </Route>

                    </Switch>
                
                
            </div>
        )
    }
    
}
