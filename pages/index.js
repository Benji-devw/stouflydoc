import { useState, useEffect } from 'react';
import { getTracks } from './api/tracks';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import  AudioPlayer  from './comps/AudioPlayer';
import Link from 'next/link';



export default function Home({res, getCats, query}) {

  const [tracks, setTracks] = useState(res.props.res.state)
  const tracksCat = getCats.props.res;
  
  const categorySet = new Set(tracksCat.state.map(cat => cat.category));
  const catList = Array.from(categorySet).sort();
  const [catActive, setCatActive] = useState()

  useEffect(() => {
    setTracks(res.props.res.state)
    setCatActive(query.category)
  }, [res.props.res, query.category])


  return (
    <Layout page={'StouflyDoc'}>
      <div className="py-7 sm:flex sm:justify-center sm:items-center">
        <Link href={`/`} passHref >
          <button onClick={() => setCatActive(undefined)}
            className={`${catActive !== undefined ? 'category-btn' : 'category-btn-active'} m-2 text-white py-1 px-5 rounded-sm`}
          >All</button>
        </Link>

        {catList.map((cat, id) => (
          <Link key={id} href={`/?category=${cat}`} scroll={false} passHref >
            <button onClick={() => setCatActive(cat)}
              className={`${cat !== catActive ? 'category-btn' : 'category-btn-active'} m-2 text-white py-1 px-5 rounded-sm`}
            >{cat}</button>
          </Link>
        ))}
      </div>

      <div className={`${styles.grid} py-5`}>

        { tracks === undefined && tracks === [] ?
          (<div className="m-3">aucun résultat...</div>)
        :
          (tracks.map((track, id) => <AudioPlayer key={id} track={track} /> ))
        }
      </div>
    </Layout>
  )
}


export async function getServerSideProps({query}) {
  const res = await getTracks(query.category)
  const getCats = await getTracks()
  return { props: {res, getCats, query} }
}