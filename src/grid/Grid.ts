import { CreatureNotFoundError } from '../utils/errors'

import { Creature } from '@src/grid/entities/Creature'

type CellKey = `${number},${number}`

export class Grid {
  public readonly size: number
  public readonly cellSize: number
  public readonly grid: Map<CellKey, Creature[]> = new Map()

  constructor(size: number, cellSize: number) {
    this.size = size
    this.cellSize = cellSize
  }

  public placeCreaturesOnGrid(creatures: Creature[]): void {
    creatures.forEach(creature => this.placeCreatureOnGrid(creature))
  }

  public getRandomNearbyCreature(position: { x: number; y: number }): Creature | undefined {
    const nearbyCreatures = this.listNearbyCreatures(position)
    const randomCreatureIndex = Math.floor(Math.random() * nearbyCreatures.length)
    return nearbyCreatures[randomCreatureIndex]
  }

  public removeCreatureFromGrid(creature: Creature): void {
    const key = this.positionToCellKey(creature.position)
    const cellCreatures = this.grid.get(key)
    if (!cellCreatures || cellCreatures?.length === 0) throw new CreatureNotFoundError()

    const creatureIndex = cellCreatures.findIndex(c => c.id === creature.id)
    if (creatureIndex === -1) throw new CreatureNotFoundError()

    cellCreatures.splice(creatureIndex, 1)
  }

  private placeCreatureOnGrid(creature: Creature): void {
    const key = this.positionToCellKey(creature.position)
    if (!this.grid.has(key)) this.grid.set(key, [])

    const cellCreatures = this.grid.get(key)
    if (cellCreatures) cellCreatures.push(creature)
  }

  private listNearbyCreatures(position: { x: number; y: number }): Creature[] {
    const key = this.positionToCellKey(position)
    const [cellX, cellY] = key.split(',').map(Number)
    const nearbyCreatures: Creature[] = []

    for (let nearbyX = cellX - 1; nearbyX <= cellX + 1; nearbyX++) {
      for (let nearbyY = cellY - 1; nearbyY <= cellY + 1; nearbyY++) {
        const nearbyCellKey: CellKey = `${nearbyX},${nearbyY}`
        const creaturesInCell = this.grid.get(nearbyCellKey)
        if (creaturesInCell) nearbyCreatures.push(...creaturesInCell)
      }
    }

    return nearbyCreatures
  }

  private positionToCellKey(position: { x: number; y: number }): CellKey {
    const cellX = Math.floor(position.x / this.cellSize)
    const cellY = Math.floor(position.y / this.cellSize)
    return `${cellX},${cellY}`
  }
}
