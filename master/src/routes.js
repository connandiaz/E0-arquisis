const Router = require('koa-router');

const router = new Router()

router.post('/events', async (ctx) => {
    try {
        const event = ctx.body;

        if (!idpk || !type || !packageBody) {
            ctx.status = 400;
            ctx.body = { error: 'faltan campos obligatorios' };
            return;
        }

        const demanda = await ctx.db.Demanda.create({
            idpk: event.idpk,
            type: event.type,
            packageBody: event.packageBody,
            receivedAt: new Date()
        });
        ctx.status = 201;
        ctx.body = demanda;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

router.get('/history', async (ctx) => {
  try {

    //https://blog.alexrusin.com/mastering-offset-pagination-in-node-js-rest-apis/
    
    const page = Math.max(1, parseInt(ctx.query.page, 10));
    const limit = 25;
    const offset = (page - 1) * limit;

    const { idpk, type, packageBody, receivedAt } = ctx.query;

    const where = {};
    if (idpk) where.idpk = idpk;
    if (type) where.type = type;
    if (packageBody) where.packageBody = packageBody;
    if (receivedAt) where.receivedAt = receivedAt;

    const demandas = await ctx.db.Demanda.findAll({
      where,
      limit,
      offset,
      order: [['receivedAt', 'DESC']]
    });

    ctx.body = {
      page,
      limit,
      demandas: demandas
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

router.get('/history/:id', async (ctx) => {
  try {
    const id = ctx.params.id;
    const demanda = await ctx.db.Demanda.findByPk(ctx.params.id);

    if (!demanda) {
      ctx.status = 404;
      ctx.body = { error: error.message }
      return;
    }

    ctx.status = 404;
    ctx.body = demanda;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error.message };
    }
});

router.get('/health', async (ctx) => {
  try {
    ctx.status = 200;
    ctx.body = { status: 'sano' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  } 
});

module.exports = router;
        


        


