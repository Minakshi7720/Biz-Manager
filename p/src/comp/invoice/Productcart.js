import axios from 'axios'
import React,{useState,useEffect} from 'react'
import styles from './sale.module.css'
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

function Productcart(props) {
    
    const [value, setvalue] = useState(0)     //sale value
    
    
    useEffect(()=>{
        console.log(props.product_name+"="+value)
    },[value])

    const handleadd=()=>{
        setvalue(prevvalue=>prevvalue+1)

    }
    const handlesubtract=()=>{
        setvalue(prevvalue=>prevvalue-1)
       
    }

    var d=new Date()
    var day=d.getDay()
    
        
        
        const addsale=()=>{
            var obj={
                pname:props.product_name,
                quantity:value,
                price:value*props.product_price,
                id:props.product_id
            }
            props.setcartitems(prevState =>[...prevState ,obj])
            console.log("items",props.cartitems)
            setvalue(0)
  
        }
     

    
    
       
    

    return (
        <div className={styles.buttonsui}>      
            
            <div className={styles.card}>
                <button className={styles.addbtn} onClick={handleadd} >+</button>
                <div>{props.product_name}</div>
                <div>={value}</div>
                <button className={styles.subbtn} onClick={handlesubtract} >-</button>
                
                
            </div> 
            
            <Button variant="contained" color="primary" size="small" className={styles.submitbtn} onClick={addsale} startIcon={<SaveIcon />}>Save</Button>
            
            
        </div>
    )
}

export default Productcart
