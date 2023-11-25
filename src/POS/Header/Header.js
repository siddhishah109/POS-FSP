import React from 'react'
import './header.css'


const Header = () => {
  return (
    <div className='nav'>
        <div className='d-flex nav1'> 
            <div className='nav-t'> POS</div>
            <div className='date-box nav-t'><div>Date</div> <div className='date-nav'>11/1/2023</div></div>
        </div>
        <div className='d-flex nav2 '>
            <div className='nav-t'> Dashboard</div>
            <div className='nav-t'>STR08</div>
        </div>
    </div>
  )
}

export default Header