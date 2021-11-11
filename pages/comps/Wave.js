import { useEffect, useRef, useState } from 'react';
import Script from 'next/script'
import styles from '../../styles/AudioPlayer.module.css';
import {BsClock} from 'react-icons/bs';
import {AiOutlineDownload} from 'react-icons/ai';
import Link from 'next/Link';



export default function Wave (props) {

    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false)
    const [time, setTime] = useState(false)

    // Calcule Time
    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const milliseconds = Math.floor(secs * 1000);
        let returnedSeconds = 0;
        if (seconds < 10) {
            if (seconds === 0) { returnedSeconds = `0.${Math.floor(milliseconds / 10)}` } 
            else {  returnedSeconds = `0${seconds}` }
        } else {  returnedSeconds = `${seconds}`  }
        return minutes > 0 ? `${returnedMinutes} : ${returnedSeconds}` : ` ${returnedSeconds}s`;
    }


    useEffect(() => {
        wavesurfer.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: '#ff5901',
          progressColor: 'orange',
          barWidth: 3,
          responsive: true,
          hideScrollbar: true,
          barRadius: 1
      })
      
      wavesurfer.current.load(props.url);
      wavesurfer.current.on("ready", function() {
          wavesurfer.current.setVolume(1);
          setTime(wavesurfer.current.getDuration())
          if (isPlaying) {
              wavesurfer.current.play();
            } else {
                wavesurfer.current.pause();
            }
        });
        return () => wavesurfer.current.destroy();
    }, [wavesurfer, props.url, isPlaying])
    

    return (
        <>
            <div ref={waveformRef} onMouseEnter={() => setIsPlaying(true)} onMouseLeave={() =>setIsPlaying(false)}></div>

            <div className={`${styles.desc} text-gray-400 text-md text-left py-2`}> 
                ... <span>{props.tempo ? `${props.tempo}bpm` : ''} </span>
                <span><BsClock className='ml-2 mr-1' />{calculateTime(time)}</span>
                {/* <span><BsClock className='mx-2' />{time}</span> */}

                <span className={`${styles.download}`}>
                <Link href={props.url} download passHref><a><AiOutlineDownload /></a></Link>
                </span>
            </div>

            <Script src="https://unpkg.com/wavesurfer.js" strategy="beforeInteractive"></Script>
        </>

    )
}
