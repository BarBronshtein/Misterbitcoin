import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType, ChartOptions } from 'chart.js';
@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  constructor() {}
  @Input() lineChartOptions: any;
  @Input() lineChartData: any;
  @Input() lineChartLabels: any;
  @Input() lineChartLegend: any;
  @Input() lineChartType: any;
  @Input() lineChartPlugins: any;
}
