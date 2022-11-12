import { Router } from 'express';
import { Snippet } from '../../db/models';
import { deleteProtect } from '../middlewares';

const router = Router();

router.route('/save')
  .post(async (req) => {
    await Snippet.create({ text: req.body.text, user_id: req.session.user.id });
  });

router.get('/snippets', async (req, res) => {
  const data = await Snippet.findAll({ where: { user_id: req.session.user.id } });
  res.json(data);
});

router.route('/snippets/:id')
  .patch(async (req, res) => {
    await Snippet.update({ text: req.body.input }, { where: { id: req.params.id } });
    const data = await Snippet.findAll({ where: { user_id: req.session.user.id } });
    res.json(data);
  })
  .delete(deleteProtect, async (req, res) => {
    await Snippet.destroy({ where: { id: req.params.id } });
    const data = await Snippet.findAll({ where: { user_id: req.session.user.id } });
    res.json(data);
  });

export default router;
