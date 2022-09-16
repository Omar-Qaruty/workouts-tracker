const { prisma } = require('../prisma/client.js')

const currentUser = async (req, res, next) => {
  if (req.session.userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: req.session.userId
      }
    })
    req.user = user;
  }
  next();
}

module.exports = currentUser;
