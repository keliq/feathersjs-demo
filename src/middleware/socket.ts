export default function (io: any) {
  io.use(function (socket: any, next: any) {
    const args = socket.handshake.query.args
    if (!args) next()
    try {
      // 解析参数
      socket.feathers.args = JSON.parse(args)
      next()
    } catch (e) {
      next(e)
    }
  })
}
