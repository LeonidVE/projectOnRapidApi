import { Router } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../db/models';

const router = Router();

router.route('/registration')
  .get((req, res) => {
    res.render('Layout', {});
  })
  .post(async (req, res) => {
    const { name, password, email } = req.body;
    if (name && password && email) {
      try {
        const user = await User.create({
          ...req.body, password: await bcrypt.hash(password, 10),
        });
        const currUser = { id: user.id, name: user.name };
        req.session.user = currUser;
        return res.json(currUser);
      } catch {
        return res.sendStatus(500);
      }
    } else {
      return res.sendStatus(401);
    }
  });

router.route('/authorization')
  .get((req, res) => {
    res.render('Layout', {});
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ where: { email } });
      if (user && await bcrypt.compare(password, user.password)) {
        const currUser = { id: user.id, name: user.name };
        req.session.user = currUser;
        return res.json(currUser);
      }
      return res.sendStatus(401);
    }
    return res.sendStatus(401);
  });

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid').sendStatus(200);
});

export default router;
