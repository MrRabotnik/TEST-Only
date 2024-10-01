import React from "react";
import "./SliderItem.scss";

interface Props {
    year: number;
    events: string;
}

const SliderItem: React.FC<Props> = ({ year, events }) => {
    return (
        <div className="slider-item">
            <h3 className="year">{year}</h3>
            <p className="text">{events}</p>
        </div>
    );
};

export default SliderItem;
