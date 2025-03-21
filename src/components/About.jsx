import React from "react";
import { Tilt } from "react-tilt";
import { styles } from "../styles";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// eslint-disable-next-line react-refresh/only-export-components
const ServiceCard = ({ title, index, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className={
          "w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
        }
      >
        <div
          options={{ max: 45, sclae: 1, speed: 450 }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>About Me</h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-4xl leading-[30px]"
      >
        As a frontend developer, I have a strong interest in modern web
        technologies and continuously work on improving my skills. I am
        proficient in HTML, CSS, JavaScript, React.js, and TypeScript. I focus
        on creating user-friendly interfaces and enhance my design and animation
        skills using Framer and Figma. I developed a to-do application using
        React Hooks and Bootstrap, and I built a website with Framer,
        integrating a CMS to add a blog section. In addition to coding, I also
        prioritize performance optimization, responsive design, and SEO.
      </motion.p>
      <div className="mt-20 flex items-center justify-between flex-wrap ">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default SectionWrapper(About, "about");
