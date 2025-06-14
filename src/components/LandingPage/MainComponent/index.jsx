import React from "react";
import { motion } from "framer-motion";
import { RWebShare } from "react-web-share";
import { Link } from "react-router-dom";
import Button from "../../Common/Button";
import gradient from "../../../assets/gradient.png";
import iphone from "../../../assets/iphone.png";
import "./styles.css";

function MainComponent() {
  return (
    <>
      <div className="main-flex">
        <div className="info-landing">
          <motion.h1
            className="heading1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Track Crypto
          </motion.h1>
          <motion.h1
            className="heading2"
            initial={{ opacity: 0, scale: 0 , rotateY:"0deg"}}
            animate={{ opacity: 1, scale: 1 ,rotateY: "360deg"}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Real Time.
          </motion.h1>
          <motion.p
            className="info-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Track crypto through a public api in real time. 
            <br />
            Get detailed information about every cryptocurrency!
          </motion.p>
          <motion.div
            className="btn-flex"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link to="/dashboard">
              <Button text="Dashboard" />
            </Link>
            <RWebShare
              data={{
                text: "CryptoDashboard made using React JS.",
                url: "https://crypto-tracker-omega-rouge.vercel.app/",
                title: "CryptoTracker.",
              }}
            >
              <Button text="Share App" outlined={true} />
            </RWebShare>
          </motion.div>
        </div>
        <div className="gradient-div">
          <motion.img 
            src={gradient} 
            className="gradient" 
            alt="Gradient Background"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.img
            src={iphone}
            className="iphone"
            alt="iPhone Mockup"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: [-10, 10], opacity: 1 }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              },
              opacity: {
                duration: 1
              }
            }}
          />
        </div>
      </div>
   
    </>
  );
}

export default MainComponent;