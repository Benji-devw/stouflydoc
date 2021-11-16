import React, {useRef} from "react";
import styled from "styled-components";
import Button from '../comps/Button';
import Image from "next/image";
import { Formik } from 'formik';
import { LoginSchema } from './loginSchema';


const Content = styled.div`
  /* background-image: url('/images/Untitled.png'); */
  /* background-position: center;
  background-repeat: no-repeat;
  background-size: 100%; */
  /* background-attachment: fixed; */
  .log-img {
    @media (max-width: 830px) {
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

  const handleSubmit = (e) => {
    console.log(e);
    // console.log(JSON.stringify(e));
    //   setTimeout(() => {
    //     alert(JSON.stringify(e));
    //   }, 400);
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
              <Formik
                initialValues={{ email: '', password: '', createdOn: new Date() }}
                onSubmit={e => handleSubmit(e)}
                validationSchema={LoginSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}
                    className="grid bg-white shadow-md px-10 py-20"
                  >
                    <h2 className="text-2xl font-bold mb-5 text-center text-gray-900">Login</h2>

                    <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="Email"> Email: <span className="text-red-400">{errors.email && touched.email && errors.email}</span> </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="shadow appearance-none border w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    
                    <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="password"> Password: <span className="text-red-400">{errors.password && touched.password && errors.password}</span> </label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className="shadow appearance-none border w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <div className="flex items-center justify-between">
                      <Button>
                        Register
                      </Button>
                      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        htmlForgot Password?
                      </a>
                    </div>
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

