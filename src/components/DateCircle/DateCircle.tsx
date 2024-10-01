import React from "react";
import "./DateCircle.scss";
import Circle from "./Circle";
import { DataItem } from "../../utils/data";

const DateCircle = ({ dates, activeSectionIndex, setActiveSectionIndex }: any) => {
    const data = dates?.[activeSectionIndex];
    const startYear = data?.events?.[0]?.year;
    const endYear = data?.events?.[data?.events?.length - 1]?.year;
    const radius = 250;

    const getCirclePosition = (index: number, total: number) => {
        const angle = (2 * Math.PI * index) / total; // Calculate angle for each item
        const x = radius + radius * Math.cos(angle); // X position
        const y = radius + radius * Math.sin(angle); // Y position
        return { left: `${x}px`, top: `${y}px` };
    };

    const handleClick = (ind: number) => {
        setActiveSectionIndex(ind);
    };

    return (
        <div className="circle-years-wrapper">
            <div className="years-container">
                <h2>{startYear}</h2>
                <h2>{endYear}</h2>
            </div>

            <div className="circle-container">
                {dates && dates.length
                    ? dates.map((data: DataItem, index: number) => {
                          const position = getCirclePosition(index, dates.length);

                          return (
                              <Circle
                                  key={data.name}
                                  name={data.name}
                                  isActive={activeSectionIndex === index}
                                  onClick={handleClick}
                                  index={index}
                                  style={position}
                              />
                          );
                      })
                    : ""}
            </div>
        </div>
    );
};

export default DateCircle;
