import {useEffect, useState} from 'react'
import './styles/main.css'
import GameBanner from './components/GameBanner/GameBanner'
import CreateAdBanner from './components/CreateAdBanner/CreateAdBanner'
import { MagnifyingGlassPlus } from 'phosphor-react'
import NLWLogo from './assets/logo-nlw-esports.svg'

interface Game {
  id: string;
  title: string;
  bannerURL: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data => {
      setGames(data)
    })
  }, [])


  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center justify-center my-20">

      <img src={NLWLogo} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui!
      </h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return(
            <GameBanner 
              key={game.id}
              title={game.title} 
              bannerURL={game.bannerURL} 
              adsCount={game._count.ads}
            />
          )
        })}        
      </div>
      <CreateAdBanner />
    </div>
  )
}

export default App
