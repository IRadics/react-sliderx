import "./SliderX.css";
import { useState, useEffect, useMemo } from "react";
import { Color, SliderXOptions, EnumSliderXOptions } from "./types/types";
import React from "react";
import { findClosestNum } from "./functions/findClosestNum";
import SliderXClassic from "./SliderXClassic";
import { useInterval } from "usehooks-ts";
import { isFlagSet } from "./functions/isFlagSet";

interface SliderXProps {
  className?: string;
  onChange?(index: number): void;
  optionCount: number;
  defaultOptionIndex?: number;
  colors?: Color[];
  labels?: string[];
  id?: string;
  options?: SliderXOptions;
  index?: number;
  animationTime?: number;
}

/**
 * @param className             additional classname
 * @param onChange              returns the index of the selected option
 * @param colors                array of RGB,RGBA or HEX colors
 * @param optionCount           number of options
 * @param defaultOptionIndex    initially selected option. Invalid index is defaulted to the min or max index.
 * @param labels                array of strings for labels, pass "" to empty label. \n works for linebreaks
 * @param id                    custom ID of the slider <input> element
 * @param options               slider behaviour options (use EnumSliderOptions)
 * @param index                 Controls the selection. Invalid indexes are defaulted to the min or max index.
 * @param animationTime         time of full animation for selection change in microseconds. If 0 or undefined, the slider changes instantly.
 */
const SliderXSelector: React.FC<SliderXProps> = ({
  className,
  onChange,
  colors,
  optionCount,
  defaultOptionIndex,
  labels,
  id,
  options = 0,
  index,
  animationTime,
}) => {
  const [value, setValue] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    defaultOptionIndex || 0
  );
  const [validValues, setValidvalues] = useState<number[]>([]);
  const [isAnimatingThumb, setIsAnimatingThumb] = useState<boolean>(false);

  const animFrameTime = 15;
  const rangePerOption = useMemo(
    () =>
      Math.max(
        Math.round(animationTime ? animationTime : 0 / animFrameTime),
        6
      ),
    [optionCount, animationTime]
  );
  const max = useMemo(
    () => optionCount * rangePerOption,
    [optionCount, animationTime]
  );

  useEffect(() => {
    if (max && optionCount) {
      let values: number[] = [];
      for (let i = 0; i < optionCount; i++) {
        values.push(
          isFlagSet(options, EnumSliderXOptions.DisableCenteredOptions)
            ? Math.round((max / (optionCount - 1)) * i)
            : Math.round((max / optionCount) * (i + 1) - max / optionCount / 2)
        );
      }
      setValidvalues(values);
    }
  }, [max, optionCount]);

  useEffect(() => {
    setValue(
      defaultOptionIndex
        ? validValues[
            Math.min(Math.max(defaultOptionIndex, 0), optionCount - 1)
          ]
        : validValues[0]
    );
  }, [validValues, defaultOptionIndex]);

  const animateThumb = (index: number, val: number, step: number) => {
    if (val < validValues[index]) {
      setValue(Math.min(val + step, validValues[index]));
    } else {
      if (val > validValues[index]) {
        setValue(Math.max(val - step, validValues[index]));
      } else {
        setIsAnimatingThumb(false);
      }
    }
  };

  if (animationTime)
    useInterval(
      () => {
        animateThumb(
          selectedIndex,
          value,
          Math.round((rangePerOption / animationTime) * animFrameTime)
        );
      },
      isAnimatingThumb ? 15 : null
    );

  const handleChange = (value: string) => {
    let selected = findClosestNum(parseInt(value), validValues);

    if (selectedIndex != selected) {
      setSelectedIndex(selected);
      if (animationTime) {
        setIsAnimatingThumb(true);
      } else {
        setValue(validValues[selected]);
      }

      onChange && onChange(selected);
    }
  };

  const label = (text: string, index: number) => {
    if (isFlagSet(options, EnumSliderXOptions.ClickableLabels)) {
      return (
        <span
          className="sliderx-label-clickable"
          onClick={() => handleChange(validValues[index].toString())}
        >
          {text}
        </span>
      );
    } else {
      return <span>{text}</span>;
    }
  };

  const labelsTable = () => {
    if (labels && labels.length > 0) {
      return (
        <div
          className={`sliderX-labels-container ${
            className ? className + "-labels-container" : ""
          }`}
        >
          <table
            className={`sliderX-labels ${
              className ? className + "-labels" : ""
            }`}
          >
            <thead>
              <tr>
                {labels.map((text, index) => {
                  return (
                    <td key={index}>
                      <span
                        className={`sliderX-label ${
                          className ? className + "-label" : ""
                        }`}
                      >
                        {label(text, index)}
                      </span>
                    </td>
                  );
                })}
              </tr>
            </thead>
          </table>
        </div>
      );
    } else {
      return null;
    }
  };

  const indexToValue = (index: number) => {
    return validValues[Math.min(Math.max(index, 0), optionCount - 1)];
  };

  return (
    <div className="sliderX-root">
      <div className={`sliderX ${className ? className : ""}`}>
        <div
          className={`sliderX-selector-container ${
            className ? className + "-selector-container" : ""
          }`}
        >
          <SliderXClassic
            id={id}
            min={0}
            max={max}
            value={index !== undefined ? indexToValue(index) : value}
            onChange={(e) => handleChange(e.target.value)}
            colors={colors}
            options={options}
            className={className}
          ></SliderXClassic>
          {labelsTable()}
        </div>
      </div>
    </div>
  );
};

export default SliderXSelector;
