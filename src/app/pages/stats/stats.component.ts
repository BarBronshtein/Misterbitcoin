import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { BitcoinService } from 'src/app/services/bitcoin.service';
@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit, OnDestroy {
  data: any;
  subscription!: Subscription;
  secondSubscription!: Subscription;

  constructor(private bitconService: BitcoinService) {}

  lineChartLabels = this.last5Months;
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  lineChartPlugins = [];
  ngOnInit(): void {
    this.getData();
    console.log(this.lineChartColors, this.lineChartData);
  }

  getData() {
    this.subscription = this.bitconService
      .getConfirmedTransactions()
      .subscribe((y) => {
        this.lineChartData.datasets[0].data = y;
      });
    this.secondSubscription = this.bitconService
      .getMarketPrice()
      .subscribe((data) => {
        this.lineChartDataSecond.datasets[0].data = data;
      });
  }

  get last5Months() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const time = new Date();
    return (function lastMonths(n) {
      const arr: string[] = [];
      for (let i = 0; i < n; i++) {
        arr.unshift(months[time.getMonth() - i]);
      }
      return arr;
    })(5);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.secondSubscription.unsubscribe();
  }
  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Transaction Rate',
        backgroundColor: 'rgba(11,88,224,0.3)',
        borderColor: 'rgba(0,0,0,1)',
        pointBackgroundColor: 'rgba(213,117,77,1)',
        pointBorderColor: '#fefefe',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(213,117,77,0.8)',
        fill: 'origin',
      },
    ],
    labels: this.last5Months,
  };
  lineChartDataSecond: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Bitcoin Market Price',
        backgroundColor: 'rgba(171,88,151,0.2)',
        borderColor: 'rgb(122,33,33)',
        pointBackgroundColor: 'rgba(213,117,77,1)',
        pointBorderColor: '#fefefe',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(213,117,77,0.8)',
        fill: 'origin',
      },
    ],
    labels: this.last5Months,
  };
}
