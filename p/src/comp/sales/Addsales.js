import axios from 'axios'
import React,{useState,useEffect} from 'react'
import styles from './sale.module.css'
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

function Addsales(props) {
    
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
            
           
            {
                {
                    axios.post('http://localhost:3001/saleupdate',{
                        product_id:props.product_id,
                        product_name:props.product_name,
                        salecount:value,
                        profit:value*props.product_price,
                        day:day,
                        user:props.user
                        
                    }).then(()=>{
                        console.log('success')
                       
                    })
                   
                    axios.post('http://localhost:3001/weekday_table_update',{
                        product_id:props.product_id,
                        product_name:props.product_name,
                        salecount:value,
                        day:day,
                        user:props.user
                    }).then(()=>{
                        console.log('success')
                    })

                    axios.post('http://localhost:3001/profit_table',{
                        
                        user:props.user
                    }).then(()=>{
                        console.log('success')
                    })

                    axios.post('http://localhost:3001/growth_table',{
                        user:localStorage.getItem('user')
                    }).then(()=>{
                        console.log('success')
                    })


                }
            }


            setvalue(0)
  
        }
     

    
    
       
    

    return (
        <div>      
            
            <div className={styles.card}>
                <button className={styles.addbtn} onClick={handleadd} >+</button>
                
                <div className={styles.pname}>{props.product_name}</div>
                {/* <div>={value}</div> */}
                <input type='number' value={value} className={styles.input1} onChange={(e)=>setvalue(e.target.value)} />
                <button className={styles.subbtn} onClick={handlesubtract} >-</button>
                
                
            </div> 
            
            <Button variant="contained"  size="small" className={styles.submitbtn} onClick={addsale} startIcon={<SaveIcon />}>Save</Button>
            
            
        </div>
    )
}

export default Addsales
