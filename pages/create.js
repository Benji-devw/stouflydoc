import React from "react";
import axios from "axios";
import Image from 'next/image';
import styles from '../styles/Create.module.css';
import Layout from "../components/Layout";



export default function CreateSample ({res}) {

  const categorySet = new Set(res.state.map(cat => cat.category));
  const catList = Array.from(categorySet).sort();

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
    formData.append('datePost', datas.datePost)

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };

    await axios
    .post('http://localhost:8080/tracks', formData, config)
    .then((res) => {
      console.log("File Upload success");
    })
    .catch((err) => console.log("File Upload Error"));
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
              Title
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
                id="tempo" type="number" name="tempo" onChange={handleChange} 
              />
              </label>
            </div>
          </div>
        </div>

        <div className="flex content-center flex-wrap">
          <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="category">
              Ajouter une Categories
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
                Tags
                <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="tags" type="text" name="tags" onChange={handleChange} 
                />
                </label>
              </div>
            </div>

          <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="yearCollection">
              Collection
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
              By
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="reporter" type="text" name="reporter" onChange={handleChange} 
              />
              </label>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="comments">
              Comments
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="comments" type="text" name="comments" onChange={handleChange} 
              />
              </label>
            </div>
          </div>
        </div>
    
        <div className="mt-1 flex justify-center my-3 px-3 pt-3 pb-3 border-2 border-gray-300 border-dashed rounded-md">
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
        </div>

           
     
        <div className={`${styles.send} flex items-center justify-between`}>
          <button type="submit" className="text-white text-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Send
          </button>
        </div>

      </form>
    </Layout>
  )
}


// Server side renderer - Rendu coté server
export async function getStaticProps(context) {
  try {
    const res = await fetch('http://localhost:8080/tracks/category')
      .then(r => r.json())
      return {
        props: {res}
      }
  } catch (err) {
    console.error(err);
  }
}