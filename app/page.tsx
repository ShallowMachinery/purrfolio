"use client"

import React, { useState, useEffect } from 'react';
import './globals.css';
import Navbar from './components/Navbar';
import IntroSection from './mainpage/intro';
import ProficiencySection from './mainpage/proficiency';
import ProjectsSection from './mainpage/projects';
import HobbiesSection from './mainpage/hobbies';
import InquiriesSection from './mainpage/inquiries';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export default function Home() {
  const [language, setLanguage] = useState('en');
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'jp' : 'en'));
  };
  const [correctPass, setCorrectPass] = useState<string | null>(null);
  const [isPasscodeCorrect, setIsPasscodeCorrect] = useState(false);

  useEffect(() => {
    const fetchPasscode = async () => {
      const docRef = doc(db, 'auth', 'editpage');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCorrectPass(data.password);
      } else {
        console.error('No such document!');
      }
    };
    fetchPasscode();
  }, []);
  const pageEditAuth = () => {
    const pass = prompt("Enter password to edit the page:");
    if (pass === correctPass) {
      setIsPasscodeCorrect(true);
      alert("Page edit mode activated!");
    } else {
      setIsPasscodeCorrect(false);
      alert("Access denied.");
    }
  };
  const savePage = async () => {
    const fullNameTextArea = document.getElementById('fullNameTextArea') as HTMLTextAreaElement;
    const shortAboutMeTextArea = document.getElementById('shortAboutMeTextArea') as HTMLTextAreaElement;
    const longAboutMeTextArea = document.getElementById('longAboutMeTextArea') as HTMLTextAreaElement;

    try {
        const docRef = doc(db, 'language_strings', language);
        if (fullNameTextArea) {
            const newFullName = fullNameTextArea.value;
            await updateDoc(docRef, { fullName: newFullName });
        } else {
            console.error("Element 'fullNameTextArea' not found");
        }
        if (shortAboutMeTextArea) {
            const newShortAboutMe = shortAboutMeTextArea.value;
            await updateDoc(docRef, { shortAboutMe: newShortAboutMe });
        } else {
            console.error("Element 'shortAboutMeTextArea' not found");
        }
        if (longAboutMeTextArea) {
          const newLongAboutMe = longAboutMeTextArea.value;
          await updateDoc(docRef, { longAboutMe: newLongAboutMe });
      } else {
          console.error("Element 'longAboutMeTextArea' not found");
      }
        alert("Changes saved!");
        setIsPasscodeCorrect(false);
        window.location.reload();
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Navbar language={language} toggleLanguage={toggleLanguage} />
      <IntroSection language={language} allowEdit={isPasscodeCorrect} />
      <ProficiencySection language={language} allowEdit={isPasscodeCorrect} />
      <ProjectsSection language={language} />
      <HobbiesSection language={language} />
      <InquiriesSection language={language} />

      <div className="sticky-div ">
        <button onClick={isPasscodeCorrect ? savePage : pageEditAuth} className="admin-button">
          {isPasscodeCorrect ? "Save page 💾" : "Edit page ✏️"}
        </button>
      </div>
      <style jsx>{`
        .sticky-div {
          position: fixed;
          bottom: -62px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 200px;
          background-color: #1f2937;
          padding: 10px;
          border-radius: 10px 10px 0 0;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
          transition: bottom 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .sticky-div:hover {
          bottom: 0px;
        }

        .admin-button {
          background-color: #4a5568;
          border: none;
          color: white;
          padding: 10px 40px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 12px;
          margin: 4px 1px;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s ease-in-out;
        }

        .admin-button:hover {
          background-color: #2d3748;
        }

        @media (max-width: 640px) {
          .sticky-div {
            display: none;
          }
        }
      `}</style>

    </main>
  );
}
