import React, { useState, useContext, useEffect } from 'react'
import styles from './header.module.css'
import icon1 from '../../assets/store.png'



  
export default function Header(props) {
    

    const signout = () => {
        localStorage.setItem('isloggedin','false')
        localStorage.setItem('user','null')
        props.setloginstat(false)
    }



    if (props.loginstat === 'true') {
        var logout = <button className={styles.signout} onClick={() => signout()}>Logout</button>
    }



 
    

    return (
        <div className={styles.desktopview}>
            <div className={styles.header}>
                <img alt='img' src={icon1} className={styles.img1} />
                <div className={styles.tag} >BIZ MANAGER</div>
                {logout}
            </div>
            

            

        </div>
    )
}
