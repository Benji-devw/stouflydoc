import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/AudioPlayer.module.css';
import Wave from './Wave';
import { useRouter } from 'next/router';
import Link from 'next/Link';



export default function AudioPlayer (props) {

    // States
    const [tags, setTags] = useState([])

    useEffect(() => {
        setTags(props.track.tags.split(','))

    }, [props.track.tags])

    return (
        <div className={`${styles.audioPlayer} ${styles.fadeIn} max-w-xs overflow-hidden m-5 fadeIn`}>
            <div className={styles.wave} >
                <Wave url={props.track.url} id={props.track._id} tempo={props.track.tempo} />
                <div className="text-xl text-left py-2"> {props.track.title} </div>
            </div>
            {/* <div className="py-2">
                <span className={`${styles.desc} text-gray-400 text-md`}> {props.track.description} </span>
            </div> */}
            <div className={`${styles.tags} px-6`}>
                {tags.map((tag, id) => (
                    <Link key={id} href={`/search?query=${tag}`} >
                        <a>
                        <span className="inline-block bg-gray-200 rounded-full px-2 text-xs font-semibold text-gray-700 mr-1 mb-1">#{tag}</span>
                        </a>
                        </Link>
                ))}
            </div>
            <div className={`${styles.info} py-2 px-6`}>
            <span className={`text-gray-400 text-xs`}> By : {props.track.reporter} - Posted : {props.track.datePost.slice(0, 4)} </span>
            </div>
        </div>
    )
}
