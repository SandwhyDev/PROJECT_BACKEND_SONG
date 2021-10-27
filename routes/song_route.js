import express from "express"
import path from "path"
import fs from "fs"
import { ps } from "../prisma/connection"
import { song_upload } from "../services/song_service"
import { form_data } from "../services/form"

export const song = express.Router()

song.post("/song_create", song_upload.single("song"), async(req, res)=>{
    try {
        const data = await req.body
        const file = await req.file
        const result = await ps.songs.create({
            data : {
                judul : data.judul,
                filename : file.filename,
                song_path : path.join(__dirname, `../static/uploads.songs/${file.filename}`),
                user_id : parseInt(data.user_id)
            },
            
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

song.get("/song_read_all", async(req, res)=>{
    try {
        const result = await ps.songs.findMany()
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

song.put("/song_update/:id", form_data.none(), async(req, res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const result = await ps.songs.update({
            where : {
                id : parseInt(id)
            },
            data : {
                judul : data.judul,
                // filename : file.filename,
                // song_path : path.join(__dirname, `../static/uploads.songs/${file.filename}`),
                user_id : parseInt(data.user_id)
            },
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

song.delete("/song_delete/:id", async(req, res)=>{
    try {
        const {id} = await req.params
        const result = await ps.songs.delete({
            where : {
                id : parseInt(id)
            },
            
        })

        const delete_song = await fs.unlinkSync(path.join(__dirname, `../static/uploads/songs/${result.filename}`))

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