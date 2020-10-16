import { Service, MongooseServiceOptions } from 'feathers-mongoose'
import { Application } from '../../declarations'
import { Id, Params } from '@feathersjs/feathers'

export class WsPush extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options)
    // this.events = ['status']
  }

  async create(data: any, params: Params) {
    if (data.$action === 'notice') return this.notice(data, params)
    return super.create(data, params)
  }

  notice(data: any, params: Params) {
    const that: any = this
    that.emit('hello', { status: 'created' })
    const ret: any = { ok: 1 }
    return ret
  }
}
