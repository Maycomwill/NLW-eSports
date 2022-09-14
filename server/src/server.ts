import express from 'express'
import cors from 'cors'
import {PrismaClient} from '@prisma/client'
import { convertHourStringToMinutes } from './util/convert-hour-to-minutes'
import { convertMinutesToHourString } from './util/convert-minutes-to-hourString'

const app = express()

app.use(express.json())

// Configurar o cors Origin é delimitar quais domínios de front-end podem acessar esse banco de dados
app.use(cors())

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


// Faz uma requisição de criação de anúncios
app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id
    const body: any = request.body

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    return response.status(201).json(ad);
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
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
        }
    }))
})


// Faz uma requisição do discord relacionado a um anúncio
app.get('/ads/:id/discord', async (request, response) => {

    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })

    return response.json({
        discord: ad.discord,
    })
})

// Faz uma requisição da listagem de anúncios
app.get('/ads', (request, response) => {
    return response.json([
        {id: 1, name: "anúncio 1"},
        {id: 2, name: "anúncio 2"},
        {id: 3, name: "anúncio 3"},
        {id: 4, name: "anúncio 4"},
    ])
})

app.listen(3333)