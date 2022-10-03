import "./SliderX.css";
import { useState, useEffect, useRef, ChangeEvent, useMemo } from "react";
import { Color, EnumSliderXOptions, SliderXOptions } from "./types/types";
import React from "react";
import { findClosestNum } from "./functions/findClosestNum";
import { randomID } from "./functions/randomID";
import { isFlagSet } from "./functions/isFlagSet";

interface SliderXClassicProps {
  className?: string;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  defaultValue?: number;
  colors?: Color[];
  id?: string;
  options?: SliderXOptions;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
}

/**
 * @param min
 * @param max
 * @param step
 * @param className             additional classname
 * @param onChange              returns the HTMLInputElement change event
 * @param colors                array of RGB,RGBA or HEX colors
 * @param defaultValue          initial value
 * @param id                    custom ID of the slider <input> element
 * @param options               slider behaviour options (use EnumSliderOptions)
 * @param value                 Controls the value.
 */
const SliderXClassic: React.FC<SliderXClassicProps> = ({
  className,
  onChange,
  colors,
  id,
  options = 0,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = min,
}) => {
  //https://stackoverflow.com/questions/49328382/browser-detection-in-reactjs
  //@ts-ignore
  const isFirefox = typeof InstallTrigger !== "undefined";

  const [id_] = useState<string>(id ? id : "sliderX_" + randomID(12));
  const [valueState, setValueState] = useState<number>(0);

  const sliderXRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) setValueState(value);
  }, [value]);

  useEffect(() => {
    if (value) {
      setValueState(value);
    } else {
      if (defaultValue) {
        setValueState(defaultValue);
      }
    }
  }, []);

  useEffect(() => {
    if (colors) {
      sliderXRef.current?.style.setProperty(
        "--sliderX-var-dynamic-color",
        colors[
          findClosestNum(
            (value !== undefined ? value : valueState - min) / (max - min) +
              (isFlagSet(options, EnumSliderXOptions.DynamicColorSampleRight)
                ? 0.01
                : 0),
            colors.map(
              (col, index) =>
                (1 / colors.length) * (index + 1) - 1 / colors.length / 2
            )
          )
        ]
      );
    }
  }, [valueState, colors, max, min]);

  const setStyling = () => {
    let htmlString = "";
    if (colors) {
      const colorPercentage = (1 / colors?.length) * 100;
      ["linear-gradient", "-webkit-linear-gradient"].forEach((fn) => {
        htmlString = htmlString.concat(`background-image: `);
        htmlString = htmlString.concat(`${fn}(left,`);
        colors.forEach((color, index, arr) => {
          htmlString = htmlString.concat(
            `\n${color} ${colorPercentage * index}%, \n${color} ${
              colorPercentage * (index + 1)
            }%${index === arr.length - 1 ? "" : ","}\n`
          );
        });
        htmlString = htmlString.concat(");\n");
      });

      htmlString = `#${id_}${
        isFirefox ? "::-moz-range-track" : ""
      }\n{${htmlString}}`;
    }

    return {
      __html: htmlString,
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueState(parseInt(e.target.value));
    onChange && onChange(e);
  };

  return (
    <div className={`sliderX ${className ? className : ""}`} ref={sliderXRef}>
      <style
        dangerouslySetInnerHTML={useMemo(() => setStyling(), [colors])}
      ></style>
      <input
        type="range"
        className={`sliderX-input${isFirefox ? " sliderX-input-moz" : ""}`}
        id={id_}
        min={min}
        max={max}
        step={step}
        value={value !== undefined ? value : valueState}
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default SliderXClassic;
