import { Instructor } from "../model/instructor_model.js";
import jwt from 'jsonwebtoken'
export const authMiddleware = (req, res, next) => {
    const authorization = req.headers?.authorization;
    console.log(req.headers);
    if (!authorization) {
        res.status(401).send({ error: true, message: 'unauthorized access' });
    }
    const token = authorization.split(' ')[1];
    
    jwt.verify(token,'secretkey', (err, decode) => {
        if (err) {
            return res.status(401).send({ error: true, message: 'unauthorized access' })
        }
        req.decode = decode;
        next();
    })
    }
