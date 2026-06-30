import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, Button, Card],
  templateUrl: './calculator.component.html',
styleUrl: './calculator.component.scss'
})

export class Calculator{
  display: string = '0';
  previousValue: number | null = null;
  operator: string | null = null;
  waitingForNewValue: boolean = false;

  inputDigit(digit: string) {
    if(this.waitingForNewValue){
      this.display = digit;
      this.waitingForNewValue = false;
    }
    else{
      this.display = this.display === '0' ? digit : this.display + digit;
    }
  }

  inputDecimal() {
    if (this.waitingForNewValue){
      this.display = '0';
      this.waitingForNewValue = false;
      return;
    }
    if (!this.display.includes('.')){
      this.display += '.';
    }
  }

  clear(){
    this.display = '0';
    this.previousValue = null;
    this.operator = null;
    this.waitingForNewValue = false;
  }

  toggleSign() {
    this.display = (parseFloat(this.display) * -1).toString();
  }

  inputPercent() {
    this.display = (parseFloat(this.display) / 100).toString();
  }

  performOperation(nextOperator: string){
    const inputValue = parseFloat(this.display);

    if(this.previousValue === null){
      this.previousValue = inputValue;
    }
    else if(this.operator){
    const result = this.calculate(this.previousValue, inputValue, this.operator);
    this.display = String(result);
    this.previousValue = result;
    }

    this.waitingForNewValue = true;
    this.operator = nextOperator;
  }

  calculate(prev: number, current:number, op:string):number {
    switch (op) {
      case '+': return prev + current;
      case '-': return prev - current;
      case '÷': return current === 0 ? NaN : prev / current;
      default: return current;
      case '×': return prev * current;
    }
  }

  equals() {
    if (this.operator && this.previousValue !== null){
      const inputValue = parseFloat(this.display);
      const result = this.calculate(this.previousValue, inputValue, this.operator);
      this.display = String(result);
      this.previousValue = null;
      this.operator = null;
      this.waitingForNewValue = true;
    }
  }

  backspace() {
  if (this.display.length > 1) {
    this.display = this.display.slice(0, -1);
  } else {
    this.display = '0';
  }
}
  
}