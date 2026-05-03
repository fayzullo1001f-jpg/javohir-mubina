import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import "./App.css";

import musicFile from "./music/МОТ_Когда_мужчина_влюблён_Премьера_клипа,_2024.mp3";
import play from "./img/circle-play-solid-full.svg";
import pause from "./img/circle-pause-solid-full.svg";
import cake from "./img/Mens-wedding-ring.jpg";
import restaurant from "./img/da7d1b4bfae1384f047487ef98e8d13ced770206_x3.jpg";
import ring from "./img/8_4_400637-177119674654053.jpeg";
import bride from "./img/a1.webp";
import flower from "./img/flower.jpg";

/* ================= TIMER ================= */
const Timer = React.memo(({ time }) => {
  return (
      <div className="timer">
        <div className="t-item">
          <span>{String(time.d).padStart(2, "0")}</span>
          <small>kun</small>
        </div>

        <b>:</b>

        <div className="t-item">
          <span>{String(time.h).padStart(2, "0")}</span>
          <small>soat</small>
        </div>

        <b>:</b>

        <div className="t-item">
          <span>{String(time.m).padStart(2, "0")}</span>
          <small>minut</small>
        </div>

        <b>:</b>

        <div className="t-item">
          <span>{String(time.s).padStart(2, "0")}</span>
          <small>sekund</small>
        </div>
      </div>
  );
});

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const [time, setTime] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  const weddingDate = useMemo(
      () => new Date(2026, 7, 22, 18, 0, 0).getTime(),
      []
  );

  /* ================= TIMER LOGIC (OPTIMIZED) ================= */
  useEffect(() => {
    const tick = () => {
      const diff = weddingDate - Date.now();
      if (diff <= 0) return;

      const newTime = {
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      };

      setTime(prev => {
        if (prev.s === newTime.s) return prev; // 🔥 no unnecessary render
        return newTime;
      });
    };

    tick(); // initial run
    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, [weddingDate]);

  /* ================= MUSIC ================= */
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying(!isPlaying);
  };

  /* ================= ANIMATION ================= */
  const textAnim = {
    hidden: { opacity: 0, y: 50 },
    show: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.8 },
    }),
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
      <div className="app">

        {/* AUDIO */}
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

          <motion.p className="date">22 AUGUST 2026</motion.p>

          <motion.div
              className="scroll"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
          >
            ↓ scroll
          </motion.div>
        </motion.section>

        {/* INFO */}
        <motion.section
            className="section sec"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
        >

          {/* MUSIC */}
          <motion.div
              className={`music ${isPlaying ? "playing" : ""}`}
              onClick={toggleMusic}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
          >
            <img
                src={isPlaying ? pause : play}
                alt="music"
                className="music-icon-img"
            />
          </motion.div>

          <h2>TO‘Y TAKLIFNOMASI</h2>

          <p className="invite-text">
            Assalomu alaykum! <br />
            Hurmatli mehmonimiz! <br />
            Sizni nikoh to'yimizga taklif etamiz
          </p>

          <div className="div">
            <img className="flower" src={flower} alt="" />
            <h3>Javohir & Mubina</h3>
          </div>

          {/* TIMER */}
          <Timer time={time} />

        </motion.section>

        {/* WEDDING DAY */}
        <motion.section
            className="section sec"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
        >

          <h2>WEDDING DAY</h2>

          <motion.img
              className="cake"
              src={cake}
              alt=""
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
            viewport={{ once: true }}
        >

          <h2>LOKATSIYA</h2>

          <div className="location-card">
            <div className="map-box">
              <iframe
                  title="map"
                  src="https://www.google.com/maps?q=Yakka+Saroy+Restaurant+Tashkent&output=embed"
              />
            </div>

            <div className="img-box">
              <img src={restaurant} alt="" />
              <div className="overlay">
                <h3>Yakka Saroy</h3>
                <p>Toshkent</p>
              </div>
            </div>
          </div>

        </motion.section>

        {/* TIMELINE */}
        <motion.section
            className="section sec"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
        >

          <h2>TO‘Y DASTURI</h2>

          <div className="timeline-v2">
            {[
              ["17:00", "Mehmonlar"],
              ["18:00", "Boshlanish"],
              ["19:00", "Marosim"],
              ["22:00", "Tort 🎂"]
            ].map(([t, e], i) => (
                <div className="timeline-item-v2" key={i}>
                  <div className="dot"></div>
                  <div className="content">
                    <div className="time">{t}</div>
                    <div className="event">{e}</div>
                  </div>
                </div>
            ))}
          </div>

          <img className="ring" src={ring} alt="" />

        </motion.section>

        {/* FOOTER */}
        <motion.section
            className="footer-v2"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
        >

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