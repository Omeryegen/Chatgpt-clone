import { faSun, faThunderstorm, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Example() {
  return (
    <div className='w-4/6 flex flex-col items-center justify-center text-white text-sm mt-20'>
        <h2 className='mb-8 text-xl'>ChatGPT</h2>
        <div className='w-full grid grid-cols-3 '>
            <div className='w-full flex flex-col justify-center items-center'>
                <FontAwesomeIcon className='mb-4' fontSize={30} icon={faSun} />
                <p className='text-lg mb-4'>Examples</p>
                <div className='py-6 px-4 bg-zinc-500 rounded-lg mb-4 w-3/4'>
                    <p>Explain quantum computing in simple terms</p>
                </div>
                <div className='py-6 px-4 bg-zinc-500 rounded-lg mb-4 w-3/4'>
                    <p>Got any creative ideas for a 10 year old’s birthday?</p>
                </div>
                <div className='py-6 px-4 bg-zinc-500 rounded-lg mb-4 w-3/4'>
                    <p>How do I make an HTTP request in Javascript?</p>
                </div>
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
                <FontAwesomeIcon fontSize={30} className='mb-4' icon={faThunderstorm} />
                <p className='text-lg mb-4'>Capabilities</p>
                <div className='py-6 px-4 bg-zinc-500 rounded-lg mb-4 w-3/4'>
                    <p>Remembers what user said earlier in the conversation</p>
                </div>
                <div className='py-6 px-4 bg-zinc-500 rounded-lg mb-4 w-3/4'>
                    <p>Allows user to provide follow-up corrections</p>
                </div>
                <div className='py-6 px-4 bg-zinc-500 rounded-lg mb-4 w-3/4'>
                    <p>Trained to decline inappropriate requests</p>
                </div>
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
                <FontAwesomeIcon fontSize={30} className='mb-4' icon={faTriangleExclamation} />
                <p className='text-lg mb-4'>Limitations</p>
                <div className='py-6 px-4 bg-zinc-500 rounded-lg mb-4 w-3/4'>
                    <p>May occasionally generate incorrect information</p>
                </div>
                <div className='py-6 px-4 bg-zinc-500 rounded-lg mb-4 w-3/4'>
                    <p>May occasionally produce harmful instructions or biased content</p>
                </div>
                <div className='py-6 px-4 bg-zinc-500 rounded-lg mb-4 w-3/4'>
                    <p>Limited knowledge of world and events after 2021</p>
                </div>
            </div>
        </div>
    </div>
  )
}
