import {Component, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Grid} from './Models/Grid/grid';
import {ShapeService} from './Services/shape.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  ctx: CanvasRenderingContext2D;
  grid: Grid;
  delayBetweenFrames: number;
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;

  constructor(public shapeService: ShapeService) {
    this.delayBetweenFrames = 256;
  }

  @ViewChild('myCanvas') myCanvas: ElementRef;

  // ngAfterViewInit is called only after the view did load and the canvas is ready
  ngAfterViewInit() {
    this.ctx = this.myCanvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = '#006a61';
    this.switchShapeTapped(this.shapeService.shapeType.random);
  }

  // start is a function which loops by custom frames
  start() {
    this.clearGridFromCanvas();
    this.drawGridOnCanvas();
    this.grid = this.updateGridWithGameRules();
    setTimeout(() => {
      this.start();
    }, this.delayBetweenFrames);
  }

  clearGridFromCanvas() {
    this.ctx.clearRect(0, 0, this.grid.getColumn, this.grid.getRows);
  }

  drawGridOnCanvas() {
    let liveCount = 0;
    for (let column = 1; column < this.grid.getColumn; column++) { // iterate through columns
      for (let row = 1; row < this.grid.getRows; row++) { // iterate through rows
        if (this.grid[column][row] === 1) {
          this.ctx.fillRect(column, row, 1, 1);
          liveCount++;

        }
      }
    }
  }

  updateGridWithGameRules() {
    const copyGrid = new Grid(this.grid.getRows, this.grid.getColumn);
    for (let column = 1; column < this.grid.getColumn - 1; column++) {
      for (let row = 1; row < this.grid.getRows - 1; row++) {

        const totalCells = this.grid.checkSurroundingsCells(row, column);
        // apply the rules to each cell:
        // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
        // Any live cell with two or three live neighbours lives on to the next generation.
        // Any live cell with more than three live neighbours dies, as if by overpopulation.
        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        switch (totalCells) {
          case 2:
            copyGrid[column][row] = this.grid[column][row];

            break;
          case 3:
            copyGrid[column][row] = 1;

            break;
          default:
            copyGrid[column][row] = 0;
        }
      }
    }
    return copyGrid;
  }

  // UIButtons
  // When user press on one of the shapes this function is called and
  // passing by the chosen type to the shapeService which implement the
  // shape inside the grid automatically for us
  switchShapeTapped(type) {
    this.grid = null;
    // I think this (400 hardcoded) is more readable in less code than
    // declare a variable because we use it only once


    this.grid = new Grid(this.windowHeight, this.windowWidth);
    this.shapeService.initShapeType(type, this.grid);
    this.start();
  }
}
