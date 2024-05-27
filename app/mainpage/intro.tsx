import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFile } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faFacebook, faXTwitter, faInstagram, faSpotify, faYoutube, faGithub } from '@fortawesome/free-brands-svg-icons';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface IntroSectionProps {
  language: string;
  allowEdit: boolean;
}

interface LanguageStrings {
  fullName: string;
  latinName?: string;
  shortAboutMe: string;
  email: string;
  linkedin: string;
  github: string;
  facebook: string;
  xtwitter: string;
  instagram: string;
  spotify: string;
  youtube: string;
  musixmatch: string;
  resume: string;
}

interface Strings {
  [key: string]: LanguageStrings;
}

const IntroSection: React.FC<IntroSectionProps> = ({ language, allowEdit }) => {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [strings, setStrings] = useState<Strings>({});
  const [showLatinName, setShowLatinName] = useState(false);

  useEffect(() => {
    const fetchStrings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "language_strings"));
        const data: { [key: string]: any } = {};
        querySnapshot.forEach((doc) => {
          data[doc.id] = doc.data();
        });
        setStrings(data);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };
  
    fetchStrings();
  }, []);

  useEffect(() => {
    setShowLatinName(language === 'jp');
  }, [language]);

  const handleMouseEnter = (text: string) => {
    setTooltip(text);
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
<section id="intro" className="w-full min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 relative py-10">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start justify-between px-4 md:px-0">
        {/* First Column */}
        <div className="flex flex-col items-center text-center md:items-end md:text-right w-full md:w-1/2 my-auto">
        {/* Name */}
        <h1 id="fullName" className={`${allowEdit ? 'hidden' : 'block'} text-3xl sm:text-5xl font-bold mx-5 md:mx-10`}>
          {strings[language]?.fullName}
        </h1>
        <textarea id="fullNameTextArea" className={`${allowEdit ? 'block' : 'hidden'} text-3xl sm:text-5xl font-bold mx-5 md:mx-10 text-center md:text-right`} defaultValue={strings[language]?.fullName} />
          {showLatinName && <h3 className='mt-3 font-semibold italic mx-5 md:mx-10'>({strings[language]?.latinName})</h3>}
          <section id="shortAboutMe" className="text-lg w-full sm:text-xl mx-5 md:mx-10 italic">
            <p className={`${allowEdit ? 'hidden' : 'block'} mt-10`}>{strings[language]?.shortAboutMe}</p>
            <textarea id="shortAboutMeTextArea" className={`${allowEdit ? 'block' : 'hidden'} text-lg mt-5 sm:text-xl italic text-center md:text-right`} defaultValue={strings[language]?.shortAboutMe} style={{ width: '100%', height: '150px' }}/>
          </section>
          <div className="mt-10 flex flex-row space-x-2 mx-5 md:mx-10">
            <div className="relative">
              <a href="mailto:eleazar.galope@gmail.com" className="text-gray-300 hover:text-blue-500 flex items-center"
                 onMouseEnter={() => handleMouseEnter(strings[language]?.email)}
                 onMouseLeave={handleMouseLeave}>
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              </a>
              {tooltip === strings[language]?.email && (
                <div className="bg-gray-800 text-white py-1 px-2 rounded absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-100 pointer-events-none transition-opacity duration-300 z-50 flex items-center justify-center">
                  <p className="text-xs">{strings[language]?.email}</p>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 rotate-45 bg-gray-800"></div>
                </div>
              )}
            </div>
            <div className="relative">
              <a href="https://www.linkedin.com/in/eleazar-galope/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 flex items-center"
                 onMouseEnter={() => handleMouseEnter(strings[language]?.linkedin)}
                 onMouseLeave={handleMouseLeave}>
                <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
              </a>
              {tooltip === strings[language]?.linkedin && (
                <div className="bg-gray-800 text-white py-1 px-2 rounded absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-100 pointer-events-none transition-opacity duration-300 z-50 flex items-center justify-center">
                  <p className="text-xs">{strings[language]?.linkedin}</p>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 rotate-45 bg-gray-800"></div>
                </div>
              )}
            </div>
            <div className="relative">
              <a href="https://github.com/ShallowMachinery" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 flex items-center"
                 onMouseEnter={() => handleMouseEnter(strings[language]?.github)}
                 onMouseLeave={handleMouseLeave}>
                <FontAwesomeIcon icon={faGithub} className="mr-2" />
              </a>
              {tooltip === strings[language]?.github && (
                <div className="bg-gray-800 text-white py-1 px-2 rounded absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-100 pointer-events-none transition-opacity duration-300 z-50 flex items-center justify-center">
                  <p className="text-xs">{strings[language]?.github}</p>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 rotate-45 bg-gray-800"></div>
                </div>
              )}
            </div>
            <div className="relative">
              <a href="https://www.facebook.com/eleazargalope0/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 flex items-center"
                 onMouseEnter={() => handleMouseEnter(strings[language]?.facebook)}
                 onMouseLeave={handleMouseLeave}>
                <FontAwesomeIcon icon={faFacebook} className="mr-2" />
              </a>
              {tooltip === strings[language]?.facebook && (
                <div className="bg-gray-800 text-white py-1 px-2 rounded absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-100 pointer-events-none transition-opacity duration-300 z-50 flex items-center justify-center">
                  <p className="text-xs">{strings[language]?.facebook}</p>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 rotate-45 bg-gray-800"></div>
                </div>
              )}
            </div>
            <div className="relative">
              <a href="https://x.com/_shaluma" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 flex items-center"
                 onMouseEnter={() => handleMouseEnter(strings[language]?.xtwitter)}
                 onMouseLeave={handleMouseLeave}>
                <FontAwesomeIcon icon={faXTwitter} className="mr-2" />
              </a>
              {tooltip === strings[language]?.xtwitter && (
                <div className="bg-gray-800 text-white py-1 px-2 rounded absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-100 pointer-events-none transition-opacity duration-300 z-50 flex items-center justify-center">
                  <p className="text-xs">{strings[language]?.xtwitter}</p>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 rotate-45 bg-gray-800"></div>
                </div>
              )}
            </div>
            <div className="relative">
              <a href="https://www.instagram.com/keepers2718/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 flex items-center"
                 onMouseEnter={() => handleMouseEnter(strings[language]?.instagram)}
                 onMouseLeave={handleMouseLeave}>
                <FontAwesomeIcon icon={faInstagram} className="mr-2" />
              </a>
              {tooltip === strings[language]?.instagram && (
                <div className="bg-gray-800 text-white py-1 px-2 rounded absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-100 pointer-events-none transition-opacity duration-300 z-50 flex items-center justify-center">
                  <p className="text-xs">{strings[language]?.instagram}</p>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 rotate-45 bg-gray-800"></div>
                </div>
              )}
            </div>
            <div className="relative">
              <a href="https://open.spotify.com/artist/5MMvI5sqs62xL24Vu9OYyy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 flex items-center"
                 onMouseEnter={() => handleMouseEnter(strings[language]?.spotify)}
                 onMouseLeave={handleMouseLeave}>
                <FontAwesomeIcon icon={faSpotify} className="mr-2" />
              </a>
              {tooltip === strings[language]?.spotify && (
                <div className="bg-gray-800 text-white py-1 px-2 rounded absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-100 pointer-events-none transition-opacity duration-300 z-50 flex items-center justify-center">
                  <p className="text-xs">{strings[language]?.spotify}</p>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 rotate-45 bg-gray-800"></div>
                </div>
              )}
            </div>
            <div className="relative">
              <a href="https://youtube.com/EleazarGalope" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 flex items-center"
                 onMouseEnter={() => handleMouseEnter(strings[language]?.youtube)}
                 onMouseLeave={handleMouseLeave}>
                <FontAwesomeIcon icon={faYoutube} className="mr-2" />
              </a>
              {tooltip === strings[language]?.youtube && (
                <div className="bg-gray-800 text-white py-1 px-2 rounded absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-100 pointer-events-none transition-opacity duration-300 z-50 flex items-center justify-center">
                  <p className="text-xs">{strings[language]?.youtube}</p>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 rotate-45 bg-gray-800"></div>
                </div>
              )}
            </div>
            <div className="relative">
              <a href="https://www.musixmatch.com/profile/3vUCAOOV5fvpMaku-UHUOcJItuaBS4n4Q6jiTWIS2mlt5EHI2vGtYSmwQyoj4r37a3z5F46H7kxDFzu9Zm0_VngrBvmMXizOQI7qEG4B645zulmJ0dVwbXtRLMx_hzaKcWeovlAELYXi4p5UhcrjoJkVsjOPRwH_kp9xXhBNDs0" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 flex items-center"
                 onMouseEnter={() => handleMouseEnter(strings[language]?.musixmatch)}
                 onMouseLeave={handleMouseLeave}>
              <svg viewBox="4 4 40 40" xmlns="http://www.w3.org/2000/svg" className="mr-2 w-4 h-4 fill-current">
                <path className="c" d="m5.5,31.2L36.5,7.1c2.4-1.9,6-.2,6,2.9v28c0,3.1-3.5,4.8-6,2.9L5.5,16.8"></path>
                <path className="c" d="m42.5,31.2L11.5,7.1c-2.4-1.9-6-.2-6,2.9v28c0,3.1,3.5,4.8,6,2.9l31-24.1"></path>
              </svg>
              </a>
              {tooltip === strings[language]?.musixmatch && (
                <div className="bg-gray-800 text-white py-1 px-2 rounded absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-100 pointer-events-none transition-opacity duration-300 z-50 flex items-center justify-center">
                  <p className="text-xs text-center">{strings[language]?.musixmatch}</p>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 rotate-45 bg-gray-800"></div>
                </div>
              )}
            </div>
            <div className="relative">
              <a href="https://firebasestorage.googleapis.com/v0/b/purrfolio-f6b4c.appspot.com/o/CV.pdf?alt=media&token=0c73fb44-1d49-44ee-9416-5e915acec741" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 flex items-center"
                 onMouseEnter={() => handleMouseEnter(strings[language]?.resume)}
                 onMouseLeave={handleMouseLeave}>
                <FontAwesomeIcon icon={faFile} className="mr-2" />
              </a>
              {tooltip === strings[language]?.resume && (
                <div className="bg-gray-800 text-white py-1 px-2 rounded absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-100 pointer-events-none transition-opacity duration-300 z-50 flex items-center justify-center">
                  <p className="text-xs text-center">{strings[language]?.resume}</p>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 rotate-45 bg-gray-800"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Second Column */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 mt-10 md:mt-0">
          <img 
            src="/portrait.jpeg" 
            alt="Eleazar James Galope" 
            className="rounded-lg w-full max-w-sm mx-auto md:mx-0" 
          />
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
