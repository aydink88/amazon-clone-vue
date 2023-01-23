import jwt from 'jsonwebtoken';

// class HttpException extends Error {
//   constructor(status, message) {
//     super(message);
//     this.status = status;
//     this.message = message;
//   }
// }

export function errorMiddleware(error, _request, response, _next) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({
    status,
    message,
  });
}

export function generateToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    { expiresIn: '30d' }
  );
}

export function isAuth(req, res, next) {
  let isSuccess = false;
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); //Bearer <token>
    jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'invalid token' });
      } else {
        req.user = decoded;
        isSuccess = true;
      }
    });
  }
  isSuccess ? next() : res.status(401).send({ message: 'no token' });
}

export function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Invalid admin token' });
  }
}

export function isSeller(req, res, next) {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).json({ message: 'Invalid seller token' });
  }
}

export function isSellerOrAdmin(req, res, next) {
  if (req.user && (req.user.isAdmin || req.user.isSeller)) {
    next();
  } else {
    res.status(401).json({ message: 'Invalid admin/seller token' });
  }
}
