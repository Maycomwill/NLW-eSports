import express from 'express'
import {PrismaClient} from '@prisma/client'

const app = express()
const prisma = new PrismaClient({
    log: ['query']
})

// Faz uma requisição de listagem dos games
app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count:{
                select:{
                    ads: true,
                }
            }
        }
    })

    return response.status(201).json(games);
});


// Faz uma requisição de listagem de anúncios
app.post('/ads', (request, response) => {
    return response.status(201).json([]);
});


// Faz uma requisição de anúncios por game
app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select:{
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return response.json(ads.map(ad => {
        return{
            ...ad,
            weekDays: ad.weekDays.split(',')
        }
    }))
})


// Faz uma requisição do discord relacionado ao anúncio
app.get('/ads/:id/discord', (request, response) => {

    const adId = request.params.id;

    return response.json([])
})


app.get('/ads', (request, response) => {
    return response.json([
        {id: 1, name: "anúncio 1"},
        {id: 2, name: "anúncio 2"},
        {id: 3, name: "anúncio 3"},
        {id: 4, name: "anúncio 4"},
    ])
})

app.listen(3333)