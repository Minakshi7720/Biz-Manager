import React from 'react'
import styles from './list.module.css'
import axios from 'axios'
import que from '../../assets/que.jpg'



export default function Showlist(props) {
    
    
    const closebox=()=>{

       
        props.deletef(props.product_id) //for temporary removal
        props.updatestock(props.quantity)
        
        axios.post('http://localhost:3001/delete_product',{
            
                id:props.product_id,
                pname:props.product_name,
                user:localStorage.getItem('user')
                
            }).then(()=>{
                console.log('deleted')//to remove permenatly
               
            })          

        
           
    }

    return (
        <div>
            <div className={styles.finallist}>
                <div className={styles.close_btn} onClick={closebox}>X</div>
                <div className={styles.container}>
                    <div  className={styles.img}><img className={styles.img1} src={que} /></div>
                    <div className={styles.productname}>{props.pname}</div>
                    <div className={styles.price}>${props.price}</div>
                    <div className={styles.stock}>Stock:     {props.quantity}</div>
                
                </div>
            
            </div>
        </div>
    )
}
