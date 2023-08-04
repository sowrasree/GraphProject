import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { NgForm } from '@angular/forms';
import { PointXYModel } from '../pointXY.model';
import { format } from 'path';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit {

  constructor() { }

  public chart: any;
  data_pxy: PointXYModel[]=[
    new PointXYModel(new Date('2010-01-04'), 15558.73),
    new PointXYModel(new Date('2010-01-05'), 17686.24),
    new PointXYModel(new Date('2010-01-06'), 14701.13),
    new PointXYModel(new Date('2010-01-07'), 13615.72),
    new PointXYModel(new Date('2010-01-08'), 12540.29),
    new PointXYModel(new Date('2010-01-11'), 11526.71)  
  ];
  
  public sorted_data_x: string[] = [];
  public sorted_data_y: number[] = [];
  public  sorted_data_pxy :any []= [];


  ngOnInit(): void {
    this.sort_data();
    this.createChart();
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.sorted_data_x,
               
                   
	       datasets: [
          {
            label: "Index",
            data: this.sorted_data_y,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)'
            ],
            barThickness: 100,
          }
        ]
      },
      options: {
        aspectRatio:4.0
      }
      
    });
  }

  sort_data() {

    this.sorted_data_x = [];
    this.sorted_data_y = [];

    this.sorted_data_pxy = this.data_pxy.sort(function(a: PointXYModel, b: PointXYModel){
      console.log(a,b);
      return (a.x.getTime() - b.x.getTime());
    })
    console.log(this.sorted_data_pxy);
    this.sorted_data_pxy.forEach(point =>{
      this.sorted_data_x.push(point.x.toISOString());
      this.sorted_data_y.push(point.y);
      
    })

    console.log(this.sorted_data_x, this.sorted_data_y);
  }

  onSubmit(form: NgForm){

    const date = form.value.date;
    const sensex_index = form.value.sensex_index;
    console.log(date, sensex_index);
    
    var pointXY = new PointXYModel(new Date(date), sensex_index);
    this.data_pxy.push(pointXY);

    this.sort_data();

    this.chart.data.labels = this.sorted_data_x;
    this.chart.data.datasets[0].data = this.sorted_data_y;
    this.chart.update();

  }

  onReset(){
    // this.chart.data.labels = this.data_pxy;
    // this.chart.data.datasets[0].data = this.data_pxy;
    // ResetFormVal.form.reset()

    // console.log(this.data_pxy);

  }

}
