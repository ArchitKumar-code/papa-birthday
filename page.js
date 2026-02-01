"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

export default function PapaBirthday() {
  const audioRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [fade, setFade] = useState(true);

  // Make sure these EXACT filenames exist in public folder
  const images = ["/papa.jpg", "/papa2.jpg", "/papa3.jpg"];

  // Smooth slideshow with fade
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentImage((prev) =>
          prev + 1 >= images.length ? 0 : prev + 1
        );
        setFade(true);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const celebrate = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    confetti({
      particleCount: 300,
      spread: 160,
      origin: { y: 0.6 },
    });

    setShowPopup(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #141E30, #243B55)",
        padding: "20px",
        textAlign: "center",
        color: "white",
      }}
    >
      <audio ref={audioRef} src="/birthday.mp3" loop />

      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "30px",
          fontWeight: "bold",
        }}
      >
        🎉 Happy Birthday Papa 🎉
      </h1>

      <img
        src={images[currentImage]}
        alt="Papa"
        style={{
          width: "320px",
          height: "400px",
          objectFit: "cover",
          borderRadius: "20px",
          boxShadow: "0 15px 50px rgba(0,0,0,0.6)",
          opacity: fade ? 1 : 0,
          transition: "opacity 0.4s ease-in-out",
        }}
      />

      <div
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          padding: "30px",
          borderRadius: "20px",
          marginTop: "30px",
          maxWidth: "600px",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.6",
            color: "#f0f0f0",
          }}
        >
          Dear Papa,
          <br /><br />
          You are our strength, our guide, and our greatest blessing.
          May this year bring you health, peace, and endless success.
          We love you more than words can express ❤️
        </p>

        <button
          onClick={celebrate}
          style={{
            marginTop: "25px",
            padding: "14px 30px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            background: "#ff4b5c",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Celebrate 🎂
        </button>
      </div>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "50px",
              borderRadius: "25px",
              textAlign: "center",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 25px 70px rgba(0,0,0,0.5)",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                color: "#111",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              🎆 Surprise Papa! 🎆
            </h2>

            <p
              style={{
                fontSize: "18px",
                color: "#333",
                lineHeight: "1.6",
                marginBottom: "30px",
              }}
            >
              Thank you for every sacrifice, every lesson, and every moment of love.
              We are so lucky to have you ❤️
            </p>

            <button
              onClick={() => setShowPopup(false)}
              style={{
                padding: "12px 25px",
                borderRadius: "10px",
                border: "none",
                background: "#ff4b5c",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}




