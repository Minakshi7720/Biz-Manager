import axios from 'axios'
import React,{useState,useEffect} from 'react'
import styles from './invoice.module.css'
import Modal from 'react-modal'
import Productcart from './Productcart';
import Generatedinvoice from './Generatedinvoice';
import { TextField } from '@material-ui/core';




export default function Invoice() {

    const [client, setclient] = useState('')
    const [clientemail, setclientemail] = useState('')
    const [cart, setcart] = useState('')
    const [phone, setphone] = useState(0)
    const [email, setemail] = useState('')
    const [paymentmode, setpaymentmode] = useState('')
    const [cartmodal, setcartmodal] = useState(false)
    const [productdata, setproductdata] = useState([])
    const [tempinvoice, settempinvoice] = useState([])
    const [subtotal, setsubtotal] = useState(0)
    const [cartitems, setcartitems] = useState([])
    const [shopdata, setshopdata] = useState({name:"",shopname:"",shopaddress:""})
    
    

    useEffect(() => {
        
        axios.get('http://localhost:3001/receiveddata',{
            params:{user:localStorage.getItem('user')}
        })
        .then(response=>{
            const data1=response.data
            setproductdata(data1) 
            console.log(productdata) 
        })

        axios.get('http://localhost:3001/getuserdata',{
            params:{user:localStorage.getItem('user')}
        })
        .then(res=>{
            const d=res.data;
            setshopdata({name:d[0].name,shopname:d[0].shopname,shopaddress:d[0].shopaddress})
        })
    }, [])

    const generate_invoive=()=>{
        axios.post('http://localhost:3001/invoice',{
            
            cart:cart,
            phone:phone,
            email:email,
            paymentmode:paymentmode,
            user:localStorage.getItem('user'),
            client:client
        }).then(()=>{
            console.log('success')
           
        })

        axios.get('http://localhost:3001/newinvoicedata',{
            params:{user:localStorage.getItem('user'),
            client:client}
        })
        .then(response=>{
            const data1=response.data
            settempinvoice(data1)
        })
        
        axios.get('http://localhost:3001/getuserdata',{
            params:{user:localStorage.getItem('user')}
        })
        .then(response=>{
            const data1=response.data
            setshopdata(data1)
            console.log("shop",shopdata)
        })

        axios.get('http://localhost:3001/subtotal',{
            params:{user:localStorage.getItem('user'),
            client:client}
        })
        .then(response=>{
            const data1=response.data
            setsubtotal(data1[0].sum)
            console.log(subtotal)
        })


    }

    const delete_product=(to_del_id)=>{
        
        let updated_data=cartitems.filter(data_ => data_.id != to_del_id);
        console.log("clicked",updated_data)
        setcartitems(updated_data);
        findsubtotal();
        console.log(subtotal)
          
    }


    const findsubtotal=()=>{
        let s=cartitems.map(items=>items.price)
        const sum = s.reduce((partial_sum, a) => partial_sum + a, 0);
        setsubtotal(sum)

        var subf=<div className={styles.sub1}><div className={styles.sub2}>Subtotal&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{subtotal}</div><div className={styles.sub2}>Taxrate&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;4.25%</div><div className={styles.sub2}>Tax&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{subtotal*0.0425}</div><div className={styles.sub2}>Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{subtotal-(subtotal*0.0425)}</div></div>
    }
    if(subtotal>0)
    var subf=<div className={styles.sub1}><div className={styles.sub2}>Subtotal&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;${subtotal}</div><div className={styles.sub2}>Taxrate&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;4.25%</div><div className={styles.sub2}>Tax&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;${subtotal*0.0425}</div><div className={styles.sub2}>Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;${subtotal-(subtotal*0.0425)}</div></div>
    else
    var subf=<div></div>


    const printinvoice=(val)=>{
        var backup=document.body.innerHTML;
        var divcontent=document.getElementById(val).innerHTML;
        document.body.innerHTML=divcontent;
        window.print();
        document.body.innerHTML=backup;
        window.location.reload();
    }

    let today = new Date().toLocaleDateString()

    return (
        <div className={styles.desktopview}>
            
            <div className={styles.clientname}>
            <TextField id="outlined-basic" label="client name"  onChange={(event)=>setclient(event.target.value)} variant="outlined" required />
            </div>  
            <div className={styles.clientemail}>
            <TextField id="outlined-basic" label="client email"  onChange={(event)=>setclientemail(event.target.value)} variant="outlined" required />
            </div>  
                
                <div className={styles.cart}>
                    <div className={styles.tag1}>CART:  </div>

                    <button className={styles.additem} onClick={()=>setcartmodal(true)}>Add Items</button>
                    <div className={styles.cartitem}>
                {
                 cartitems.map(item=>(    //map the data 
                 <div className={styles.cartitem2}>{item.pname}&nbsp; x &nbsp;{item.quantity} <button className={styles.delbtn} onClick={()=>delete_product(item.id)}>Delete</button></div>
                 
                 ))
                }
                </div>
                </div>
                
                
                <div>
                <button onClick={findsubtotal} className={styles.calcbtn}>Calculate</button>
                <button onClick={()=>printinvoice('invoice123')}  className={styles.print}>Print</button>
                </div>
                
                
                <div >
                <Modal className={styles.cartitem} isOpen={cartmodal} onRequestClose={()=>setcartmodal(false)}  className={styles.cartmodal}  >
                {
                 productdata.map(item=>(    //map the data 
                 <Productcart key={item.product_id} product_id={item.product_id} product_name={item.product_name} product_price={item.product_price} user={item.user} cartitems={cartitems} setcartitems={setcartitems} />
                 ))
                }
                </Modal>
                </div>

                <div className={styles.invoicesection} id='invoice123'>
                    <div className={styles.i1}>INVOICE</div>
                    <div className={styles.i2}>{shopdata.shopname}</div>
                    <div className={styles.i3}>{shopdata.shopaddress}</div>
                    <div className={styles.i5}>{today}</div>
                    <div className={styles.i6}>Bill To</div>
                    <div className={styles.i4}>Name:&nbsp;{client}</div>
                    <div className={styles.i7}>Email:&nbsp;&nbsp;{clientemail}</div>



                    <table border='0' className={styles.table}>
                        <tr>
                            <td className={styles.idtable}>Id</td>
                            <td className={styles.td1}>Name</td>
                            <td className={styles.td1}>Price</td>
                            <td className={styles.td1}>Quantity</td>
                            <td className={styles.td1}>Cost</td>
                        </tr>
                    </table>

                    
                    {
                        cartitems.map(data=>(
                            <div className={styles.sub3}>
                            <Generatedinvoice key={data.id} product_id={data.id} pname={data.pname} quantity={data.quantity} price={data.price} amount={data.amount} />
                            </div>
                        ))
                    }
                    

                    

                    {subf}
                    

                </div>

                
 
        </div>
    )
}
