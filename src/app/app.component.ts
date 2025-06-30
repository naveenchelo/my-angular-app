import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  jobName = 'Example Jenkins Job';
  status: 'SUCCESS' | 'FAILURE' | 'RUNNING' = 'SUCCESS';
  lastBuild = 42;
  lastStatus = 'SUCCESS';
  message = '';

  triggerBuild() {
    // Simulate triggering a build
    this.status = 'RUNNING';
    this.message = 'Build triggered!';
    setTimeout(() => {
      this.status = Math.random() > 0.5 ? 'SUCCESS' : 'FAILURE';
      this.lastBuild++;
      this.lastStatus = this.status;
      this.message = 'Build finished: ' + this.status;
    }, 2000);
  }
}
