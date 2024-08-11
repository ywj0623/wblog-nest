import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { StaticDataService } from 'src/services/staticData/staticData.service'
import { CreateStaticDataDTO, UpdateStaticDataDTO } from './dto/staticData.dto'
import { StaticData } from 'src/entity/staticData.entity'
import { Schema } from 'mongoose'

@Resolver()
export class StaticDataResolver {
  constructor(private readonly staticDataService: StaticDataService) {}

  @Query(() => [StaticData], { name: 'findByType' })
  findByType(@Args('type') type: string) {
    return this.staticDataService.findByType(type)
  }

  @Query(() => StaticData, { name: 'findByTypeAndKey' })
  findByTypeAndKey(@Args('type') type: string, @Args('key') key: string) {
    return this.staticDataService.findByTypeAndKey(type, key)
  }

  @Mutation(() => StaticData, { name: 'createStaticData' })
  createStaticData(@Args() args: CreateStaticDataDTO) {
    return this.staticDataService.create(args)
  }

  @Mutation(() => StaticData, { name: 'editStaticData' })
  editStaticData(@Args() args: UpdateStaticDataDTO) {
    return this.staticDataService.edit(args._id, args)
  }

  @Mutation(() => StaticData, { name: 'deleteStaticData' })
  deleteStaticData(@Args('id', { type: () => String }) id: Schema.Types.ObjectId) {
    return this.staticDataService.delete(id)
  }
}
