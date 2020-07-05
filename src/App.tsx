import React, { useState, useMemo, useCallback } from "react";
import "./app.scss";

const App = () => {
  const defaultValue = new Array(9)
    .fill(0)
    .map((_, i) => `images/${i + 1}.jpg`);

  const [fillAll, setFillAll] = useState<string[]>(defaultValue);
  const [happeningChance, setHappeningChance] = useState(1);
  const [buildChance, setBuildChance] = useState(20);
  const [durationTime, setDurationTime] = useState(16000);
  const [durationImage, setDurationImage] = useState(100);
  const [animationStart, setAnimationStart] = useState(false);
  const randomImage = () => +(Math.random() * (9 - 1) + 1).toFixed(0);
  const randomToBuild = () =>
    +(Math.random() * (buildChance - 1) + 1).toFixed(0);

  const toOk = useMemo(() => {
    const setOfHap: any = new Set();

    for (let i = 0; i < happeningChance; i++) {
      const randNum = randomToBuild();

      if (setOfHap.has(randNum)) {
        i--;
      } else {
        setOfHap.add(randNum);
      }
    }

    return [...setOfHap];
  }, [happeningChance]);

  console.log("drop around");

  const handleChange = () => {
    let randNum = randomImage();
    const randToBuild = randomToBuild();
    const handleSet: any = new Set();
    console.log(toOk);
    if (toOk.find((ok) => ok === randToBuild)) {
      setFillAll(defaultValue);

      return;
    }

    while (handleSet.size !== 9) {
      handleSet.add(`images/${randNum}.jpg`);
      randNum = randomImage();
    }

    setFillAll([...handleSet]);
  };

  const startAnim = () => {
    setAnimationStart(true);
    const interval = setInterval(handleChange, durationImage);
    setTimeout(() => {
      clearInterval(interval);
      setFillAll(defaultValue);
      setAnimationStart(false);
    }, durationTime);
  };

  console.log(happeningChance);

  return (
    <>
      <div className="App">
        {fillAll.map((image) => (
          <div className="App__Block" key={image}>
            <img src={image} alt="" className="App__Image" />
          </div>
        ))}
      </div>
      <div className="App__Change">
        <button
          className="App__Button"
          onClick={startAnim}
          disabled={animationStart}
        >
          Start
        </button>
      </div>
      <div className="App__Panel">
        <div className="App__Label">
          Шанс
          <input
            type="text"
            value={happeningChance}
            onChange={(e) => {
              if (happeningChance === 0) {
                setHappeningChance(1);
              } else if (happeningChance + +e.target.value > buildChance) {
                return;
              }

              setHappeningChance(+e.target.value);
            }}
            disabled={animationStart}
          />
        </div>
        <div className="App__Label">
          К
          <input
            type="text"
            value={buildChance}
            onChange={(e) => setBuildChance(+e.target.value)}
            disabled={animationStart}
          />
        </div>
        <div className="App__Label">
          Время анимации в мс
          <input
            type="text"
            value={durationTime}
            onChange={(e) => setDurationTime(+e.target.value)}
            disabled={animationStart}
          />
        </div>
        <div className="App__Label">
          Время изменения в мс
          <input
            type="text"
            value={durationImage}
            onChange={(e) => setDurationImage(+e.target.value)}
            disabled={animationStart}
          />
        </div>
      </div>
    </>
  );
};

export default App;
