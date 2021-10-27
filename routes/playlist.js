import express from "express"
import { ps } from "../prisma/connection"
import { form_data } from "../services/form"

export const playlist = express.Router()

playlist.post("/playlist_create", form_data.none(), async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.playlist.create({
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
            success : true,
            error : error.message
        })
    }
})

playlist.get("/playlist_read_all", async(req, res)=>{
    try {
        const result = await ps.playlist.findMany()
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


playlist.put("/playlist_update/:id", form_data.none(), async(req, res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const result = await ps.playlist.update({
            where : {
                id : parseInt(id)
            },
            data : {
                nama : data.nama,
                // filename : file.filename,
                // song_path : path.join(__dirname, `../static/uploads.songs/${file.filename}`),
                user_id : parseInt(data.user_id),
                song_id : parseInt(data.song_id)
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

playlist.delete("/playlist_delete/:id", async(req, res)=>{
    try {
        const {id} = await req.params
        const result = await ps.playlist.delete({
            where : {
                id : parseInt(id)
            },
            
        })

        // const delete_song = await fs.unlinkSync(path.join(__dirname, `../static/uploads/songs/${result.filename}`))

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