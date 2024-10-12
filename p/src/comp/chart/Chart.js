import React from 'react';
import {Bar,Doughnut} from 'react-chartjs-2';
import axios from 'axios'
import styles from './charts.module.css'
import Line from './Linechart'
import LineG from './LinechartG'
import LineT from './LinechartT'
import DoughnutC from './Doughnat_chart'


export default class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
    sale_count_data:[],
    login:true,

    };
  };

  componentDidMount()
  {
    
    axios.get(`http://localhost:3001/get_weekday_data`,{
      params:{user:localStorage.getItem('user')}
    })
          .then(res => {
            const week_data = res.data;
            
            const test=week_data[0]
            this.setState({sale_count_data:Object.values(test)})
            
          })
  }



  render() {
    
    const state = {
      labels: ['Sun', 'Mon', 'Tue','Wed', 'Thu','Fri','Sat'],
     
     datasets: [
       {
         label: 'sale count',
         backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 59, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 59, 64, 1)',
        ],
         borderWidth: 1,
         data: this.state.sale_count_data
       }
     ]
   }

  
    return (
      <div className={styles.desktopview}>

        <div className={styles.doughnutchartbox}>
        <div className={styles.doughnutchart}><DoughnutC login_status={this.props.login_status}  /></div>
          <div className={styles.tag}>Profit by each product</div>
        </div>

        <div className={styles.curvedlinebox3}>
          <div className={styles.curvedlinechart3}>
            <div className={styles.contain}>
            <LineT login_status={this.props.login_status} className={styles.ll}  />
          </div>
          </div>
          <div className={styles.tag3}>Top products changes</div>
        </div>


        <div className={styles.barchartbox}>
        <div className={styles.barchart}><Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        /></div>
        <div className={styles.tag}>Avg sale on weekdays</div>
        </div>


        

        <div className={styles.curvedlinebox}>
          <div className={styles.curvedlinechart}>
            <div className={styles.contain}>
            <Line login_status={this.props.login_status} className={styles.ll}  />
          </div>
          </div>
          <div className={styles.tag}>Daily profit change</div>
        </div>
        <div className={styles.curvedlinebox2}>
          <div className={styles.curvedlinechart}>
          <div className={styles.contain}>
            <LineG login_status={this.props.login_status} />
          </div>
          </div>
          <div className={styles.tag}>Daily growth change</div>
        </div>

        

      
      </div>
    );
  }
}