export class NoNearbyCreatureError extends Error {
  constructor() {
    super('No nearby creature found')
  }
}

export class CreatureNotFoundError extends Error {
  constructor() {
    super('Creature not found')
  }
}
