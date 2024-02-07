import { Grid } from '@src/grid/Grid'

export class GridPositionService {
  private readonly grid: Grid

  constructor(grid: Grid) {
    this.grid = grid
  }

  public generateRandomGridPosition(): { x: number; y: number } {
    const cellX = Math.floor(Math.random() * 100)
    const cellY = Math.floor(Math.random() * 100)

    return { x: cellX * this.grid.cellSize, y: cellY * this.grid.cellSize }
  }
}
