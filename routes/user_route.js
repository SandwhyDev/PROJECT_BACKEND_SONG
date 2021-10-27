import express from "express"
import { ps } from "../prisma/connection"
import { form_data } from "../services/form"
import { song_upload } from "../services/song_service"

export const user = express.Router()

user.post("/user_create", form_data.none(), async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.users.create({
            data : {
                nama : data.nama
            }
        })

        res.json({
            success : true,
            msg : "berhasil",
            query : result
        })
    } catch (error) {
        res.json({
            success : true,
            error : error.message
        })
    }
})

user.get("/user_read_all", async(req, res)=>{
    try {
        const result = await ps.users.findMany({
            include : {
                tracks : true,
                Playlist : true
            }
        })
        res.json({
            success : true,
            msg : "berhasil",
            query : result
        })
    } catch (error) {
        res.json({
            success : true,
            error : error.message
        })
    }
})

user.put("/user_update/:id", form_data.none(), async(req, res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const result = await ps.users.update({
            where : {
                id : parseInt(id)
            },
            data : {
                nama : data.nama

            }
        })
        res.json({
            success : true,
            msg : "berhasil",
            query : result  
        })
        
    } catch (error) {
        res.json({
            success : true,
            error : error.message
        })
    }
})

user.delete("/user_delete/:id", async(req,res)=>{
    try {
        const {id} = await req.params
        const result = await ps.users.delete({
            where : {
                id : parseInt(id)
            }
        })
        res.json({
            success : true,
            msg : "berhasil",
            query : result
        })
    } catch (error) {
        res.json({
            success : true,
            error : error.message
        })
    }
})