import { useEffect, useMemo, useRef, useState } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const timeRef = useRef();

  const secondsTick = () => {
    setSeconds((prev) => prev + 1);
  };

  const timeStart = () => {
    if (!timeRef.current) {
      timeRef.current = setInterval(secondsTick, 1000);
    }
  };

  const timeStop = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
      timeRef.current = null;
    }
  };

  useEffect(() => {
    return () => timeStop();
  }, []);

  useEffect(() => {
    if (seconds === 60) {
      setMinutes((prev) => prev + 1);
      setSeconds(0);
    }
    console.log(seconds);
  }, [seconds]);

  useEffect(() => {
    if (minutes === 60) {
      setHours((prev) => prev + 1);
      setMinutes(0);
    }
  }, [minutes]);

  const secondsToDeg = useMemo(() => {
    return (360 / 60) * seconds;
  }, [seconds]);

  const minutesToDeg = useMemo(() => {
    return (360 / 60) * minutes;
  }, [minutes]);

  const hoursToDeg = useMemo(() => {
    return (360 / 12) * hours;
  }, [hours]);

  return (
    <div className="grid grid-cols-3 w-full">
      <div className="mx-auto">
        <button onClick={timeStart}>Start</button>
        <button onClick={timeStop}>Stop</button>
      </div>
      <div className="mx-auto">
        <div className="w-[300px] h-[300px] border rounded-full relative">
          <div
            className="w-[2px] h-[50px] bg-gray-400 absolute top-[100px] left-1/2 origin-bottom-right z-10"
            style={{ transform: `rotate(${hoursToDeg}deg)` }}
          ></div>
          <div
            className="w-[2px] h-[100px] bg-black absolute top-[50px] left-1/2 origin-bottom-right"
            style={{ transform: `rotate(${minutesToDeg}deg)` }}
          ></div>
          <div
            className="w-[2px] h-[150px] bg-red-600 absolute top-0 left-1/2 origin-bottom-right"
            style={{ transform: `rotate(${secondsToDeg}deg)` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
