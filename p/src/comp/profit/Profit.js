import React from 'react'
import styles from './profit.module.css'
import moment from 'moment'

function Profit(props) {
    
    
   if(props.growth<=0)
   var growth1=<div className={styles.box3r}>&darr;{props.growth}%</div>
   else
   var growth2=<div className={styles.box3g}>&uarr;{props.growth}%</div>
   
   
     
    return (
        <div>      
            
            <div className={styles.box1}>
                <div className={styles.box2}>{moment(props.date).format('MMMM D, YYYY')}</div>
                <div className={styles.flex2}>
                <div className={styles.box3}>$ {props.profit}</div>
                {growth1}
                {growth2}
                </div>

            </div>
            
            
            
        </div>
    )
}

export default Profit
