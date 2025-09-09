import React from "react";
export default function Cracker() {
  return (
    <>
      <div className="confetti-container">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`confetti confetti${i + 1}`}></div>
        ))}
      </div>
      <style jsx>{`
        .confetti-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: visible;
          pointer-events: none;
        }
        /* 正三角形の作り方 */
        .confetti {
          position: absolute;
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-bottom: 12px solid #f94144; /* 色は個別に変えます */
          opacity: 0;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-duration: 5s;
          animation-fill-mode: forwards;
        }
        /* 色・初期位置・アニメーション遅延・アニメーション名 */
        .confetti1 {
          top: -20px;
          left: 10%;
          border-bottom-color: #f94144;
          animation-delay: 0s;
          animation-name: fall1;
        }
        .confetti2 {
          top: -30px;
          left: 25%;
          border-bottom-color: #f3722c;
          animation-delay: 0.5s;
          animation-name: fall2;
        }
        .confetti3 {
          top: -25px;
          left: 40%;
          border-bottom-color: #f9c74f;
          animation-delay: 1s;
          animation-name: fall3;
        }
        .confetti4 {
          top: -20px;
          left: 60%;
          border-bottom-color: #90be6d;
          animation-delay: 1.5s;
          animation-name: fall4;
        }
        .confetti5 {
          top: -15px;
          left: 75%;
          border-bottom-color: #577590;
          animation-delay: 2s;
          animation-name: fall5;
        }
        .confetti6 {
          top: -30px;
          left: 15%;
          border-bottom-color: #f94144;
          animation-delay: 2.5s;
          animation-name: fall1;
        }
        .confetti7 {
          top: -20px;
          left: 35%;
          border-bottom-color: #f3722c;
          animation-delay: 3s;
          animation-name: fall2;
        }
        .confetti8 {
          top: -25px;
          left: 50%;
          border-bottom-color: #f9c74f;
          animation-delay: 3.5s;
          animation-name: fall3;
        }
        .confetti9 {
          top: -20px;
          left: 70%;
          border-bottom-color: #90be6d;
          animation-delay: 4s;
          animation-name: fall4;
        }
        .confetti10 {
          top: -15px;
          left: 85%;
          border-bottom-color: #577590;
          animation-delay: 4.5s;
          animation-name: fall5;
        }
        /* 落下アニメーション（上下左右の揺れ＋回転＋フェードイン・アウト） */
        @keyframes fall1 {
          0% {
            opacity: 0;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(10px, 100px) rotate(45deg) scale(1.1);
            opacity: 1;
          }
          90% {
            opacity: 0;
            transform: translate(15px, 180px) rotate(90deg) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translate(15px, 180px) rotate(90deg) scale(0.8);
          }
        }
        @keyframes fall2 {
          0% {
            opacity: 0;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(-10px, 110px) rotate(-30deg) scale(1);
            opacity: 1;
          }
          90% {
            opacity: 0;
            transform: translate(-15px, 190px) rotate(-60deg) scale(0.7);
          }
          100% {
            opacity: 0;
            transform: translate(-15px, 190px) rotate(-60deg) scale(0.7);
          }
        }
        @keyframes fall3 {
          0% {
            opacity: 0;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(5px, 90px) rotate(20deg) scale(1.2);
            opacity: 1;
          }
          90% {
            opacity: 0;
            transform: translate(10px, 170px) rotate(40deg) scale(0.9);
          }
          100% {
            opacity: 0;
            transform: translate(10px, 170px) rotate(40deg) scale(0.9);
          }
        }
        @keyframes fall4 {
          0% {
            opacity: 0;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(-5px, 95px) rotate(-25deg) scale(1.1);
            opacity: 1;
          }
          90% {
            opacity: 0;
            transform: translate(-10px, 185px) rotate(-50deg) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translate(-10px, 185px) rotate(-50deg) scale(0.8);
          }
        }
        @keyframes fall5 {
          0% {
            opacity: 0;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(0, 100px) rotate(30deg) scale(1);
            opacity: 1;
          }
          90% {
            opacity: 0;
            transform: translate(5px, 180px) rotate(60deg) scale(0.7);
          }
          100% {
            opacity: 0;
            transform: translate(5px, 180px) rotate(60deg) scale(0.7);
          }
        }
      `}</style>
    </>
  );
}
