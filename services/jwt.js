import jwt from "jsonwebtoken"
import env from "dotenv"
env.config()

export const signJwt = (payload)=>{
    return jwt.sign(payload, process.env.SECRET_KEY)
}

export const verify_jwt = async(req, res, next)=>{
    try {
        let auth_header = await req.headers["authorization"]

        //cek auth
        if(!auth_header){
            res.json({
                success : false,
                msg : "authorization not found"
            })
            return
        }

        let token = await auth_header.split(" ")[1]
        let chech_token = await jwt.verify(token, process.env.SECRET_KEY)

        //jika malformat
        if(!chech_token){
            res.json({
                success : false,
                msg : "jwt mal format"
            })
            return
        }

        next()
    } catch (error) {
        res.json({
            success : false,
            msg : "jwt mal format"
        })
    }
}