import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

// ==========================================
// 🎵 USER CONFIGURATION: Update your songs here
// ==========================================
export const SONGS_CONFIG = [
  {
    id: 1,
    title: 'Khat',
    artist: 'Navjot Ahuja',
    // Ensure you place the actual user-downloaded image in the public folder as khat.jpg
    bannerImg: '/khat.jpg',
    audioSrc: '/music/Navjot Ahuja - Khat (Official Audio).mp3'
  },
  {
    id: 2,
    title: 'Bairaan',
    artist: 'Banjaare',
    bannerImg: '/bairan.jpg',
    audioSrc: '/music/Bairan  Animated Love Story  Banjaare (Official Video).mp3'
  },
  {
    id: 3,
    title: 'Arz Kiya Hai',
    artist: 'Anuv Jain',
    bannerImg: '/arz.jpg',
    audioSrc: '/music/Anuv Jain - Arz Kiya Hai (Official Lyrical Video).mp3'
  },
  {
    id: 4,
    title: 'I Wanna Be Yours',
    artist: 'Arctic Monkeys',
    bannerImg: '/arctic.jpg',
    audioSrc: '/music/I Wanna Be Yours.mp3'
  },
  {
    id: 5,
    title: 'The Night We Met',
    artist: 'Lord Huron',
    bannerImg: '/lordhuron.jpg',
    audioSrc: '/music/Lord Huron - The Night We Met (Official Audio).mp3'
  }
];
// ==========================================

