import { Router } from 'express';
import { Snippet } from '../../db/models';

const router = Router();

router.get('/', async (req, res) => {
  res.render('Layout', { });
});

router.get('/snippets', async (req, res) => {
  const data = await Snippet.findAll({ where: { user_id: req.session.user.id } });
  res.render('Layout', { data });
});

export default router;
