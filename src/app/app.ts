import { Component } from '@angular/core';
import { Calculator } from './pages/calculator/calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Calculator],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}