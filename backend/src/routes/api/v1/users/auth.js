export default function auth(req, res, next) {
  console.log('tset');
    if (req.session.user_id) {
    console.log('authenticated')
    next()
    } else {
    console.log('not authenticated')
    return res.json({ state: false });
    }
  }
