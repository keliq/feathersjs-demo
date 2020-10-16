import { Service, MongooseServiceOptions } from 'feathers-mongoose'
import { Application } from '../../declarations'
import { Id, Params } from '@feathersjs/feathers'

export class Book extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options)
  }

create(data: any, params: Params) {
  // 自己的逻辑
  return super.create(data, params)
}
}
