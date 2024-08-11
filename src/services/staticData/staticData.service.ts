import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Schema } from 'mongoose'
import { StaticData, StaticDataDocument } from 'src/entity/staticData.entity'
import { CreateStaticDataDTO, UpdateStaticDataDTO } from 'src/resolvers/staticData/dto/staticData.dto'

@Injectable()
export class StaticDataService {
  constructor(@InjectModel(StaticData.name) private staticDataModel: Model<StaticDataDocument>) {}

  async findByType(type: string): Promise<StaticData[]> {
    const staticData = this.staticDataModel.find({ type }).sort('order').exec()
    return staticData
  }

  async findByTypeAndKey(type: string, key: string): Promise<StaticData | null> {
    const staticData = await this.staticDataModel.findOne({ type, key }).exec()
    return staticData
  }

  async create(createStaticDataDTO: CreateStaticDataDTO): Promise<StaticData> {
    const newStaticData = new this.staticDataModel(createStaticDataDTO)
    return newStaticData.save()
  }

  async update(id: Schema.Types.ObjectId, updateStaticDataDTO: UpdateStaticDataDTO): Promise<StaticData> {
    const updatedData = await this.staticDataModel.findByIdAndUpdate(id, updateStaticDataDTO, { new: true })
    return updatedData
  }
}
