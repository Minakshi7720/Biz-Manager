import React, { useState, useContext, useEffect } from 'react'
import styles from './header.module.css'
//import Navigation from './navigation/Navigation'
import Modal from 'react-modal'
//import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup';                                      // install these packages for form validation
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import Textfield from './MaterialUi/index';
import MenuBookIcon from '@mui/icons-material/MenuBook';

let userdata = {};
let userNameCheck = [];

export default function Login(props) {

    const [Value1, setValue1] = React.useState('1');
    const [value, setvalue] = useState(null)
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    function getFields(input, field) {
        var output = [];
        for (var i = 0; i < input.length; ++i)
            output.push(input[i][field]);
        return output;
    }
    const initialValues = {
        name: "",
        username: "",
        password: "",
        cpassword: "",
        shopname: "",
        address: ""
    };
    axios.get(`http://localhost:3001/getuserdata`)
        .then((response) => {
            userdata = response.data;

        });
    userNameCheck = getFields(userdata, "username");

    const validationSchema = yup.object().shape({
        name: yup.string().required("*This is a required field"),
        username: yup.string().required("*This is a required field").notOneOf(userNameCheck, 'Username taken'),
        password: yup.string().min(8, "Password should be strong").required("*This is a required field"),
        cpassword: yup.string().required("*This is a required field")
            .test('passwords-match', 'Passwords must match', function (value) {
                return this.parent.password === value
            }),
        shopname: yup.string().required("*This is a required field"),
        address: yup.string().required("*This is a required field")
    });

    const handleChange = (event, newValue) => {
        setValue1(newValue);
    };

    const avatarStyle = { backgroundColor: 'green' };
    const avatarStyle2 = { backgroundColor: 'purple' };

    const submitlogin = () => {

        axios.post('http://localhost:3001/login', {
            username: username,
            password: password
        }).then((response) => {

            if (response.data.message === 'no') {
                console.log("wrong credentials")
                alert("wrong credentials")
                localStorage.setItem('isloggedin', 'false')
                localStorage.setItem('user', null)
            }
            else if (response.data.message === 'yes') {
                console.log("correct credentials")
                localStorage.setItem('isloggedin', 'true')
                localStorage.setItem('user', username)
                props.setloginstat('true')
            }
        })

    }

    const submitregform = (data) => {
        console.log(data);
        axios.post('http://localhost:3001/registeruser', {

            name: data.name,
            username: data.username,
            password: data.password,
            shopname: data.shopname,
            address: data.address
        }).then((res) => {
            if(res.data=='error')
            alert('error') 
            else if(res.data=='noerror')
            {
              console.log('success')
            alert(data.name + ', User Registered Successfully ! ')  
            }
            

        })
        
    }
    return (
        <div>
            <Modal isOpen={true}  className={styles.modalbk}>
                <div >
                <TabContext value={Value1}>
                    <div className={styles.tabs}>
                        <Tabs onChange={handleChange} >
                            <Tab label="Login" value="1" />
                            <Tab label="Register" value="2" />
                        </Tabs>
                    </div>
                    <div className={styles.panel}>
                        <TabPanel value="1">
                            <div className={styles.signin}>
                                <Grid align='center'>
                                    <Avatar style={avatarStyle}><LockOpenIcon /></Avatar>

                                    <h2>SIGN IN</h2>
                                </Grid>
                                <TextField value={value} label='Username' placeholder='Username' type="text" onChange={(event) => setusername(event.target.value)} variant='outlined' fullwidth required ></TextField>
                                <p>

                                </p>
                                <TextField value={value} label='Password' placeholder='Password' type="password" onChange={(event) => setpassword(event.target.value)} variant='outlined' fullwidth required ></TextField>
                                <p>

                                </p>
                                <div type='submit' className={styles.sub}  onClick={submitlogin}  >  Sign In </div>
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <div className={styles.registration}>
                                <Formik initialValues={initialValues} onSubmit={submitregform}  validationSchema={validationSchema} validateOnChange={false}>
                                    <Grid container placing={2}>

                                        <Form >
                                            <Grid align='center'>
                                                <Avatar style={avatarStyle2}><MenuBookIcon /></Avatar>

                                                <h2>SIGN UP! </h2>
                                                <Textfield type="text" value={value} name='name' placeholder='Enter your Name' label='Name' />
                                                <p>

                                                </p>
                                                <Textfield type="text" value={value} name='username' placeholder='Username' label='Username' />
                                                <p>

                                                </p>
                                                <Textfield type="password" value={value} name='password' placeholder='Password' label='Password' />
                                                <p>

                                                </p>
                                                <Textfield type="password" value={value} name='cpassword' placeholder='Confirm Password' label='Confirm Password' />
                                                <p>

                                                </p>
                                                <Textfield type="text" value={value} name='shopname' placeholder='Enter your Shop Name' label='Shop Name' />
                                                <p>

                                                </p>
                                                <Textfield type="text" value={value} name='address' placeholder='Enter your Shop Address' label='Shop Address' />
                                                <p>

                                                </p>
                                                <button type='submit' className={styles.sub}  >Register </button>
                                            </Grid>
                                        </Form>
                                    </Grid>
                                </Formik>
                            </div>
                        </TabPanel>
                    </div>
                </TabContext>
                </div>
            </Modal>
        </div>
    )
}
