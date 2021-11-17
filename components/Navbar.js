import React, {useState, useEffect} from 'react';
import Link from 'next/Link';
import styles from '@/styles/Header.module.scss';
import Router from 'next/router';
import Login from '../pages/user/login';
import Registration from '../pages/user/register';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/client';


// console.log(signOut);

export default function Navbar() {

  const [session] = useSession();
  const [searchEnter, setSearchEnter] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const handleKeyPress = (e) => {
    if (searchEnter === '' || searchEnter.length < 3) return;
    if(e.key === 'Enter') Router.push(`/search?query=${searchEnter}`)
  }



  function logOut() {
    if (user) {
      console.log('USER');
      Cookies.remove('user_session')
      localStorage.removeItem('user')
      window.location.reload(false);
    } else {
      console.log('SESSION');
      Cookies.remove('user_session')
      signOut()
      localStorage.removeItem('user');
      // window.location.reload(false);
    }
}

  useEffect(() => { 
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])



  return (
    
    <div className={`${styles.header}`}>
      <header className={`header container mx-auto sm:flex sm:justify-between sm:items-center`}>
        {/* <div className="flex justify-between px-4 py-3 sm:p-0">
        </div> */}

        <div  className={`w-2/5 justify-center px-2 pt-2 pb-4 sm:flex sm:p-0`}>
          <h1 className='text-left text-2xl text-white m-3'>
            <Link href="/"><a style={{color:'#ff5901'}} className={`block px-2 text-white flex flex-wrap content-center`}>StouflyDoc</a></Link>
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
        
        {/* {session && <a href="#" onClick={handleSignout} className="btn-signin">Sign out</a>  } 
           {!session && <a href="#" onClick={handleSignin}  className="btn-signin">Sign in</a>  }  */}
        <nav className={`w-2/5 h-12 justify-center px-2 pt-2 pb-4 sm:flex sm:p-0`}>

          

              {/* <Link href="/create"><a className={`block px-2 py-1 text-white rounded hover:bg-gray-800`}>Add Sample</a></Link> */}
              {/* <Link href={`/user/${[user.id]}`}><a className={`block px-2 py-1 text-white rounded hover:bg-gray-800`}><Image src="/logout.svg" alt="logout" width='15' height='15' /></a></Link> */}
              
              {session ?
                  <>
                  <Link href={`/user/${session.user.name}`}><a className={`fadeIn block px-2 py-1 text-white rounded hover:bg-gray-800 flex flex-wrap content-center`}><Image src={session.user.image} alt="logout" className="rounded-full" width='30' height='30' /></a></Link>
                  <span className="fadeIn cursor-pointer block px-2 py-1 text-white rounded hover:bg-gray-800 flex flex-wrap content-center" onClick={() => logOut()} > <Image src="/logout.svg" alt="signOut" width='15' height='15' /> </span>
                </>
              : user &&
                <>
                <Link href={`/user/${user.name}`}><a className={`fadeIn block px-2 py-1 text-white rounded hover:bg-gray-800 flex flex-wrap content-center`}>Profil</a></Link>
                <span className="fadeIn cursor-pointer block px-2 py-1 text-white rounded hover:bg-gray-800 flex flex-wrap content-center" onClick={() => logOut()} > <Image src="/logout.svg" alt="signOut" width='15' height='15' /> </span>
              </>
              }
              {!session && !user ?(
                <>
                  <Login />
                  <Registration />
                </>
              ) : ('')}

          {/* <Link href="#"><a className={`block px-2 py-1 text-white rounded hover:bg-gray-800`}><Login /></a></Link> */}
        </nav>
      </header>
    </div>
  )
}
