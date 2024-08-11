import { Test, TestingModule } from '@nestjs/testing'
import { StaticDataResolver } from './staticData.resolver'

describe('StaticDataResolver', () => {
  let resolver: StaticDataResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ providers: [StaticDataResolver] }).compile()

    resolver = module.get<StaticDataResolver>(StaticDataResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
