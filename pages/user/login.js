import React, {useRef} from "react";
import styled from "styled-components";
import Button from '../comps/Button';
import Image from "next/image";
import { Formik } from 'formik';
import { LoginSchema } from './loginSchema';
import Router from "next/router";
import Cookie from 'js-cookie';
import { signIn } from "next-auth/client"
import {FcGoogle} from 'react-icons/fc';
const jwt = require('jsonwebtoken');


const Content = styled.div`
  .log-img {
    @media (max-width: 830px) {
      display: none
    }
  }
`;
const GoogleBnt = styled.div`
  position: relative;
  margin: auto;
  border-radius: 3px;
  background: #4285F4;
  padding: .5rem 1rem .5rem 3rem;
  cursor: pointer;
  svg {
    position: absolute;
    left: 0rem;
    bottom: 0rem;
    padding: .5rem;
    font-size: 2.5em;
    background: #FFF;
    border-radius: 2px;
    border: 1px solid #4285F4;

  }
`;


export default function User () {

  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = React.useState(false);
  const [handleError, setHandleError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  function handleClickOutside(e) {
      if (wrapperRef.current === e.target) setShowModal(false);
  }


  const handleSubmit = async (event) => {
    console.log(event);
    setLoading(true);

    const datas = await fetch("http://localhost:8080/user/login", {
      body: JSON.stringify(event),
      headers: { 'Content-Type': 'application/json'},
      method: 'POST',
    });
    const res = await datas.json();
    console.log(res);
    if (res.accessToken) {
      localStorage.setItem("user", JSON.stringify(res));
      Cookie.set("user_session", res.accessToken, {expires: 1 / 12 });
      Router.push(`/user/${[res.name]}`)
    }

    setLoading(false);
    setHandleError(res.message);
  }


  return (
    <>
      <span className="fadeIn cursor-pointer block px-2 py-1 text-white rounded hover:bg-gray-800 flex flex-wrap content-center" onClick={() => setShowModal(true)} > Login </span>
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
              <Formik
                initialValues={{ email: '', password: ''}}
                onSubmit={e => handleSubmit(e)}
                validationSchema={LoginSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}
                    className="grid w-96 bg-white shadow-md px-10 py-20"
                  >
                    <h2 className="text-2xl font-bold mb-5 text-center text-gray-900">Login</h2>

                    <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="Email"> Email: <span className="text-red-400">{handleError === 'Email non trouvé !' ? handleError : errors.email && touched.email && errors.email}</span> </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="shadow appearance-none border w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    
                    <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="password"> Password: <span className="text-red-400">{handleError === 'Passwors invalid !' ? handleError : errors.password && touched.password && errors.password}</span> </label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className="shadow appearance-none border w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <div className="flex items-center justify-between">
                 
                      <Button disabled={loading}>
                        {!loading ? (
                          'Login'
                          ) : ('...')}
                      </Button>
                      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        + Register
                      </a>
                    </div>
                    <GoogleBnt onClick={() => signIn("google")} className="hover:shadow-md"><FcGoogle /> <span>Sign in with Google</span></GoogleBnt>
                  </form>
                )}
              </Formik>
            </Content>
          </div>
          <div className="opacity-50 z-20 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>

  )
}

