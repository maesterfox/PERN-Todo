import React from "react";
import foxLogo from "./logo192.png";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`mb-10 px-4 text-center ${styles.footer}`}>
      <img
        src={foxLogo}
        alt="David Fox Logo"
        className={`h-8 w-10 inline-block mb-2 ${styles.logo}`}
      />
      <small className={`mb-2 block text-xs ${styles.text}`}>
        &copy; 2024 David Fox. All rights reserved.
      </small>
      <p className="text-xs">
        <span className={`font-semibold ${styles.about}`}>
          About this website:
        </span>{" "}
        built with React & Bootstrap, PostGreSQL, Express.js, and hosted on
        Vercel.
      </p>
    </footer>
  );
}
