import { Grid } from '@src/grid/Grid'
import { Collector } from '@src/grid/entities/Collector'
import { Creature } from '@src/grid/entities/Creature'
import { plurialise } from '@src/utils'
import { CELL_SIZE, GRID_SIZE_IN_CELLS } from '@src/utils/constants'
import { creatureData } from '@src/utils/creatureData'

function playGame() {
  const grid = new Grid(GRID_SIZE_IN_CELLS, CELL_SIZE)
  const creatures = creatureData.map(c => new Creature(c.family, c.species, grid))
  grid.placeCreaturesOnGrid(creatures)

  const collector = new Collector(grid)

  const numberOfTurns = 10
  for (let i = 0; i < numberOfTurns; i++) {
    collector.attemptCreatureCollectionAndMove()
  }

  const collectedCreaturesCount = collector.collectedCreatures.length
  console.log(
    `\n💥 ${collectedCreaturesCount} ${plurialise('creature', collectedCreaturesCount)} collected\n`
  )
}

playGame()
