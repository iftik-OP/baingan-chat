import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import background from "../img/background.png";


const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
      <img className="background" src={background} alt="" />
    </div>
  )
}

export default Home