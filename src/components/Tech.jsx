import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { BallCanvas } from "./canvas";

// eslint-disable-next-line react-refresh/only-export-components
const Tech = () => {
  return (
    <>
      <h2 className={`${styles.sectionHeadText}`}>My Skills</h2>
      <div className="flex flex-row flex-wrap justify-center gap-10 mt-20">
        {technologies.map((technology) => (
          <div className="w-28 h-28" key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default SectionWrapper(Tech, "");
