import React from 'react'
import styles from './invoice.module.css'

export default function Generatedinvoice(props) {
    return (
        <div>
            <table border='0' className={styles.table2}>
            <tr>
                <td className={styles.idtable}>{props.product_id}</td>
                <td>{props.pname}</td>
                <td>{props.price}</td>
                <td>{props.quantity}</td>
                <td>${props.price*props.quantity}</td>
            </tr>
            </table>
            
        </div>
    )
}
