import { useRef } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => audioRef.current?.play();
  const handlePause = () => audioRef.current?.pause();

  return (
    <div className="audio-container">
      <div className='sub-text'>Music</div>
      <div className="audio-player">
        <audio ref={audioRef} loop src="https://dn721901.ca.archive.org/0/items/05-underground/01%20Overworld%20Day.mp3" />
        <button onClick={handlePlay}>Play Music</button>
      </div>
      <div className='audio-pause'>
        <button onClick={handlePause}>Pause Music</button>
      </div>
    </div>
  );
}