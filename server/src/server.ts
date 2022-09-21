import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client"
import { convertHoursStringToMinutes } from "./utils/convert-hours-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";

const app = express()

app.use(express.json())

//Define quais fronts-end podem acessar a aplicação
app.use(cors())

const prisma = new PrismaClient({
  log: ['query']
})

//www.minhaapi.com/ o que vem depois dessa barra é o que preciso passar de caminho no get
app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })
  return response.json(games);
});

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const body:any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,    
      discord: body.discord,          
      weekDays: body.weekDays.join(','),        
      hourStart: convertHoursStringToMinutes(body.hourStart),      
      hourEnd: convertHoursStringToMinutes(body.hourEnd),         
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return response.status(201).json(ad);
});


//pesquisa os anúncios que está dentro do game que possui esse ID/ Chama concatenação de recursos
//no express p identificar que o id é uma informação dinâmica, eu passo os :
app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
      createdAt: true,
    },

    where: {
      gameId,
    },

    orderBy: {
      createdAt: 'desc',
    }
  })

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }
  }))
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    }, 

    where: {
      id: adId,
    }
  }) 

  return response.json({
    discord: ad.discord,
  })
})

//está rodando na porta 3333- localhost
app.listen(3333)

