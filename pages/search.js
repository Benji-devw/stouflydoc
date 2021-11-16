import React, { useEffect, useState } from "react";
import { getAllTracks } from './api/tracks';
import Layout from '@/components/Layout';
import styles from '@/styles/Search.module.scss';
import AudioPlayer from "./comps/AudioPlayer";


export default function Currency({ res, query}) {
    const [tracks, setTracks] = useState(res.props.res.state)

    /***************************/
    /***** SearchBar Filters *****/
    const [searchEnter, setSearchEnter] = useState(query.query)
    const [mounted, setMounted] = useState(true)
  
    useEffect(() => {
      setSearchEnter(query.query)
      const searchBar = () => {
        const fullListMap = tracks.map(prod => prod)
        let fullList = fullListMap.flat()
        let term = searchEnter.toLowerCase()
          setTracks(fullList.filter(track => 
            track.title.toLowerCase().indexOf(term) > -1 ||
            track.tags.toLowerCase().indexOf(term) > -1 ||
            track.reporter.toLowerCase().indexOf(term) > -1
          ))
          setMounted(true)
        }
        if(mounted) {
          searchBar()
          setMounted(false)
      }
      if (query.query !== searchEnter) return window.location.reload(false);
    }, [query.query, tracks, searchEnter, mounted])

    // console.log(tracks);
    // console.log(query.query);

    return (
      <Layout>
        <div className={`${styles.grid} flex my-2 px-5 text-white flex-wrap`}>
          <div  className={`w-full mx-4 my-5 sm:flex sm:p-0`}>
              <h2 className="text-left text-4xl text-white">Resultat pour : {query.query} </h2>
          </div>

          <div className={`${styles.separate} w-full mx-3 my-2`}></div>
          
          <div  className={`w-full mx-4 sm:flex sm:p-0`}>
              <h3 className="text-left text-2xl text-white"> ... trouvé ({tracks.length}) </h3>
          </div>

          <div className={`${styles.grid}`}>
              { tracks === undefined && tracks === [] ?
                  (<div className="m-3">aucun résultat...</div>)
              :
                  (tracks.map((track, id) => <AudioPlayer key={id} track={track} /> ))
              }
          </div>
        </div>
      </Layout>
    )
}


export async function getServerSideProps({ query }) {
  const res = await getAllTracks()
  return { props: {res, query} }
  }