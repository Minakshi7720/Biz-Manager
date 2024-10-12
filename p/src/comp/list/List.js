import React, { Component } from 'react'
import Showlist from './Showlist'
import styles from './list.module.css'
import axios from 'axios'
import Modal from 'react-modal'
import Product from "../products/Products"

export default class List extends Component {
    constructor(){
        super();
        this.state={
            data1:[],
            isopen:false,
            totalproduct:0,
            stockinhand:0
        };
    }

    delete_product(to_del_id){
        let updated_data=this.state.data1.filter(data_ => data_.product_id != to_del_id);
        this.setState({ data1: updated_data });
        this.setState({totalproduct:this.state.totalproduct-1})
        
          
    }

    update_stock(quantity){
        
        this.setState({stockinhand:this.state.stockinhand-quantity})
          
    }

    modaltoggle=()=>{
        this.setState({isopen:!this.state.isopen})  
        console.log(this.state.isopen)
    }
    

    componentDidMount() {
        axios.get(`http://localhost:3001/receiveddata`,{
            params:{user:localStorage.getItem('user')}
        })
          .then(res => {
            const data = res.data;
            this.setState({ data1:data });
            console.log(this.state.data1)
          }) 

          axios.get(`http://localhost:3001/totalproduct`,{
            params:{user:localStorage.getItem('user')}
        })
          .then(res => {
            const data = res.data[0].count;
            this.setState({totalproduct:data})
            console.log(data)
          }) 

          axios.get(`http://localhost:3001/stockinhand`,{
            params:{user:localStorage.getItem('user')}
        })
          .then(res => {
            const data = res.data[0].stock;
            this.setState({stockinhand:data})
            console.log('stock in hand',data)
          }) 


      }

     
          
   
    
    
    
   render(){
       if(this.state.stockinhand<50)
       var a=<div className={styles.lowstock1}>Low Stock</div>

       if(Object.keys(this.state.data1).length==0)
       var b=<div className={styles.b}>no products, add new product</div>

    return (
        <div className={styles.desktopview}>
            <div className={styles.record}>
            <div className={styles.totalproduct}>
                <div className={styles.tag1}>total products</div>
                <div className={styles.value1}>{this.state.totalproduct}</div>
            </div>
            <div className={styles.totalstock}>
            <div className={styles.tag2}>stock in hand</div>
            <div className={styles.value2}>{this.state.stockinhand}</div>
            {a}
            </div>
            </div>
            

            <div className={styles.tag}>product list</div> 
            {
            
            this.state.data1.map(({product_id,product_name,product_price,stock})=>(
                <Showlist 
                key={product_id}
                product_id={product_id}
                pname={product_name}
                price={product_price}
                quantity={stock}
                deletef={()=>this.delete_product(product_id)}
                updatestock={()=>this.update_stock(stock)}
                 />
            ))}

            {b}
            {/* <div className={styles.btns}>
            <button onClick={this.props.home} className={styles.back}>back</button>
            <button onClick={this.modaltoggle} className={styles.add_p}  >Add Product</button>
            </div> */}
            

            
            
            <Modal className={styles.add_p_popup} 
            isOpen={this.state.isopen}
            onRequestClose={this.modaltoggle}>
                <button className={styles.close} onClick={this.modaltoggle}  >close</button>
                <Product/>
            </Modal>
            
        </div>
    )
    }
}
