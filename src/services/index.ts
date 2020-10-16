import { Application } from '../declarations'
import user from './user/user.service'
import order from './order/order.service'
import wsPush from './ws-push/ws-push.service';
import book from './book/book.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(user)
  app.configure(order)
  app.configure(wsPush);
  app.configure(book);
}
