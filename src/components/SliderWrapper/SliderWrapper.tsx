import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./SliderWrapper.scss";
import SliderItem from "../SliderItem/SliderItem";
import { DataItem, EventItem } from "../../utils/data";

const SliderWrapper = ({ dates, activeSectionIndex, setActiveSectionIndex }: any) => {
    const swiperRef = useRef<any>(null);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [update, setUpdate] = useState(false);

    const data = dates[activeSectionIndex];

    useEffect(() => {
        updateButtonStates();
    }, [dates]);

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

    return (
        <div className="slider-wrapper">
            <div className="slider-header-wrapper">
                <div className="slider-header">
                    <p>
                        {activeSectionIndex + 1 >= 10 ? activeSectionIndex + 1 : "0" + (activeSectionIndex + 1)}/
                        {dates.length >= 10 ? dates.length : "0" + dates.length}
                    </p>
                    <div className="buttons-container">
                        <button
                            className="previous"
                            onClick={() => setActiveSectionIndex((prev: number) => prev - 1)}
                            disabled={activeSectionIndex <= 0}
                        >
                            &#60;
                        </button>
                        <button
                            className="next"
                            onClick={() => setActiveSectionIndex((prev: number) => prev + 1)}
                            disabled={activeSectionIndex >= dates.length - 1}
                        >
                            &#62;
                        </button>
                    </div>
                </div>
                <div className="pagination">
                    {dates && dates.length
                        ? dates.map((_: DataItem, index: number) => {
                              return (
                                  <div
                                      key={index}
                                      onClick={() => setActiveSectionIndex(index)}
                                      className={activeSectionIndex === index ? "active" : ""}
                                  ></div>
                              );
                          })
                        : ""}
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
                    spaceBetween={window.innerWidth <= 480 ? 50 : 100}
                    slidesPerView={window.innerWidth <= 480 ? 1.5 : 3}
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
