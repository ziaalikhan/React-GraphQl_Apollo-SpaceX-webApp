import React, { useEffect } from "react";
import { LaunchListQuery } from "../../generated/graphql";
import "./styles.css";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

export interface OwnProps {
  handleIdChange: (newId: number) => void;
}

interface Props extends OwnProps {
  data: LaunchListQuery;
}

const className = "LaunchList";

const LaunchList: React.FC<Props> = ({ data, handleIdChange }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div data-aos="slide-right" className={className}>
      <h3>Launches</h3>
      <ol className={`${className}__list`}>
        {!!data.launches &&
          data.launches.map(
            (launch, i) =>
              !!launch && (
                <li
                  key={i}
                  className={`${className}__item`}
                  onClick={() => handleIdChange(launch.flight_number!)}
                >
                  {launch.mission_name} ({launch.launch_year})
                </li>
              )
          )}
      </ol>
    </div>
  );
};

export default LaunchList;
