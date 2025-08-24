import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GithubUserDetail } from '../interfaces/github.interface';

Chart.register(...registerables);

@Injectable({
  providedIn: 'root'
})
export class FollowersChartService {
  private chart: Chart | null = null;

  render(canvas: HTMLCanvasElement, users: GithubUserDetail[], page: number) {
    const labels = users.map(u => u.login);
    const data = users.map(u => u.followers ?? 0);

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Followers',
          data,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 300 },
        scales: {
          x: {
            ticks: { autoSkip: false, maxRotation: 45, minRotation: 0 }
          },
          y: {
            beginAtZero: true,
            suggestedMin: 0
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
          title: {
            display: true,
            text: `Followers (página ${page})`
          }
        }
      }
    });
  }
}
