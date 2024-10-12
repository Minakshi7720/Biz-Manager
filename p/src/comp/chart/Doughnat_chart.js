import React,{Component} from 'react'
import {Doughnut} from 'react-chartjs-2'
import axios from 'axios'
import moment from 'moment'
import styles from './charts.module.css'
export default class ApexChart extends Component {
  constructor(){
    super();
    this.state={
        pname:[],
        sum:[],
        login:true,
    };
   
    
    
}
componentDidMount()
{
  
  axios.get(`http://localhost:3001/product_profit`,{
    params:{user:localStorage.getItem('user')}
  })
        .then(res => {
          const data1 = res.data;
          this.setState({pname:data1.map(a => a.product_name)})
          this.setState({sum:data1.map(a => a.sum)})
         
        })
}



 handleHover(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
    colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
  });
  legend.chart.update();
}

 handleLeave(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
    colors[index] = color.length === 9 ? color.slice(0, -2) : color;
  });
  legend.chart.update();
}

    render() {
      const state = {
        labels: this.state.pname,
       
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
           data: this.state.sum
         }
       ]
     }

     const options={
      
      legend:{
        display:true,
        position:'right'
      }
    }
  
      return (
        <div className={styles.doughnutchart}><Doughnut   data={state} options={options} /></div>
        
      )
    }
}