export default function auth(req, res, next) {
    if (req.session.user_id) {
    console.log('authenticated')
    next()
    } else {
    console.log('not authenticated')
    return res.status(200).json({ state: false });
    }
  }
