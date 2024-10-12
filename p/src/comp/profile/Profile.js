import React,{useEffect,useState} from 'react'
import styles from './profile.module.css'
import axios from 'axios'
import icon from '../../assets/profile.png'


export default function Profile() {

    const [profiledata, setprofiledata] = useState({name:"",username:"",password:"",shopname:"",shopaddress:""})
    const [nname, setnname] = useState("")
    const [nusername, setnusername] = useState("")
    const [npassword, setnpassword] = useState("")
    const [nshopname, setnshopname] = useState("")
    const [nshopaddress, setnshopaddress] = useState("")
    const [disable, setdisable] = useState(true)




    useEffect(() => {
        axios.post('http://localhost:3001/profile', {
            username: localStorage.getItem('user')
            
        }).then((response) => {
            const data1=response.data
            setprofiledata({name:data1[0].name,username:data1[0].username,password:data1[0].password,shopname:data1[0].shopname,shopaddress:data1[0].shopaddress})
            setnname(data1[0].name)
            setnusername(data1[0].username)
            setnpassword(data1[0].password)
            setnshopname(data1[0].shopname)
            setnshopaddress(data1[0].shopaddress)
        })
        
    }, [])

    const submitnewprofile=()=>{
        
        axios.post('http://localhost:3001/newprofile', {
            username: localStorage.getItem('user'),
            name:nname,
            newusername:nusername,
            password:npassword,
            shopname:nshopname,
            shopaddress:nshopaddress
            
        }).then((response) => {
            alert('Profile updated')
            console.log('success')
            
        })
    }

    const editopen=()=>{
        setdisable(false)
    }

    const editclose=()=>{
        setdisable(true)
    }
    return (
        <div className={styles.desktopview}>
            <h1>Profile</h1>
            <img src={icon}></img>
            <div className={styles.details}>
                <tr><td className={styles.tag1}>name:</td><td><input placeholder={profiledata.name} className={styles.inputbox} onChange={(e)=>setnname(e.target.value)} disabled={disable}></input></td></tr>
                <tr><td className={styles.tag1}>password:</td><td className={styles.up}><input className={styles.inputbox} placeholder={profiledata.password} onChange={(e)=>setnpassword(e.target.value)} disabled={disable}></input></td></tr>
                <tr><td className={styles.tag1}>username:</td><td className={styles.up}><input className={styles.inputbox} placeholder={profiledata.username} onChange={(e)=>setnusername(e.target.value)} disabled={true}></input></td></tr>
                <tr><td className={styles.tag1}>shopname:</td><td><input className={styles.inputbox} placeholder={profiledata.shopname} onChange={(e)=>setnshopname(e.target.value)} disabled={disable}></input></td></tr>
                <tr><td className={styles.tag1}>shopaddress:</td><td><input className={styles.inputbox} placeholder={profiledata.shopaddress} onChange={(e)=>setnshopaddress(e.target.value)} disabled={disable}></input></td></tr>
            </div>
            
            
            <div>
            {disable?<button className={styles.btn1} onClick={editopen} >Edit</button>:<button className={styles.btn1} onClick={editclose} >Close</button>}
            {disable?'':<button className={styles.btn2} onClick={submitnewprofile} >Submit</button>}
            </div>
        </div>
    )
}
