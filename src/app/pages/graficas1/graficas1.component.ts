import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  public doughnutChartLabels1: Label[] = ['Download Sales1', 'In-Store Sales1', 'Mail-Order Sales1'];
  public doughnutChartLabels2: Label[] = ['Download Sales2', 'In-Store Sales2', 'Mail-Order Sales2'];
  public doughnutChartLabels3: Label[] = ['Download Sales3', 'In-Store Sales3', 'Mail-Order Sales3'];
  public doughnutChartLabels4: Label[] = ['Download Sales4', 'In-Store Sales4', 'Mail-Order Sales4'];

  public doughnutChartData1: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];

  public doughnutChartData2: MultiDataSet = [
    [35, 4, 100],
    [50, 10, 10],
    [20, 30, 70],
  ];

  public doughnutChartData3: MultiDataSet = [
    [45, 67, 56],
    [50, 345, 32],
    [122, 130, 14],
  ];

  public doughnutChartData4: MultiDataSet = [
    [30, 40, 10],
    [50, 10, 10],
    [20, 10, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
