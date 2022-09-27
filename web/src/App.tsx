//O react traz a sintaxe tsx (js + xml (sintaxe do html))
import './styles/main.css';
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import logoImg from './assets/logo-nlw-eSports.svg'
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  //desestruturando games e setando o tempo setGames, através da function useState, que adiciona
  //o estado inicial
  //no useState estou dizendo que o games é um array de Game
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games') .then(response => {
        setGames(response.data)
      })
  })

  return ( 
  <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
    <img src= {logoImg} alt="" />

    <h1 className='text-5xl text-white font-black mt-20'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.</h1>

    <div className='grid grid-cols-6 gap-6 mt-16'>
      {games.map(game => {
        return (
          <GameBanner 
            //o key serve para o react encontrar o game mais facilmente
            //e se no futuro algum game for excluído ele identifica
            //e não precisa carregar toda a lista novamente
            key={game.id}
            bannerUrl= {game.bannerUrl} 
            title= {game.title}
            adsCount={game._count.ads}
            />
        )
      })}

    </div>

    <Dialog.Root>
      <CreateAdBanner/>
      <CreateAdModal/>
    </Dialog.Root>  
    

  </div>

  
  
  )  
}

export default App
