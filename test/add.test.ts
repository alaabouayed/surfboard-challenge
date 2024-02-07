import { Grid } from '@src/grid/Grid'
import { Creature } from '@src/grid/entities/Creature'
import { Family, Species } from '@src/grid/types/creature'
import { CreatureNotFoundError } from '@src/utils/errors'

describe('Grid', () => {
  const size = 100
  const cellSize = 10
  let grid: Grid

  beforeEach(() => {
    grid = new Grid(size, cellSize)
  })

  describe('constructor', () => {
    it('initializes grid with specified size and cellSize', () => {
      expect(grid.size).toBe(size)
      expect(grid.cellSize).toBe(cellSize)
      expect(grid.grid.size).toBe(0)
    })
  })

  describe('placeCreaturesOnGrid', () => {
    it('places creatures on the grid correctly', () => {
      const mockCreatures = [
        new Creature(Family.Flyer, Species.Bird, grid),
        new Creature(Family.Swimmer, Species.Lion, grid),
        new Creature(Family.Runner, Species.Shark, grid),
      ]
      grid.placeCreaturesOnGrid(mockCreatures)
      const cellKey1 = grid['positionToCellKey'](mockCreatures[0].position)
      const cellKey2 = grid['positionToCellKey'](mockCreatures[1].position)
      const cellKey3 = grid['positionToCellKey'](mockCreatures[2].position)

      expect(grid.grid.get(cellKey1)).toContain(mockCreatures[0])
      expect(grid.grid.get(cellKey2)).toContain(mockCreatures[1])
      expect(grid.grid.get(cellKey3)).toContain(mockCreatures[2])
    })
  })

  describe('getRandomNearbyCreature', () => {
    it('returns a random nearby creature', () => {
      const mockCreature = new Creature(Family.Flyer, Species.Lion, grid)
      grid.placeCreaturesOnGrid([mockCreature])

      const {
        position: { x, y },
      } = mockCreature

      const nearbyCreature = grid.getRandomNearbyCreature({ x, y })
      expect(nearbyCreature).toBeDefined()
      expect(nearbyCreature?.id).toBe(mockCreature.id)
    })
  })

  describe('removeCreatureFromGrid', () => {
    it('removes a creature from the grid', () => {
      const mockCreature = new Creature(Family.Flyer, Species.Shark, grid)
      grid.placeCreaturesOnGrid([mockCreature])

      expect(() => grid.removeCreatureFromGrid(mockCreature)).not.toThrow()
      const cellKey = grid['positionToCellKey'](mockCreature.position)
      expect(grid.grid.get(cellKey)).not.toContain(mockCreature)
    })

    it('throws CreatureNotFoundError if the creature is not found', () => {
      const mockCreature = new Creature(Family.Runner, Species.Bird, grid)

      expect(() => grid.removeCreatureFromGrid(mockCreature)).toThrow(CreatureNotFoundError)
    })
  })
})
