import { useEffect, useState } from 'react'
import { Game } from '../../App'

import * as Select from '@radix-ui/react-Select'
import { Check } from 'phosphor-react'

function SelectOptions() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data => {
      setGames(data)
    })
  }, [])

  return (
    <Select.Portal>
      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport 
          className='mt-8 px-4 py-2 rounded bg-zinc-900 text-white flex flex-col justify-start w-95%'
        >
          <Select.Item value='Games'>
            <Select.ItemText />
            <Select.ItemIndicator />
          </Select.Item>

          <Select.Group className='w-100 flex flex-col justify-between rounded '>
            {games.map(games => {
                return(
                    <Select.Item 
                        className='hover:bg-zinc-500 text-white flex justify-between items-center'
                        key={games.id}
                        value={games.id}
                    >
                        <Select.ItemText>{games.title}</Select.ItemText>
                        <Select.ItemIndicator className='pr-4'>
                            <Check className='w-6 h-6 text-white' />
                        </Select.ItemIndicator>
                    </Select.Item>
                )
            })}
          </Select.Group>

          <Select.Separator />
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select.Portal>
  )
}

export default SelectOptions