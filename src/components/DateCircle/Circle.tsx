import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface Props {
    name: string;
    isActive: boolean;
    onClick: any;
    index: number;
    style: any;
}

const Circle: React.FC<Props> = ({ name, isActive, onClick, index, style }) => {
    const circleRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className={`circle-item ${isActive ? "" : "closed"}`}
            ref={circleRef}
            onClick={() => onClick(index)}
            style={style}
        >
            {index + 1}
            <div className={`circle-name ${isActive ? "" : "hidden"}`}>{name}</div>
        </div>
    );
};

export default Circle;
