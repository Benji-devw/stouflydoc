import React, {useRef} from "react";
import styled from "styled-components";
import Button from '../comps/Button';
import Image from "next/image";


const Content = styled.div`
  /* background-image: url('/images/Untitled.png'); */
  /* background-position: center;
  background-repeat: no-repeat;
  background-size: 100%; */
  /* background-attachment: fixed; */
  .log-img {
    @media (max-width: 800px) {
      display: none
    }
  }
`;


export default function User () {

  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = React.useState(false);

  function handleClickOutside(e) {
      if (wrapperRef.current === e.target) setShowModal(false);
  }

  return (
    <>
      <span className="cursor-pointer block px-2 py-1 text-white rounded hover:bg-gray-800" onClick={() => setShowModal(true)} > Login </span>
      {showModal ? (
        <>
          <div 
            ref={wrapperRef} 
            onClick={(e) => handleClickOutside(e)} 
            className="justify-center fadeIn items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <Content className="ralative flex flex-wrap content-center justify-center">
              <div className='grid log-img'>
              <Image className="hidden" src='/images/mixer.jpg' alt='test' width='450px' height='100%'/>
              </div>
              <form className="grid bg-white shadow-md px-10 py-10">
                <h2 className="text-2xl font-bold mb-5 text-center text-gray-900">LOGIN</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                    Email:
                  </label>
                  <input className="shadow appearance-none border w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password:
                  </label>
                  <input className="shadow appearance-none border border-red-500 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="" />
                  <p className="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                <div className="flex items-center justify-between">
                  <Button type="submit">
                    Sign In
                  </Button>
                  <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    htmlForgot Password?
                  </a>
                </div>
                <p className="text-center text-gray-500 text-xs">
                  &copy;2020 Acme Corp. All rights reserved.
                </p>
              </form>
            </Content>
          </div>
          <div className="opacity-50 z-20 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>

  )
}

