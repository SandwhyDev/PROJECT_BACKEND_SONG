import express from "express"
import path from "path"
import { ps } from "../prisma/connection"
import { form_data } from "../services/form"
import { song_upload } from "../services/song_service"

export const album = express.Router()

album.post("/album_create", form_data.none(), async(req,res)=>{
    try {
        const data = await req.body
        
        const result = await ps.albums.create({
            data : {
                nama : data.nama,
                user_id : parseInt(data.user_id)
                
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
            error : error.message
        })
    }
})

album.get("/album_read_all", async(req,res)=>{
    try {
        const result = await ps.albums.findMany({
            include : {
                song : true
            }
        })
        res.json({
            success : true,
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

album.put("/album_update/:id", form_data.none(), async(req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const result = await ps.albums.update({
            where : {
                id : parseInt(id)
            },
            data : {
                nama : data.nama,
                user_id : parseInt(data.user_id),
                song_id : parseInt(data.song_id)
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
            error : error.message
        })
    }
})