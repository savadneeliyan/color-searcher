import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { InputV2field } from "../components/InputFields";
import useFetch from "../hooks/CustomHooks";

function HomePageV2() {
  const colorInput = useRef();
  let { data, loading, error } = useFetch(
    "https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json"
  );
  const [resultData, setResultData] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [errorState, setError] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    setResultData(data.splice(0, 200));
  }, [data]);

  useEffect(() => {
    let history = localStorage.getItem("searchHistory");
    setSearchHistory(JSON.parse(history));
  }, [selectedValue]);

  const handleColorPicker = () => {
    colorInput.current.click();
  };
  const handleColorChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    setError(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setError(false);
    const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    const rgbRegex = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
    if (hexRegex.test(selectedValue) || rgbRegex.test(selectedValue)) {
      const searchRGB = formatColor(selectedValue);
      const closestColors = data.map((color) => ({
        ...color,
        distance: calculateDistance(searchRGB, formatColor(color.hex)),
      }));
      closestColors.sort((a, b) => a.distance - b.distance);
      setResultData(closestColors.slice(0, 200));

      let historyArray = [...new Set(searchHistory)];
      historyArray.unshift(selectedValue);
      localStorage.setItem("searchHistory", JSON.stringify(historyArray));
      setSelectedValue("");
    } else {
      setError(true);
    }
  };

  const formatColor = (color) => {
    if (color.startsWith("#")) {
      color = color.replace("#", "");

      const r = parseInt(color.substring(0, 2), 16);
      const g = parseInt(color.substring(2, 4), 16);
      const b = parseInt(color.substring(4, 6), 16);

      return { r, g, b };
    }

    if (color.startsWith("rgb(")) {
      const rgb = color.substring(4, color.length - 1).split(",");
      const r = parseInt(rgb[0].trim(), 10);
      const g = parseInt(rgb[1].trim(), 10);
      const b = parseInt(rgb[2].trim(), 10);

      return { r, g, b };
    }

    return null;
  };

  const calculateDistance = (color1, color2) => {
    return Math.sqrt(
      Math.pow(color2.r - color1.r, 2) +
        Math.pow(color2.g - color1.g, 2) +
        Math.pow(color2.b - color1.b, 2)
    );
  };

  const hexToRgb = (hex) => {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
  };

  const hexToHsl = (hex) => {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          break;
      }

      h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `${h}, ${s}, ${l}`;
  };

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "auto",
        py: 5,
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          lineHeight: "34px",
          fontWeight: "600",
        }}
      >
        Color Picker
      </Typography>
      <Box
        component={"form"}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          mt: "30px",
          mb: "5px",
          "& input::placeholder": {
            color: "#E6E2E6",
          },
          "& input": {
            border: `1px solid ${errorState ? "#E74C3C" : "#E6E2E6"}`,
            outline: "none",
            padding: "10px 20px",
            height: "40px",
            width: "calc(100% - 150px)",
            maxWidth: "400px",
            color: errorState ? "#E74C3C" : "#222",
          },
        }}
      >
        <input
          placeholder="Enter Color Code"
          value={selectedValue}
          onChange={handleColorChange}
        />

        <Button
          type="submit"
          sx={{
            border: "1px solid #000",
            backgroundColor: "#000",
            color: "#fff",
            textTransform: "capitalize",
            borderRadius: "0",
            height: "40px",
            px: "20px",
            transition: "0.5s ease",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#000",
            },
          }}
          onClick={handleSearchSubmit}
        >
          Search color
        </Button>
      </Box>
      <Typography
        sx={{
          color: "#E74C3C",
          opacity: errorState ? 1 : 0,
          height: errorState ? "auto" : 0,
          transition: "0.5s ease",
          fontSize: "12px",
        }}
      >
        Inputed value is not a valide color code,please use #ff0000 or
        rgb(0,255,0) format
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          lineHeight: "24px",
          "& input": {
            opacity: "0",
            pointerEvents: "none",
          },
        }}
      >
        Dont know what color to search.
        <Typography
          component={"span"}
          sx={{
            fontSize: "14px",
            lineHeight: "24px",
            cursor: "pointer",
          }}
          onClick={handleColorPicker}
        >
          click Here to choose from color picker
        </Typography>
        <input
          type="color"
          ref={colorInput}
          value={selectedValue}
          onChange={handleColorChange}
        />
      </Typography>

      <Typography
        sx={{
          fontSize: "14px",
          lineHeight: "24px",
        }}
      >
        Or, Choose from Blocks
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(35px, 8fr))",
          maxWidth: "700px",
          width: "calc(100% - 30px)",
          borderRadius: "5px",
        }}
      >
        {data.slice(0, 200)?.map((item) => (
          <Box
            sx={{
              position: "relative",
              display: "block",
              width: "35px",
              height: "35px",
              "&:hover > div": {
                transform: "scale(2)",
                borderRadius: "3px",
                zIndex: "999",
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: item?.hex,
                transition: "0.5s ease",
                cursor: "pointer",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
              onClick={() => setSelectedValue(item.hex)}
            ></Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography
          sx={{
            fontSize: "18px",
            lineHeight: "34px",
            fontWeight: "600",
          }}
        >
          searched colors
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 4fr))",
          }}
        >
          {searchHistory?.slice(0, 5)?.map((item) => (
            <Box>
              <Box
                sx={{
                  backgroundColor: item,
                  width: "100px",
                  height: "60px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedValue(item)}
              ></Box>
              <Typography
                sx={{
                  fontSize: "10px",
                }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box>
        <Box
          sx={{
            border: "1px solid #EAEAEA",
            width: "fit-content",
            px: "16px",
            pb: "10px",
          }}
        >
          <Typography
            sx={{
              mt: "20px",
              mb: "10px",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            List of searched HTML color codes
          </Typography>
          <Box sx={{}}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "60px 200px 150px 250px 250px",
                gap: "20px",
                "& span": {
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#C3C3C3",
                },
              }}
            >
              <span>COLOR</span>
              <span>NAME</span>
              <span>HEX CODE</span>
              <span>RGB CODE</span>
              <span>HSL CODE</span>
            </Box>
          </Box>
        </Box>

        {resultData?.map((item) => (
          <Box
            sx={{
              border: "1px solid #EAEAEA",
              width: "fit-content",
              borderTop: "0",
              p: "16px",
              display: "grid",
              gridTemplateColumns: "60px 200px 150px 250px 250px",
              alignItems: "center",
              gap: "20px",
              "& span": {
                fontSize: "12px",
                fontWeight: "600",
              },
            }}
          >
            <span>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "6px",
                  background: item.hex,
                }}
              ></div>
            </span>
            <span>{item.color}</span>
            <span>{item.hex}</span>
            <span>{hexToRgb(item.hex)}</span>
            <span>{hexToHsl(item.hex)}</span>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default HomePageV2;
