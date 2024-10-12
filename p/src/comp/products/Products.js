import React, { useState, useContext,useEffect } from 'react'
import styles from './product.module.css'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup';                                                   // install these packages for form validation 
import Textfield from './BoxUi.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';











export default function Products(props) {

    const initialValues = {
        ID: "",
        productName: "",
        productPrice: "",
        profitperitem:"",
        stock: ""
    };

    const validationSchema = yup.object().shape({
        ID: yup.number().required("*This is a required field"),
        productName: yup.string().required("*This is a required field"),
        productPrice: yup.number().required("*This is a required field"),
        profitperitem: yup.number().required("*This is a required field"),
        stock: yup.number().required().positive().required("*This is a required field"),
    });

    const [newid, setnewid] = useState(0)
    const [newname, setnewname] = useState('')
    const [newprice, setnewprice] = useState(0)
    const [newquantity, setnewquantity] = useState(0)
    



    const handlechangeid = (event) => {
        event.preventDefault();
        setnewid(event.target.value)

    }
    const handlechangename = (event) => {
        setnewname(event.target.value)

    }
    const handlechangeprice = (event) => {
        setnewprice(event.target.value)

    }
    const handlechangequan = (event) => {
        setnewquantity(event.target.value)

    }

    const submithandle = (event) => {
        //  event.preventDefault()

        tobackend();

        // setvalue("")

    };


    // lol


    const tobackend = (data) => {

        axios.post('http://localhost:3001/sentdata', {
            user: localStorage.getItem('user'),
            id: data.ID,
            pname: data.productName,
            price: data.productPrice,
            profitperitem:data.profitperitem,
            quantity: data.stock
        }).then(() => {
            console.log('success')
            alert(''+data.productName+',Added')
            window.location.reload(false)
            
        })
    }

 


    return (
        <div className={styles.desktopview}>
            <Formik initialValues={initialValues} onSubmit={tobackend} validationSchema={validationSchema}>
                <Form className={styles.form} >
                    <div className={styles.tag1}>Add New Product</div>
                    <p>

                    </p>
                    <Textfield  type="number" name='ID' placeholder='Enter Product ID' label='Product ID' className={styles.inputbox} />
                    <p>

                    </p>
                    <Textfield  type="text" name='productName' placeholder='Enter Product Name...' label='Product Name' className={styles.inputbox} />
                    <p>

                    </p>
                    <Textfield  type="number" name='productPrice' placeholder='Enter Product Price...' label='Price' className={styles.inputbox}/>
                    <p>
                    
                    </p>
                    <Textfield  type="number" name='profitperitem' placeholder='Enter Profit per item...' label='Profit per item' className={styles.inputbox}/>
                    <p>

                    </p>
                    <Textfield  type="number" name='stock' placeholder='Enter Stock...' label='Stock' className={styles.inputbox} />
                    <p>

                    </p>
                    <button type='submit'  className={styles.submit} >Submit</button>

                    <button onClick={props.home} className={styles.back}><ArrowBackIcon /></button>
                </Form>
            </Formik>
            {/* <button onClick={props.home} className={styles.back}>back</button> */}




        </div>


    )





}
