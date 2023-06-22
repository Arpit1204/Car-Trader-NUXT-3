import {PrismaClient} from "@prisma/client" 

const prisma = new PrismaClient()

export default defineEventHandler((event)=>{
    const {city} =  event.context.params;
    const {make, maxPrice, minPrice} = getQuery(event)
    let filters = {
        city:city.toLowerCase()
    };

    

    if(make){
        filters.make = make
    }

    if(maxPrice || minPrice){
       filters.price = {}
    }
    if(maxPrice){
        filters.price.lte = parseInt(maxPrice)
    }

    if(minPrice){
        filters.price.gte = parseInt(minPrice)
    }


    return prisma.car.findMany({
        where:filters
    })
})