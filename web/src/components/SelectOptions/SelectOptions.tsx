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
        <Select.Viewport className='top-[70%] right-[5.9rem] rounded bg-zinc-900 text-zinc-300 inline-flex justify-start w-[135%]'>
          <Select.Item value='Games'>
            <Select.ItemText />
            <Select.ItemIndicator />
          </Select.Item>

          <Select.Group className='w-100'>
            {games.map(games => {
                return(
                    <Select.Item 
                        className='w-100 hover:bg-zinc-500 w-100'
                        key={games.id}
                        value={games.title}
                    >
                        <Select.ItemText>{games.title}</Select.ItemText>
                        <Select.ItemIndicator>
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