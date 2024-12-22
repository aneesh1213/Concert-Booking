import jwt from 'jsonwebtoken';
export const SECRET = 'SECr3t';

export default function UserAuth(req, res, next){
    // console.log(req.headers)
    const authheader = req.headers.authorization;
    if(authheader){
        const token = authheader;
        // console.log(token)
        jwt.verify(token, SECRET, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else{
        res.sendStatus(401);
    }
}
