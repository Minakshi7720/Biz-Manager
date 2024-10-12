import React,{Component} from 'react'
import {Chart, Line} from 'react-chartjs-2'
import axios from 'axios'
import moment from 'moment'

export default class ApexChart extends Component {

  constructor(){
    super();
    this.state={
        date:[],
        profit:[],
        profit2:[],
        profit3:[],
        label:[],
        topproduct:[],
        login:true,
    };
   
    
    
}


  componentDidMount(){                 //get data from backend
    

      axios.get(`http://localhost:3001/top_product`,{
             params:{user:localStorage.getItem('user')}
           })
          .then(res => {
            const data1 = res.data;
            this.setState({topproduct:data1})
            console.log('topp',this.state.topproduct[0].product_id)

                      axios.get(`http://localhost:3001/chart5`,{
                      params:{user:localStorage.getItem('user'),
                      p1:this.state.topproduct[0].product_id,
                      p2:this.state.topproduct[1].product_id,
                      p3:this.state.topproduct[2].product_id,
                    }
                    })
                  .then(res => {
                    const data2 = res.data;
                    
                    this.setState({label:data2.map(a => a.date)})
                    var formatdate = this.state.label.map((date) => {
                      return moment(moment(date)).format('DD-MM-YYYY');      
                    });
                    this.setState({label:formatdate})

                    this.setState({profit:data2.map(a => a.p1)})
                    this.setState({profit2:data2.map(a => a.p2)})
                    this.setState({profit3:data2.map(a => a.p3)})
                    console.log('profit2',this.state.topproduct[0].product_name)
                  })


          })

      


    }

   

    render() {
    

      const data = {
        labels: this.state.label,
        datasets: [
          {
            label: "1st",
            data: this.state.profit,
            fill: false,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: 'red',
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            fill: true
          },
          {
            label: '2nd',
            data: this.state.profit2,
            fill: false,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: 'green',
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            fill: true
          },
          {
            label: '3rd',
            data: this.state.profit3,
            fill: false,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: 'blue',
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            fill: true
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
        <Line data={data} options={options}  height={65}  />
        
      )
    }
}