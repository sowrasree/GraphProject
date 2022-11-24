import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { NgForm } from '@angular/forms';
import { PointXYModel } from '../pointXY.model';
import { format } from 'path';



@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  public chart: any;
  data_pxy: PointXYModel[]=[
    new PointXYModel(new Date('2010-01-04'), 17558.73),
    new PointXYModel(new Date('2010-01-05'), 17686.24),
    new PointXYModel(new Date('2010-01-06'), 17701.13),
    new PointXYModel(new Date('2010-01-07'), 17615.72),
    new PointXYModel(new Date('2010-01-08'), 17540.29),
    new PointXYModel(new Date('2010-01-11'), 17526.71)  
  ];
  public sorted_data_x: string[] = [];
  public sorted_data_y: number[] = [];

  ngOnInit(): void {
    this.sort_data();
    this.createChart();
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.sorted_data_x,
               
                   
	       datasets: [
          {
            label: "Index",
            data: this.sorted_data_y,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio:4.0
      }
      
    });
  }

  sort_data() {
    let sorted_data_pxy = [];

    this.sorted_data_x = [];
    this.sorted_data_y = [];

    sorted_data_pxy = this.data_pxy.sort(function(a: PointXYModel, b: PointXYModel){
      console.log(a,b);
      return (a.x.getTime() - b.x.getTime());
    })
    console.log(sorted_data_pxy);
    sorted_data_pxy.forEach(point =>{
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

  // onReset(form: NgForm){
  //   form.reset();

  // }

}
