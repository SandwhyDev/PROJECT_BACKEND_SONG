import express from "express"
import { ps } from "../prisma/connection"
import { form_data } from "../services/form"

export const like = express.Router()

like.post("/like_create", form_data.none(), async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.like.create({
            data : {
                song_id : parseInt(data.song_id),
                from_id : parseInt(data.from_id)
            }
        })

        res.json({
            success : true,
            msg : "berhasil",
            query : result
        })

    } catch (error) {
        res.json({
            success : false,
            error :  error.message
        })
    }
})