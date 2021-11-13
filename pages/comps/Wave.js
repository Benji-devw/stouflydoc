import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/AudioPlayer.module.scss';
import {BsClock} from 'react-icons/bs';
import {AiOutlineDownload} from 'react-icons/ai';
import Link from 'next/Link';



export default function Wave (props) {

    const waveformRef = useRef(null);
    const wavesurfer = useRef(waveformRef);

    const [isPlaying, setIsPlaying] = useState(false)

    // Calcule Time
    const calculateCurrentTime = (value) => {
        const seconds = Math.floor(value % 60);
        const minutes = Math.floor((value / 60) % 60);
        if (seconds < 10) seconds = "0" + seconds;
        return minutes + ":" + seconds;
    }
    const calculateDuration = (value) => {
        const seconds = Math.floor(value % 60);
        const minutes = Math.floor((value / 60) % 60);
        const milliseconds = Math.floor(value * 1000);
        if (seconds < 10) {
            if (seconds <= 0) seconds = `0${Math.floor(milliseconds / 10)}`;
            else seconds = "0" + seconds;
        }
        return seconds > 0 ? minutes + ":" + seconds : seconds
    }


      const [duration, setDuration] = useState('0:00')
      const [currentTime, setCurrentTime] = useState('0:00')

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
            setDuration(calculateDuration(wavesurfer.current.getDuration()))
            wavesurfer.current.setVolume(1);
            if (isPlaying) wavesurfer.current.play();
            else wavesurfer.current.pause(); setCurrentTime('0:00');
        });
        wavesurfer.current.on("audioprocess", function() {
            setCurrentTime(calculateCurrentTime(wavesurfer.current.getCurrentTime()))
        })

        return () => wavesurfer.current.destroy();
    }, [wavesurfer, props.url, isPlaying])
    
    // console.log(duration);

    return (
        <>
            <div ref={waveformRef} onMouseEnter={() => setIsPlaying(true)} onMouseLeave={() =>setIsPlaying(false)}></div>
            <div className={`${styles.desc} text-gray-400 text-md text-left py-2`}> 
                ... <span>{props.tempo ? `${props.tempo}bpm` : ''} </span>
                <span><BsClock className='ml-2' /> {currentTime} /</span>
                <span> {duration }</span>
                <span className={`${styles.download}`}>
                <Link href={props.url} download passHref><a><AiOutlineDownload /></a></Link>
                </span>
            </div>
        </>
    )
}
