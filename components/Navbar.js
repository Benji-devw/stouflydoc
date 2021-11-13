import React, {useState} from 'react';
import Link from 'next/Link';
import styles from '../styles/Header.module.scss';
import { useRouter } from 'next/router';
import Login from '../pages/user/login';

export default function Navbar() {

  const router = useRouter();
  const [searchEnter, setSearchEnter] = useState('');

  const handleKeyPress = (e) => {
    if (searchEnter === '' || searchEnter.length < 3) return;
    if(e.key === 'Enter') router.push(`/search?query=${searchEnter}`)
  }

  return (
    
    <div className={`${styles.header}`}>
      <header className={`header container mx-auto sm:flex sm:justify-between sm:items-center`}>
        {/* <div className="flex justify-between px-4 py-3 sm:p-0">
        </div> */}

        <div  className={`w-2/5 justify-center px-2 pt-2 pb-4 sm:flex sm:p-0`}>
          <h1 className='text-left text-2xl text-white m-3'>
            <b style={{color:'#ff5901'}}>StouflyDoc</b>
          </h1>
        </div>


        <div className="w-2/5 justify-center px-2 pt-2 pb-4 sm:flex sm:p-0 text-white py-2">
          <input 
            // onFocus={console.log('focus')}
            type="search" name="search" placeholder="Search"
            className={`${styles.searchBar} mx-auto w-full h-8 px-5 rounded-sm text-md focus:outline-none`}
            onChange={e => { setSearchEnter(e.target.value)}}
            onKeyPress={handleKeyPress}
          />
        </div>
        

        <nav className={`w-2/5 justify-center px-2 pt-2 pb-4 sm:flex sm:p-0`}>
          <Link href="/"><a className={`block px-2 py-1 text-white rounded hover:bg-gray-800`}>Home</a></Link>
          <Link href="/create"><a className={`block px-2 py-1 text-white rounded hover:bg-gray-800`}>Add Sample</a></Link>
          <Login />
          {/* <Link href="#"><a className={`block px-2 py-1 text-white rounded hover:bg-gray-800`}><Login /></a></Link> */}
        </nav>
      </header>
    </div>
  )
}
