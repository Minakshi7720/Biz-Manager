import React from 'react'
import styles from './action.module.css'

export default function Top_product(props) {
    return (
        <div>
            <div>
                <div className={styles.top}>{props.pname}</div>
            </div>


        </div>
    )
}
