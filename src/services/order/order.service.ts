// Initializes the `order` service on path `/orders`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Order } from './order.class'
import createModel from '../../models/order.model'
import hooks from './order.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    orders: Order & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  }

  // Initialize our service with any options it requires
  app.use('/orders', new Order(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('orders')

  service.hooks(hooks)
}
