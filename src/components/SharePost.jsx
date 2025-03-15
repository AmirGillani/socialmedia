import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Profile from "../assets/img/profileImg.jpg";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { MdCancel } from "react-icons/md";

export default function Modal({ close }) {
  const [imgURL, setImgURL] = useState(null);

  const [videoURL, setVideoURL] = useState(null);

  const imgRef = useRef(null);

  const videoRef = useRef(null);

  function uploadImg(e) {
    const img = e.target.files[0];

    if (img) {
      const imgURL = URL.createObjectURL(img);

      setImgURL(imgURL);
    }
  }

  function uploadVideo(e) {
    const video = e.target.files[0];

    if (video) {
      const videoURL = URL.createObjectURL(video);

      setVideoURL(videoURL);
    }
  }

  // Disable scrolling on the body when modal is open
  useEffect(() => {
    // Add the overflow-hidden class to the body when the modal is opened
    document.body.style.overflow = "hidden";

    // Clean up by removing the overflow-hidden class when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); // Empty dependency array ensures it runs only once when the modal is mounted

  // Animation variants for the modal
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <div className="w-screen h-screen bg-black/80  inset-0 absolute z-20 flex justify-center items-center">
      <motion.div
        className="bg-white w-[50%] rounded-xl py-3 px-10 flex flex-col gap-2 md:mt-10 mt-20 justify-center items-center relative z-30"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <span
          className="self-end font-semibold text-black cursor-pointer"
          onClick={() => close()}
        >
          X
        </span>
        <div className="bg-white rounded-2xl p-3 flex w-[100%] justify-between relative z-10">
         
            <img
              src={Profile}
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
        

          <div className="w-full px-2 flex flex-col">
            <input
              type="text"
              placeholder="What's happening"
              className="w-full h-10 bg-input-color p-1 rounded-lg outline-none"
            />
            <div className="flex justify-between w-full mt-2">
              <div
                className="flex justify-center items-center cursor-pointer"
                onClick={() => imgRef.current.click()}
              >
                <MdPhotoSizeSelectActual
                  size={22}
                  className="text-green-700 mr-1"
                />
                <span className="text-green-700">Photo</span>
              </div>
              <div
                className="flex justify-center items-center cursor-pointer"
                onClick={() => videoRef.current.click()}
              >
                <FaVideo size={22} className="text-purple-700 mr-1" />
                <span className="text-purple-700">Video</span>
              </div>
              <div className="md:flex hidden justify-center items-center cursor-pointer">
                <FaLocationDot size={22} className="text-red-700 mr-1" />
                <span className="text-red-700">Location</span>
              </div>
              <div className="md:flex hidden justify-center items-center cursor-pointer">
                <SlCalender size={22} className="text-yellow-700 mr-1" />
                <span className="text-yellow-700">Schedule</span>
              </div>
              <div className="flex justify-center items-center cursor-pointer">
                <button className="bg-gradient-to-b from-[#f99827] to-[#f95f35] text-white w-16 p-0.5 rounded-sm cursor-pointer hover:bg-gradient-to-b hover:from-white hover:to-white hover:border-orange hover:border-2 hover:text-orange">
                  Share
                </button>
              </div>

              <input
                type="file"
                name="img-upload"
                className="hidden"
                ref={imgRef}
                onChange={uploadImg}
              />

              <input
                type="file"
                name="img-upload"
                className="hidden"
                ref={videoRef}
                onChange={uploadVideo}
              />
            </div>
          </div>
        </div>

        {imgURL && (
          <div className="relative mt-6 w-[80%]">
            <MdCancel
              className="absolute top-1.5 left-1.5 text-white cursor-pointer"
              onClick={() => setImgURL(null)}
            />
            <img
              src={imgURL}
              className="object-cover w-full max-h-[20rem] rounded-2xl"
            />
          </div>
        )}

        {videoURL && (
          <div className="relative mt-6 w-[80%]">
            <MdCancel
              className="absolute top-1.5 left-1.5 text-white cursor-pointer z-10"
              onClick={() => setVideoURL(null)}
            />
            <video
              src={videoURL}
              className="object-cover w-full max-h-[20rem] rounded-2xl"
              controls // If you want to give users controls like play, pause, etc.
            >
              Sorry, your browser does not support embedded videos.
            </video>
          </div>
        )}
      </motion.div>
    </div>
  );
}
