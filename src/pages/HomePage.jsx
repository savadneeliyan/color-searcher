import React, { useEffect, useState } from "react";
import InputFields from "../components/InputFields";
import useFetch from "../hooks/CustomHooks";
import ColorTable from "../components/ColorTable";

function HomePage() {
  const [inputValue, setInputvalue] = useState();
  const [submitedInputValue, setsubmitedInputvalue] = useState();
  let { data, loading, error } = useFetch(
    "https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json"
  );

  useEffect(() => {
    setResultData(data);
  }, [data]);

  const [resultData, setResultData] = useState();
  const [errorData, setErrorData] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    setInputvalue(value);
  };

    const handleSubmit = (e) => {
      setErrorData(false)
    e.preventDefault();
    setsubmitedInputvalue(inputValue);

    const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

    const rgbRegex = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;

    if (hexRegex.test(inputValue) || rgbRegex.test(inputValue)) {
      const searchRGB = hexToRgb(inputValue);

      const closestColors = data.map((color) => ({
        ...color,
        distance: calculateDistance(searchRGB, hexToRgb(color.hex)),
      }));
      closestColors.sort((a, b) => a.distance - b.distance);
      setResultData(closestColors.slice(0, 100));
    } else {
      setErrorData(true);
    }
  };

  const hexToRgb = (hex) => {
    let clr = hex.replace("#", "");
    const r = parseInt(clr.substring(0, 2), 16);
    const g = parseInt(clr.substring(2, 4), 16);
    const b = parseInt(clr.substring(4, 6), 16);
    return { r, g, b };
  };

  const calculateDistance = (color1, color2) => {
    return Math.sqrt(
      Math.pow(color2.r - color1.r, 2) +
        Math.pow(color2.g - color1.g, 2) +
        Math.pow(color2.b - color1.b, 2)
    );
  };

  return (
    <div className="development v1">
      <h1>Color Searcher</h1>
      <InputFields
        handleSubmit={handleSubmit}
        onChange={handleChange}
        value={inputValue}
      />
      {submitedInputValue && (
        <p className="result-line">Results for '{submitedInputValue}'.</p>
      )}

      {loading ? (
        "Loading..."
      ) : error ? (
        <div>
          <p>something went wrong</p>
          <button>click here to retry</button>
        </div>
      ) : errorData ? (
        <p>inputed value is not a valide color code</p>
      ) : (
        <ColorTable tableData={resultData} />
      )}
    </div>
  );
}

export default HomePage;
