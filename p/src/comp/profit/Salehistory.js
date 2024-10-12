import React from 'react'
import styles from './profit.module.css'
import moment from 'moment'

function Profit(props) {
    
   
     
    return (
        <div>      
            
            <div className={styles.box1}>
                <div className={styles.box2}>{moment(props.date).format('MMMM D, YYYY')}</div>
                <div className={styles.flex2}>
                <div className={styles.box3}>{props.product_name}</div>
                <div className={styles.box3}>{props.quantity}</div>
                </div>

            </div>
            
            
            
        </div>
    )
}

export default Profit
