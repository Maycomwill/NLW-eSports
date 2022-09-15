import React from 'react'
import {MagnifyingGlassPlus} from 'phosphor-react'

function CreateAdBanner() {
  return (
    <div className='pt-1 self-stretch bg-nlw-gradient mt-8 rounded-lg overflow-hidden'>
        <div className='bg-[#2A2634] px-8 py-6 rounded-lg flex justify-between items-center'>
          <div>
            <strong className='text-white font-black text-2xl block'>Não encontrou seu duo?</strong>
            <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
          </div>
          <button className='py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-3'>
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
  )
}

export default CreateAdBanner