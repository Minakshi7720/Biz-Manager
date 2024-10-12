import React,{Component} from 'react'
import {Line} from 'react-chartjs-2'
import axios from 'axios'
import moment from 'moment'

export default class ApexChart extends Component {

  constructor(){
    super();
    this.state={
        date:[],
        growth:[],
        login:true,
    };
   
    
    
}


  componentDidMount(){                 //get data from backend
    
    axios.get(`http://localhost:3001/dailyprofit`,{
      params:{user:localStorage.getItem('user'),
      filter:false}
    })
      .then(res => {
        const data1 = res.data;
        this.setState({date:data1.map(a => a.date)})
        this.setState({growth:data1.map(a => a.growth_percentage)})
        var formatdate = this.state.date.map((date) => {
          return moment(moment(date)).format('DD-MM-YYYY');      
        });
        this.setState({date:formatdate})
        console.log("daily profit",this.state.growth)
      })
    }

  

    render() {
      const data = {
        labels: this.state.date,
        datasets: [
          {
            label: 'growth',
            data: this.state.growth,
            fill: false,
            backgroundColor: 'red',
            borderColor: 'red',
            
          },
        ],
      };
      
      const options = {
        scales: {
          y: {
            beginAtZero: true
          }
        },

        maintainAspectRatio:true,
      };
      return (
        <Line data={data} options={options} height={65} />
        
      )
    }
}