import React from 'react'
import Header from './comp/header/Header'
import Action from './comp/actions/Action'
import Particle from './Particle'
import styles from './project.module.css'

export default function Project(props) {
    return (
        <div>
            <Header loginstat={props.loginstat} setloginstat={props.setloginstat} />
            <div className={styles.action}><Action /></div>
            {/* <div className={styles.particle} ><Particle /></div> */}
        </div>
    )
}
