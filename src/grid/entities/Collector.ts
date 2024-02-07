import { Creature } from '@src/grid/entities/Creature'
import { GridEntity } from '@src/grid/entities/GridEntity'
import { greenTick, redCross } from '@src/utils/constants'
import { NoNearbyCreatureError } from '@src/utils/errors'

export class Collector extends GridEntity {
  public collectedCreatures: Creature[] = []

  public attemptCreatureCollectionAndMove(): void {
    try {
      this.collectRandomNearbyCreature()

      console.log(
        `${greenTick} — Creature ${this.id} found and collected. Collector moved to ${this.position.x}, ${this.position.y}.`
      )
    } catch (error) {
      if (error instanceof NoNearbyCreatureError) {
        console.log(
          `${redCross} — No nearby creatures to collect. Collector moved to ${this.position.x}, ${this.position.y}.`
        )
        return
      }
      console.error(error)
    } finally {
      this.move()
    }
  }

  private collectRandomNearbyCreature(): void {
    const nearbyCreature = this.grid.getRandomNearbyCreature(this.position)
    if (!nearbyCreature) throw new NoNearbyCreatureError()

    this.collectedCreatures.push(nearbyCreature)
    this.grid.removeCreatureFromGrid(nearbyCreature)
  }
}
