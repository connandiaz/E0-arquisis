const Router = require('koa-router');
const router = new Router();

router.post('/events', async (ctx) => {
  try {
    const event = ctx.request.body;
    const { idpk, type, packageBody } = event || {};

    if (!idpk || !type || !packageBody) {
      ctx.status = 400;
      ctx.body = { error: 'faltan campos obligatorios' };
      return;
    }

    const demanda = await ctx.db.Demanda.create({
      idpk,
      type,
      packageBody,
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
    //error de NaN 
    const rawPage = parseInt(ctx.query.page, 10);
    const page = !isNaN(rawPage) && rawPage > 0 ? rawPage : 1;
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

    ctx.status = 200;
    ctx.body = {
      page,
      limit,
      demandas
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

router.get('/history/:id', async (ctx) => {
  try {
    const id = ctx.params.id;
    const demanda = await ctx.db.Demanda.findByPk(id);

    if (!demanda) {
      ctx.status = 404;
      ctx.body = { error: 'Demanda no encontrada' };
      return;
    }

    ctx.status = 200;
    ctx.body = demanda;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

router.get('/health', async (ctx) => {
  ctx.status = 200;
  ctx.body = { status: 'sano' };
});

module.exports = router;
        


        


