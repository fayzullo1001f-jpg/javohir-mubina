import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import "./App.css";

import musicFile from "./music/music_for_videos-wedding-march-music-box-163683 (1).mp3";
import play from "./img/circle-play-solid-full.svg";
import pause from "./img/circle-pause-solid-full.svg";
import cake from "./img/Mens-wedding-ring.jpg";
import restaurant from "./img/da7d1b4bfae1384f047487ef98e8d13ced770206_x3.jpg";
import ring from "./img/8_4_400637-177119674654053.jpeg";
import bride from "./img/a1.webp";
import flower from "./img/flower.jpg"
function App() {
  const [timeLeft, setTimeLeft] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // ✅ 22 AUGUST 2026
  const weddingDate = useMemo(
      () => new Date(2026, 7, 22, 18, 0, 0).getTime(),
      []
  );

  // TIMER
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        setTimeLeft("Boshlanmoqda 🎉");
        clearInterval(interval);
      } else {
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const m = Math.floor((distance / (1000 * 60)) % 60);
        const s = Math.floor((distance / 1000) % 60);

        setTimeLeft(`${d} kun • ${h} soat • ${m} min • ${s} sek`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  // MUSIC
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying(prev => !prev);
  };

  // ANIMATIONS
  const textAnim = {
    hidden: { opacity: 0, y: 50 },
    show: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8
      }
    })
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
      <div className="app">

        <audio ref={audioRef} loop>
          <source src={musicFile} type="audio/mp3" />
        </audio>

        {/* HERO */}
        <motion.section className="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <motion.h1 custom={1} variants={textAnim} initial="hidden" animate="show">
            Javohir
          </motion.h1>

          <motion.span custom={2} variants={textAnim} initial="hidden" animate="show">
            &
          </motion.span>

          <motion.h1 custom={3} variants={textAnim} initial="hidden" animate="show">
            Mubina
          </motion.h1>

          {/* ✅ DATE UPDATED */}
          <motion.p
              className="date"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
          >
            22 AUGUST 2026
          </motion.p>

          <motion.div
              className="scroll"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
          >
            ↓ scroll
          </motion.div>

        </motion.section>

        {/* INFO */}
        <motion.section className="section sec" variants={fadeUp} initial="hidden" whileInView="show">

          <motion.div
              className={`music ${isPlaying ? "playing" : ""}`}
              onClick={toggleMusic}
              whileTap={{ scale: 0.9 }}
          >
            <img src={isPlaying ? pause : play} alt="music" />
          </motion.div>



          <h2>TO‘Y TAKLIFNOMASI</h2>

          <p className="invite-text">
            Assalomu alaykum!<br/>
            Hurmatli mehmonimiz!<br/>
            Sizni nikoh to'yimiz munosabati bilan<br/>
            bo'lib o'tadigan Visol oqshomiga<br/>
            taklif etamiz.
          </p>

          <div className="div">
            <img className="flower" src={flower} alt=""/>
            <h3>Javohir & Mubina</h3>
          </div>
          <motion.div
              key={timeLeft}
              className="timer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
          >
            {timeLeft}
          </motion.div>

        </motion.section>

        {/* WEDDING DAY */}
        <motion.section className="section sec" variants={fadeUp} initial="hidden" whileInView="show">

          <h2>WEDDING DAY</h2>

          <motion.img
              className="cake"
              src={cake}
              alt="cake"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="calendar-card">

            <div className="cal-header">
              <h3>AUGUST</h3>
              <span>2026</span>
            </div>

            <div className="cal-grid">
              {["Du", "Se", "Cho", "Pa", "Ju", "Sha", "Yak"].map(d => (
                  <div key={d} className="day-name">{d}</div>
              ))}

              {[...Array(5)].map((_, i) => <div key={i}></div>)}

              {Array.from({ length: 31 }, (_, i) => (
                  <div key={i} className={`day ${i + 1 === 22 ? "active" : ""}`}>
                    {i + 1}
                  </div>
              ))}
            </div>

          </div>

        </motion.section>

        {/* LOCATION */}
        <motion.section
            className="section sec"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
        >

          <h2 className="loc-title">Lokatsiya</h2>

          <div className="location-card">

            {/* MAP */}
            <div className="map-box">
              <iframe
                  title="map"
                  src="https://www.google.com/maps?q=Yakka+Saroy+Restaurant+Tashkent&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* IMAGE */}
            <div className="img-box">
              <img src={restaurant} alt="Yakka Saroy" />

              <div className="overlay">
                <h3>Yakka Saroy</h3>
                <p>Toshkent</p>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="btn-group">
              <button
                  className="map-btn"
                  onClick={() => window.open("https://www.google.com/maps?q=Yakka+Saroy+Restaurant+Tashkent")}
              >
                📍 Lokatsiyani ochish
              </button>


            </div>

          </div>

        </motion.section>
        {/* TIMELINE */}
        <motion.section className="section sec" variants={fadeUp} initial="hidden" whileInView="show">

          <h2>TO‘Y DASTURI</h2>

          <div className="timeline-v2">

            {[["17:00", "Mehmonlar"],
              ["18:00", "Boshlanish"],
              ["19:00", "Marosim"],
              ["22:00", "Tort 🎂"]
            ].map(([time, event], i) => (

                <div className="timeline-item-v2" key={i}>

                  <div className="dot"></div>

                  <div className="content">
                    <div className="time">{time}</div>
                    <div className="event">{event}</div>
                  </div>

                </div>

            ))}

          </div>

          <img className="ring" src={ring} alt="" />

        </motion.section>

        {/* FOOTER */}
        <motion.section className="footer-v2" variants={fadeUp} initial="hidden" whileInView="show">

          <div className="footer-card">

            <h1>Javohir & Mubina</h1>

            <div className="divider"></div>

            <img className="bride" src={bride} alt="" />

            <h2>Sizni kutamiz ❤️</h2>
            <p>+998 99 123 45 67</p>

          </div>

        </motion.section>

      </div>
  );
}

export default App;