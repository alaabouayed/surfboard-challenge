import { Grid } from '../Grid'

import { GridEntity } from '@src/grid/entities/GridEntity'
import { Family, Species } from '@src/grid/types/creature'

export class Creature extends GridEntity {
  constructor(
    public readonly family: Family,
    public readonly species: Species,
    protected readonly grid: Grid
  ) {
    super(grid)
  }
}
