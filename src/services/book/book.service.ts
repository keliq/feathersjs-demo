// Initializes the `book` service on path `/books`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Book } from './book.class'
import createModel from '../../models/book.model'
import hooks from './book.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    books: Book & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  }

  // Initialize our service with any options it requires
  app.use('/books', new Book(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('books')

  service.hooks(hooks)
}
