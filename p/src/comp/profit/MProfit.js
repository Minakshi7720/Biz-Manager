import React from 'react'
import styles from './profit.module.css'
import moment from 'moment'

function MProfit(props) {

    if(props.month==1)
    var mon=<a>Jan</a>
    else if(props.month==2)
    var mon=<a>Feb</a>
    else if(props.month==3)
    var mon=<a>March</a>
    else if(props.month==4)
    var mon=<a>April</a>
    else if(props.month==5)
    var mon=<a>May</a>
    else if(props.month==6)
    var mon=<a>June</a>
    else if(props.month==7)
    var mon=<a>July</a>
    else if(props.month==8)
    var mon=<a>Aug</a>
    else if(props.month==9)
    var mon=<a>Sept</a>
    else if(props.month==10)
    var mon=<a>Oct</a>
    else if(props.month==11)
    var mon=<a>Nov</a>
    else if(props.month==12)
    var mon=<a>Dec</a>
   
    return (
        <div>      
            
            <div className={styles.box1}>
                <div className={styles.box2}>{mon}</div>
                <div className={styles.flex2}>
                <div className={styles.box3}>$ {props.avg}</div>
                </div>

            </div>
            
            
            
        </div>
    )
}

export default MProfit
