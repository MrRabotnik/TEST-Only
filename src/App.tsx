import React, { useState } from "react";
import Header from "./components/Header/Header";
import BackgroundLines from "./components/BackgroundLines/BackgroundLines";
import SliderWrapper from "./components/SliderWrapper/SliderWrapper";
import { data, DataItem } from "./utils/data";
import DateCircle from "./components/DateCircle/DateCircle";

function App() {
    const dates: DataItem[] = data;
    const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);

    return (
        <div className="container">
            <main>
                <Header />
                <BackgroundLines />
                <DateCircle
                    dates={dates}
                    activeSectionIndex={activeSectionIndex}
                    setActiveSectionIndex={setActiveSectionIndex}
                />
                <SliderWrapper
                    dates={dates}
                    activeSectionIndex={activeSectionIndex}
                    setActiveSectionIndex={setActiveSectionIndex}
                />
            </main>
        </div>
    );
}

export default App;
