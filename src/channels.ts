import '@feathersjs/transport-commons'
import { HookContext } from '@feathersjs/feathers'
import { Application } from './declarations'

export default function (app: Application): void {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return
  }

  app.on('connection', (connection: any): void => {
    // On a new real-time connection, add it to the anonymous channel
    console.log('已建立连接', connection)
    app.channel('anonymous').join(connection)
  })

  app.on('login', (authResult: any, { connection }: any): void => {
    // 当通过 REST 登录时，connection 是 undefinedr
    if (!connection) return
    // 获取登录用户
    // const user = connection.user;
    // 不再是匿名登录了，移除The connection is no longer anonymous, remove it
    app.channel('anonymous').leave(connection)
    // Add it to the authenticated user channel
    app.channel('authenticated').join(connection)

    // Channels can be named anything and joined on any condition

    // E.g. to send real-time events only to admins use
    // if(user.isAdmin) { app.channel('admins').join(connection); }

    // If the user has joined e.g. chat rooms
    // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(connection)); websocketPush wsPush

    // Easily organize users by email and userid for things like messaging
    // app.channel(`emails/${user.email}`).join(connection);
    // app.channel(`userIds/${user.id}`).join(connection);
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.publish((data: any, hook: HookContext) => {
    // Here you can add event publishers to channels set up in `channels.ts`
    // To publish only for a specific event use `app.publish(eventname, () => {})`
    console.log('Publishing all events to all users')
    return app.channel('anonymous')
  })

  // 监听订单创建
  app.service('orders').on('created', (order) => {
    console.log('order created', order)
    app.channel('anonymous').send({
      name: 'hello',
    })
  })

  // 监听 websocket push
  app.service('ws-push').on('created', (data) => {
    console.log('ws push', data)
  })

  // 监听自定义事件 hello
  app.service('ws-push').on('hello', (data) => {
    console.log('hello', data)
  })

  app.on('hello', (data) => {
    console.log('收到 hello')
  })

  // app.service('orders').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`),
  //   ]
  // })

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
}
