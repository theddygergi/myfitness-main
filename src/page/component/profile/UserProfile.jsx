import React from 'react'
import {
    Row,
    Col,
    Button,
    Image,
} from 'react-bootstrap'
import { BiSolidUserCircle } from "react-icons/bi";


export default function UserProfile() {
  const username = localStorage.getItem('username');
  return (
    <div className='user-profile'>
        <div className="user-information">
            <div className="
            bg-white border rounded
            information information-row01"
            >
                <div className='text-center '><BiSolidUserCircle/><p className='h5'>{username}</p></div>
                <div className="information"></div>
            </div>
        </div>
    </div>
  )
}
