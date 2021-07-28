const Router = require('koa-router')
const { sendFirstMessage } = require('../usecases/sirena')
const ac = require('../usecases/active-campaign')

const router = new Router({
  prefix: '/sirena'
})

router.post('/messages/first', async ctx => {
  const { email, id } = ctx.request.body

  if (!email) throw ctx.throw(400, 'Email is required')
  const response = await sendFirstMessage(email)
  await ac.deals.getDealByContactId(id)

  ctx.resolve({
    message: 'Message sent',
    payload: response
  })
})

module.exports = router
