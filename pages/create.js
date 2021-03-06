import React, { useState } from 'react';
import { getAllTracks, postTrack } from './api/tracks';
import Image from 'next/image';
import styles from '@/styles/Create.module.scss';
import Layout from '@/components/Layout';
import Button from './comps/Button';



export default function CreateSample ({res}) {

  const categorySet = new Set(res.props.res.state.map(cat => cat.category));
  const catList = Array.from(categorySet).sort();

  const [alert, setAlert] = useState(null);

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [datas, setDatas] = React.useState({
    url: ``,
    title: ``,
    tempo: 0,
    category: catList[0],
    description: ``,
    reporter: ``,
    tags: ``,
    yearCollection: 0,
    comments: ``,
    price: 0,
    likes: 0,
    datePost: new Date().toISOString()
  })


  const handleChange = ({ target: { name, value } }) => {
    setDatas(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  

  
  const submitForm = async (e) => {
    e.preventDefault();

    if (selectedFile === null) {
      console.log('file null');
      setAlert('error')
      return;
    }

    const formData = new FormData();

    Array.from(selectedFile.target.files).forEach((file) => {
      formData.append(selectedFile.target.name, file);
    });
    formData.append('url', datas.url)
    formData.append('title', datas.title)
    formData.append('tempo', datas.tempo)
    formData.append('category', datas.category)
    formData.append('description', datas.description)
    formData.append('reporter', datas.reporter)
    formData.append('tags', datas.tags)
    formData.append('yearCollection', datas.yearCollection)
    formData.append('comments', datas.comments)
    formData.append('price', datas.price)
    formData.append('likes', datas.likes)
    formData.append('datePost', datas.datePost)

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };

    // postTrack(formData)
  }

  // console.log(selectedFile);

  return (
    <Layout>
      <form 
        encType="multipart/form-data"
        onSubmit={submitForm} 
        className={`${styles.createForm} px-5 py-5 md:w-2/3 fadeIn`}
      >
      
      <h2 className="create-title text-3xl text-center mb-5">Create Sample</h2>

        <div className="flex content-center flex-wrap">
          <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="title">
              Titre
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="title" type="text" name="title" onChange={handleChange} 
              />
              </label>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="tempo">
              bpm
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="tempo" type="number" name="tempo" onChange={handleChange} placeholder="160"
              />
              </label>
            </div>
          </div>
        </div>

        <div className="flex content-center flex-wrap">
          <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="category">
              Ajouter une Categorie
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="category" type="text" name="category" onChange={handleChange} 
                // disabled={true}
              />
              </label>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              Categories
              <br />
              <div className="inline-block relative w-full">
                <select name="category" onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option> --- </option>
                  {catList.map((cat, id) => (
                  <option key={id}>{cat}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex content-center flex-wrap">
          <div className="w-full">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="description">
              Description
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="description" type="text" name="description" onChange={handleChange} 
              />
              </label>
            </div>
          </div>
        </div>

        <div className="flex content-center flex-wrap">
          <div className="w-full md:w-1/2">
              <div className="text-center p-2">
                <label className="block mb-2" htmlFor="tags">
                Mot-cl??
                <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="tags" type="text" name="tags" onChange={handleChange} 
                  placeholder="Kick,Loop,Hi-Hat"
                />
                </label>
              </div>
            </div>

          <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="yearCollection">
              Ann??e
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="yearCollection" type="number" min="2021" name="yearCollection" onChange={handleChange} 
              />
              </label>
            </div>
          </div>
        </div>

        <div className="flex content-center flex-wrap">
        <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="reporter">
              Post?? par
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="reporter" type="text" name="reporter" onChange={handleChange} 
              />
              </label>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="comments">
              Commentaire
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="comments" type="text" name="comments" onChange={handleChange} 
              />
              </label>
            </div>
          </div>
        </div>

        <div className="flex content-center flex-wrap">

          <div className="w-full md:w-1/2">
          </div>
          <div className="w-full md:w-1/2">
              <div className="text-center p-2">
                <label className="block mb-2" htmlFor="price">
                Prix
                <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="price" type="number" name="price" onChange={handleChange} placeholder="3.20 1 0.25"
                />
                </label>
              </div>
            </div>
        </div>
    
        <div className="mt-1 flex justify-center my-3 px-3 pt-3 pb-3 border-2 border-gray-300 border-dashed rounded-md">
          {selectedFile !== null ? (
            <div className='content-center'>
              <button onClick={() => setSelectedFile(null)} className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 m-2 rounded">X</button>
              {selectedFile.target.files[0].name}
            </div>
          ) : (
          <label
            className="
              mx-auto
              w-64
              flex flex-col
              items-center
              px-4
              bg-white
              rounded-md
              shadow-md
              tracking-wide
              uppercase
              border border-blue
              cursor-pointer
              hover:bg-blue-600 hover:text-white
              ease-linear
              transition-all
              duration-150 "
          >
            <Image src="/cloud-upload-alt-solid.svg" alt="cloud logo" width={112} height={80} />
            <span style={{color: '#FF5901'}} className="mt-2 text-base leading-normal">Select a file</span>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e)}
              className="hidden"
              name='SampleFile'
              label="Upload Single File"
            />
              <p className=" leading-normal text-gray-800">
                WAV, MP3, 10MB
              </p>
          </label>
          )}
        </div>


        <div className={`flex items-center justify-between`}>
          <Button>
            Send
          </Button>
        </div>
      </form>

      {alert === 'error' && 
        <div onClick={() => setAlert(null)} className="fixed right-3 top-20 fadeIn bg-red-100 border border-red-400 text-red-700 px-10 py-3 rounded cursor-pointer" role="alert">
          <strong className="font-bold">Fichier Incorrect</strong>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          </span>
        </div>
      }

    </Layout>
  )
}


// Server side renderer - Rendu cot?? server
export async function getStaticProps() {
  const res = await getAllTracks()
  return { props: {res} }
}