import { v4 } from 'uuid'

import { Grid } from '@src/grid/Grid'
import { GridPositionService } from '@src/grid/services/GridPositionService'

export class GridEntity {
  public readonly id: string
  public position: { x: number; y: number }

  protected readonly gridPositionService: GridPositionService

  constructor(protected readonly grid: Grid) {
    this.gridPositionService = new GridPositionService(grid)
    this.id = v4()
    this.setRandomGridPosition()
  }

  public move(): void {
    this.setRandomGridPosition()
  }

  private setRandomGridPosition(): void {
    this.position = this.gridPositionService.generateRandomGridPosition()
  }
}
