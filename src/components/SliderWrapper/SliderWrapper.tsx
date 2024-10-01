import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./SliderWrapper.scss";
import SliderItem from "../SliderItem/SliderItem";
import { EventItem } from "../../utils/data";

const SliderWrapper = ({ data }: any) => {
    const swiperRef = useRef<any>(null);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    const updateButtonStates = () => {
        if (swiperRef.current) {
            const swiper = swiperRef.current.swiper;
            setIsPrevDisabled(swiper.isBeginning);
            setIsNextDisabled(swiper.isEnd);
        }
    };

    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slidePrev();
            updateButtonStates();
        }
    };

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideNext();
            updateButtonStates();
        }
    };

    useEffect(() => {
        updateButtonStates();
    }, [data]);

    return (
        <div className="slider-wrapper">
            <div className="slider-header">
                <p>06/06</p>
                <div className="buttons-container">
                    <button
                        className="previous"
                        onClick={handlePrev}
                        disabled={isPrevDisabled}
                    >
                        &#60;
                    </button>
                    <button
                        className="next"
                        onClick={handleNext}
                        disabled={isNextDisabled}
                    >
                        &#62;
                    </button>
                </div>
            </div>
            <div className="slider-container">
                <div className="button-container">
                    <button
                        className={`previous ${isPrevDisabled ? "hidden" : ""}`}
                        onClick={handlePrev}
                    >
                        &#60;
                    </button>
                </div>
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={3}
                    navigation={false}
                    pagination={false}
                    onSlideChange={updateButtonStates}
                >
                    {data && data.events.length
                        ? data.events.map((eventitem: EventItem) => (
                              <SwiperSlide key={eventitem.id}>
                                  <SliderItem
                                      year={eventitem.year}
                                      events={eventitem.text}
                                  />
                              </SwiperSlide>
                          ))
                        : ""}
                </Swiper>
                <div className="button-container">
                    <button
                        className={`next ${isNextDisabled ? "hidden" : ""}`}
                        onClick={handleNext}
                    >
                        &#62;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SliderWrapper;
