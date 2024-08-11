import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { StaticData, StaticDataSchema } from 'src/entity/staticData.entity'
import { StaticDataResolver } from 'src/resolvers/staticData/staticData.resolver'
import { StaticDataService } from 'src/services/staticData/staticData.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: StaticData.name,
        schema: StaticDataSchema,
      },
    ]),
  ],
  providers: [StaticDataService, StaticDataResolver],
  exports: [StaticDataService, MongooseModule],
})
export class StaticDataModule {}
