import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function authToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ erro: "Token não fornecido!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err) return res.status(403).json({ error: "Token inválido ou expirado!" });
    req.user = user;
    next();
});
}