export default function NowHumming() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  // Initialize and handle global audio changes
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setProgress(audio.currentTime);
    const onEnded = () => handleNext(); // Auto-play next song on end

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
    };
  }, []);

  // Sync audio source when active index changes
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.src = SONGS_CONFIG[activeIndex].audioSrc;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch(e => console.log('Auto-play prevented:', e));
      }
    }
  }, [activeIndex]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Play prevented:', e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SONGS_CONFIG.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SONGS_CONFIG.length) % SONGS_CONFIG.length);
  }, []);

  // Format time (seconds to mm:ss)
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Drag handling for swipe gestures
  const handleDragEnd = (_, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Determine variant state based on index diff
  const getPosition = (index) => {
    const len = SONGS_CONFIG.length;
    const diff = index - activeIndex;
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -(len - 1)) return 'right1';
    if (diff === 2 || diff === -(len - 2)) return 'right2';
    if (diff === -1 || diff === len - 1) return 'left1';
    if (diff === -2 || diff === len - 2) return 'left2';
    return 'hidden';
  };

  // Framer Motion Carousel Variants
  const variants = {
    center: { x: '0%', scale: 1, zIndex: 10, opacity: 1, rotateY: 0, transition: { duration: 0.5 } },
    left1: { x: '-60%', scale: 0.85, zIndex: 8, opacity: 0.6, rotateY: 15, transition: { duration: 0.5 } },
    left2: { x: '-100%', scale: 0.7, zIndex: 6, opacity: 0.3, rotateY: 25, transition: { duration: 0.5 } },
    right1: { x: '60%', scale: 0.85, zIndex: 8, opacity: 0.6, rotateY: -15, transition: { duration: 0.5 } },
    right2: { x: '100%', scale: 0.7, zIndex: 6, opacity: 0.3, rotateY: -25, transition: { duration: 0.5 } },
    hidden: { scale: 0, opacity: 0, zIndex: 0 }
  };

  return (
    <section
      id="now-humming"
      // Inherits the dark site background natively
      className="relative min-h-screen py-32 px-6 flex flex-col justify-center overflow-hidden bg-transparent"
    >
      <div className="max-w-6xl mx-auto w-full z-10">

        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span
            className="text-sm font-semibold tracking-widest uppercase text-white/70 mb-2 block"
            style={{ fontFamily: 'Herkey, sans-serif' }}
          >
            What I listen to
          </span>
          <h2
            className="text-5xl sm:text-6xl font-bold mt-3 text-white drop-shadow-lg"
            style={{ fontFamily: 'Monograph, sans-serif' }}
          >
            Now Humming&nbsp;.....
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative h-[600px] w-full max-w-4xl mx-auto flex items-center justify-center perspective-[1000px] animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}>

          {SONGS_CONFIG.map((song, i) => {
            const position = getPosition(i);
            const isActive = position === 'center';

            return (
              <motion.div
                key={song.id}
                className={`absolute w-full max-w-sm rounded-[2rem] p-8 glass-card border flex flex-col items-center
                            bg-[#0a0a0a]/90 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden
                            ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
                variants={variants}
                initial="hidden"
                animate={position}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(i);
                    setIsPlaying(true);
                  }
                }}
              >
                {/* Subtle glow behind card content */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                {/* Spinning Retro Vinyl / Cassette */}
                <div className={`relative w-48 h-48 mb-8 rounded-full border border-black/80 bg-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-center flex-shrink-0 ${(isActive && isPlaying) ? 'animate-spin-slow' : ''}`}
                  style={{ animationDuration: '4s' }}>

                  {/* Vinyl Grooves Effects */}
                  <div className="absolute inset-2 rounded-full border-[12px] border-[#131313]/90 pointer-events-none" />
                  <div className="absolute inset-5 rounded-full border-[8px] border-[#181818]/90 pointer-events-none" />
                  <div className="absolute inset-10 rounded-full border-[4px] border-[#111111]/90 pointer-events-none" />

                  {/* The Music Banner (Center Tag) */}
                  <img
                    src={song.bannerImg}
                    alt={`${song.title} Album Banner`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="relative z-10 w-20 h-20 rounded-full object-cover border-[3px] border-[#222] shadow-inner pointer-events-none"
                  />

                  {/* The Center Spindle Hole */}
                  <div className="absolute z-20 w-3 h-3 bg-[#0a0a0a] rounded-full border-[1.5px] border-zinc-700 shadow-[inset_0_2px_4px_rgba(0,0,0,1)] pointer-events-none" />
                </div>

                {/* Song Info & Waveform */}
                <div className="w-full text-center flex flex-col items-center mb-6">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-2xl font-bold text-white tracking-wide" style={{ fontFamily: 'Monograph, sans-serif' }}>
                      {song.title}
                    </h3>

                    {/* Waveform Animation (Only on active playing card) */}
                    {(isActive && isPlaying) && (
                      <div className="flex items-end gap-[2px] h-4 pb-1">
                        {[1, 2, 3].map((bar) => (
                          <div
                            key={bar}
                            className="w-[3px] bg-white/80 rounded-t-sm animate-wave-bounce"
                            style={{ animationDelay: `${bar * 0.15}s` }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-[15px] text-white/70 tracking-widen" style={{ fontFamily: 'Herkey, sans-serif' }}>
                    {song.artist}
                  </p>
                </div>

                {/* Progress Bar Container - ONLY interactive if card is active */}
                <div className={`w-full mb-8 ${isActive ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-2 shadow-inner"
                    style={{ cursor: isActive ? 'pointer' : 'default' }}
                    onClick={(e) => {
                      if (!isActive || !audioRef.current) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      audioRef.current.currentTime = pos * duration;
                    }}>
                    <div
                      className="h-full bg-white rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                      style={{ width: `${(isActive ? (progress / duration) * 100 : 0) || 0}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-white/70 font-mono tracking-wider">
                    <span>{isActive ? formatTime(progress) : '0:00'}</span>
                    <span>{isActive ? formatTime(duration) : '0:00'}</span>
                  </div>
                </div>

                {/* Controls - ONLY active and visible correctly on active card */}
                <div className={`flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <button
                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                    className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform duration-300 shadow-[0_5px_20px_rgba(255,255,255,0.2)]"
                  >
                    {isPlaying ?
                      <Pause size={28} className="fill-current" /> :
                      <Play size={28} className="fill-current transform translate-x-0.5" />
                    }
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
