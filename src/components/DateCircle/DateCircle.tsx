import React, { useEffect, useRef, useState } from "react";
import "./DateCircle.scss";
import Circle from "./Circle";
import { DataItem } from "../../utils/data";
import { gsap } from "gsap";

const DateCircle = ({ dates, activeSectionIndex, setActiveSectionIndex }: any) => {
    const data = dates?.[activeSectionIndex];
    const startYear = data?.events?.[0]?.year;
    const endYear = data?.events?.[data?.events?.length - 1]?.year;
    const circleRef = useRef<HTMLDivElement | null>(null);
    const [update, setUpdate] = useState(false);

    const [currentYears, setCurrentYears] = useState<{ start: number; end: number }>({
        start: startYear,
        end: endYear,
    });

    useEffect(() => {
        const updateSize = () => {
            setUpdate((prev) => !prev);
            console.log(update);
        };

        updateSize();

        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const duration = 0.5;
        const yearRange = endYear - startYear + 1;

        gsap.to(currentYears, {
            start: startYear,
            end: endYear,
            duration: duration,
            onUpdate: () => {
                const newStartYear = Math.floor(currentYears.start);
                const yearsArray = Array.from({ length: yearRange }, (_, i) => newStartYear + i);
                setCurrentYears({
                    start: yearsArray[0],
                    end: yearsArray[yearsArray.length - 1],
                });
            },
            onComplete: () => {
                setCurrentYears({ start: startYear, end: endYear });
            },
        });

        const rotationAngle = (activeSectionIndex * (360 / dates.length)) % 360;

        gsap.to(".circle-container", {
            rotation: -rotationAngle - 45,
            duration: 0.3,
        });

        gsap.to(".circle-item", {
            rotation: rotationAngle + 45,
            duration: 0,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSectionIndex, startYear, endYear]);

    const getCirclePosition = (index: number, total: number, radius: number) => {
        const angle = (2 * Math.PI * index) / total;
        const x = radius + radius * Math.cos(angle);
        const y = radius + radius * Math.sin(angle);
        return { left: `${x}px`, top: `${y}px` };
    };

    const handleClick = (ind: number) => {
        setActiveSectionIndex(ind);
    };

    return (
        <div className="circle-years-wrapper">
            <div className="years-container">
                <h2>{currentYears.start}</h2>
                <h2>{currentYears.end}</h2>
            </div>

            <p className="name">{data.name}</p>

            <hr />

            <div
                className="circle-container"
                ref={circleRef}
            >
                {dates && dates.length
                    ? dates.map((data: DataItem, index: number) => {
                          const radius = circleRef.current ? circleRef.current.clientWidth / 2 : 0;
                          const position = getCirclePosition(index, dates.length, radius);

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
