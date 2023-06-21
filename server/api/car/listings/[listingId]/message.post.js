import Joi from "joi"

import {PrismaClient} from "@prisma/client" 

const prisma = new PrismaClient()

const schema = Joi.object({
    email:Joi.string().email().required(),
    phone:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    name:Joi.string().required(),
    message:Joi.string().min(29).required()
})

export default defineEventHandler(async(event)=>{
    const body = readBody(event)

    const {listingId} = event.context.params

    const {error} = await schema.validate(body)

    if(error){
        throw createError({
            error:412,
            statusMessage:error.message
        })
    }


    const {message, email, phone, name} = body
    const mess = prisma.message.create({
        data:{
            message,
            name,
            email,
            phone,
            listingId:parseInt(listingId)
        }
    })
    return mess
})