import { useState, useEffect } from 'react';
import { getTracks, getAllTracks } from './api/tracks';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.scss';
import  AudioPlayer  from './comps/AudioPlayer';
import Link from 'next/Link';
// import { useRouter } from 'next/router';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
// import Filters from './comps/Filters';




export default function Home({res, allTracks, query}) {

// const router = useRouter()

  const [tracks, setTracks] = useState(res.props.res.state)
  const [limit, setLimit] = useState(8)
  const tracksCat = allTracks.props.res;
  
  const categorySet = new Set(tracksCat.state.map(cat => cat.category));
  const catList = Array.from(categorySet).sort();
  const [catActive, setCatActive] = useState()

  const [filters, setFilters] = useState({
    category: '',
    title: '',
    tags: '',
    tempo: '',
    reporter: '',
    yearCollection: '',
    limit: 4
  })


  const handleLoadMore = () => {
    setLimit(prevLimit => prevLimit + 8)
    // router.replace(`/?_limit=${limit+1}`, undefined, { shallow: false })
  }

  useEffect(() => {
    setTracks(res.props.res.state)
    setCatActive(query.category)

  }, [res.props.res, query.category])

  // console.log(limit);

  const [open, setOpen] = useState(true)

  return (
    <Layout page={'StouflyDoc'}>


      <div className={`${styles.accordionContainer} relative my-7 mt-10 sm:flex sm:justify-center sm:items-center`}>

        <button className="absolute left-0 mx-5 my-3 cursor-pointer" onClick={() => setOpen(!open)}>
          {!open ?
          <IoIosArrowDown className="animate-bounce text-2xl" />
          :<IoIosArrowUp className="text-2xl" />
          }
        </button>

        <div className={`${open ? styles.accordionOpened : styles.accordionClosed} row-auto px-16`}>
          <div className=" grid grid-cols-4 md:grid-cols-6">
            <Link href={`/`} scroll={false} passHref className="md:flex" >
              <button onClick={() => {setCatActive(undefined), setLimit(8)}} 
                type="button"
                className={`${catActive !== undefined ? 'category-btn' : 'category-btn-active'} w-full m-2 py-1 px-8`}
              >All</button>
            </Link>

            {catList.map((cat, id) => (
              // <Link key={id} href={`/?category=${cat}&_limit=${limit}`} scroll={false} passHref >
              <Link key={id} href={`/?category=${cat}`} scroll={false} passHref className="md:flex" >
                <button onClick={() => {setCatActive(cat), setLimit(8)}} 
                  type="button"
                  className={`${cat !== catActive ? 'category-btn' : 'category-btn-active'} w-full m-2 py-1 px-1`}
                >{cat}</button>
              </Link>
            ))}
          </div>
          {/* <div className="relative grid grid-cols-4 md:grid-cols-3">
            <Filters data={tracks} />
          </div> */}
        </div>
      </div>

      <div className={`${styles.grid} py-8`}>
        { tracks === undefined && tracks === [] ?
          (<div className="m-3">aucun résultat...</div>)
        :
          (tracks.slice(0, limit).map((track, id) => <AudioPlayer key={id} track={track} /> ))
        }

      </div>
      {tracks.length > limit && 
        <button onClick={handleLoadMore} type="button" className={`${styles.loadmore} m-5 text-gray-500 py-2 px-5 rounded-sm`}>
          Load more
        </button>
      }
    </Layout>
  )
}


export async function getServerSideProps({query}) {
  const res = await getTracks(query)
  const allTracks = await getAllTracks()
  return { props: {res, allTracks, query} }
}