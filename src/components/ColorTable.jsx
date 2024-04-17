import React from "react";

function ColorTable({ tableData }) {
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
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Hex</th>
          <th>RGB</th>
          <th>HSL</th>
        </tr>
      </thead>
      <tbody>
        {tableData?.map((item, i) => {
          return (
            <tr>
              <td>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "6px",
                    background: item.hex,
                  }}
                ></div>
              </td>
              <td>{item.color}</td>
              <td>{item.hex}</td>
              <td>{hexToRgb(item.hex)}</td>
              <td>{hexToHsl(item.hex)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ColorTable;
