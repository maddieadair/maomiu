import React from "react";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface Layout {
  title: string;
  strokeColor: string;
  gridColor: string;
  textColor: string;
  traceableColor: string;
  strokeOrderColor: string;
  guideSelection: string;
  traceableCharacters: number;
}

type ChildProps = {
  view: string;
  setLayoutData: Dispatch<SetStateAction<{ title: string; strokeColor: string; gridColor: string; textColor: string; traceableColor: string; strokeOrderColor: string; guideSelection: string; }>>;
};

export default function Form(props: ChildProps) {
  const [tempLayout, setTempLayout] = useState<Layout>({
    title: "",
    strokeColor: "#000000",
    gridColor: "#000000",
    textColor: "#000000",
    traceableColor: "#D1D1D1",
    strokeOrderColor: "#000000",
    guideSelection: "cross",
    traceableCharacters: 5,
  });

  const CrossGuide = () => {
    return (
      <div className="flex flex-col gap-y-4 w-full items-center">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="#fff">
          <rect
            width="100"
            height="100"
            x="0"
            y="0"
            fill="white"
            stroke="#646464"
          />{" "}
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke="#646464"
            strokeDasharray="2"
          ></line>
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="#646464"
            strokeDasharray="2"
          ></line>
        </svg>
        <p>Cross</p>
      </div>
    );
  };

  const StarGuide = () => {
    return (
      <div className="flex flex-col gap-y-4 w-full items-center">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="#fff">
          <rect
            width="100"
            height="100"
            x="0"
            y="0"
            fill="white"
            stroke="#646464"
          />{" "}
          <line
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            stroke="#646464"
            strokeDasharray="2"
          ></line>
          <line
            x1="100"
            y1="0"
            x2="0"
            y2="100"
            stroke="#646464"
            strokeDasharray="2"
          ></line>
        </svg>
        <p>Star</p>
      </div>
    );
  };

  const BothGuide = () => {
    return (
      <div className="flex flex-col gap-y-4 w-full items-center">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="#fff">
          <rect
            width="100"
            height="100"
            x="0"
            y="0"
            fill="white"
            stroke="#646464"
          />{" "}
          <line
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            stroke="#646464"
            strokeDasharray="2"
          ></line>
          <line
            x1="100"
            y1="0"
            x2="0"
            y2="100"
            stroke="#646464"
            strokeDasharray="2"
          ></line>
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke="#646464"
            strokeDasharray="2"
          ></line>
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="#646464"
            strokeDasharray="2"
          ></line>
        </svg>
        <p>Both</p>
      </div>
    );
  };

  const BlankGuide = () => {
    return (
      <div className="flex flex-col gap-y-4 w-full items-center">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="#fff">
          <rect
            width="100"
            height="100"
            x="0"
            y="0"
            fill="white"
            stroke="#646464"
          />{" "}
        </svg>
        <p>Blank</p>
      </div>
    );
  };

  const upUntil = (char: object, jIndex: number) => {
    const items = char["strokes"]
      .slice(0, jIndex + 1)
      .map((item: string, index: number) =>
        index == jIndex ? (
          <path
            d={item}
            fill={tempLayout.strokeOrderColor}
            fillOpacity="1"
            key={index}
          />
        ) : (
          <path
            d={item}
            fill={tempLayout.strokeOrderColor}
            fillOpacity="0.5"
            key={index}
          />
        )
      );

    return items;
  };

  const Spanning = () => {
    let mao: object = require("hanzi-writer-data/猫");

    return (
      <div className="flex flex-row gap-x-2 flex-wrap">
        {mao["strokes"].map((jChar: string, jIndex: number) => {
          return (
            <svg width="30" height="30" key={jChar}>
              <g
                transform="translate(0, 26.3671875) scale(0.029296875, -0.029296875)"
                width="30"
                height="30"
              >
                {upUntil(mao, jIndex)}
              </g>
            </svg>
          );
        })}
      </div>
    );
  };

  const ColorGuideSvg = () => {
    let mao: object = require("hanzi-writer-data/猫");
    let maoStrokes: string[] = mao["strokes"];

    return (
      <div className="flex flex-col gap-y-4 w-24 items-center justify-center">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="#fff">
          <rect
            width="100"
            height="100"
            x="0"
            y="0"
            fill="white"
            stroke={tempLayout.gridColor}
          />
          <line
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            stroke={tempLayout.gridColor}
            strokeDasharray="2"
            className={
              tempLayout.guideSelection === "star" ||
              tempLayout.guideSelection == "both"
                ? `block`
                : `hidden`
            }
          ></line>
          <line
            x1="100"
            y1="0"
            x2="0"
            y2="100"
            stroke={tempLayout.gridColor}
            strokeDasharray="2"
            className={
              tempLayout.guideSelection === "star" ||
              tempLayout.guideSelection == "both"
                ? `block`
                : `hidden`
            }
          ></line>
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke={tempLayout.gridColor}
            strokeDasharray="2"
            className={
              tempLayout.guideSelection === "cross" ||
              tempLayout.guideSelection == "both"
                ? `block`
                : `hidden`
            }
          ></line>
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke={tempLayout.gridColor}
            strokeDasharray="2"
            className={
              tempLayout.guideSelection === "cross" ||
              tempLayout.guideSelection == "both"
                ? `block`
                : `hidden`
            }
          ></line>
          <g
            transform="translate(5, 84.1015625) scale(0.087890625, -0.087890625)"
            width="100"
            height="100"
          >
            {maoStrokes.map((item: string, index: number) => (
              <path d={item} fill={tempLayout.strokeColor} key={index} />
            ))}
          </g>
        </svg>
        <p style={{ color: tempLayout.textColor }}>
          <b>māo</b>: cat
        </p>
      </div>
    );
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    let value: string | number = e.target.value;
    let name: string = e.target.name;

    if (name === "traceableCharacters") {
      value = parseInt(value) || 0;
    }

    setTempLayout((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    props.setLayoutData(tempLayout);
  }, [tempLayout]);

  useEffect(() => {
    let bubbleSpan: HTMLSpanElement|null= document.querySelector("span");
    // let input = document.getElementById("traceableCharacters");

    let val: number = tempLayout.traceableCharacters;
    let min: number = 0;
    let max: number = 11;
    let newVal: number = Number(((val - min) * 100) / (max - min));

    bubbleSpan!.textContent = val.toString();
    bubbleSpan!.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    //   bubbleSpan.style.display = "block"

    // input.onblur = (() => {
    //     bubbleSpan.style.display = "none"
    // })
  }, [tempLayout.traceableCharacters]);

  return (
    <div
      className={`flex flex-col gap-y-12 lowercase ${
        props.view === "Layout" ? "block" : "hidden"
      }`}
    >
      <p>Customize the worksheet to your heart&apos;s content 🫶</p>
      <form className="flex flex-col gap-y-24" action="/" id="forms">
        <div className="flex flex-col gap-y-2">
          <label className="font-newsreader italic text-lg" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            value={tempLayout.title}
            id="title"
            name="title"
            maxLength={60}
            onKeyDown={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            className="ring-1 ring-ash focus:outline-dune rounded-md p-2 w-full"
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <label
            className="font-newsreader italic text-lg"
            htmlFor="guideSelection"
          >
            Grid Style
          </label>
          <div className="bg-pearl p-8 rounded-2xl border-carbon border-[1px]">
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-4 sm:gap-y-2">
                  <BlankGuide />
                  <StarGuide />
                  <CrossGuide />
                  <BothGuide />
                </div>
              </div>
            </div>
          </div>
          <select
            name="guideSelection"
            id="guideSelection"
            value={tempLayout.guideSelection}
            className="ring-1 ring-ash focus:outline-dune rounded-md p-2 w-full"
            onChange={(e) => handleChange(e)}
          >
            <option value="blank">blank</option>
            <option value="star">star</option>
            <option value="cross">cross</option>
            <option value="both">both</option>
          </select>
        </div>

        <div className="flex flex-col gap-y-12">
          <label
            className="font-newsreader italic text-lg"
            htmlFor="traceableCharacters"
          >
            Traceable Characters
          </label>
          <div className="bg-pearl p-8 rounded-2xl flex flex-col gap-y-12 border-carbon border-[1px]">
            <div className="flex gap-x-4 items-center">
              <p>0</p>
              <div className="w-full flex flex-col items-center">
                <div id="bubble" className="relative w-full">
                  {/* <span className="absolute font-semibold text-white bottom-10 -translate-x-1/2 z-20 after:content-[''] after:absolute after:w-10 after:h-10 after:bg-smoke after:border-carbon after:border-[1px] after:left-1/2 after:-translate-x-1/2 after:-top-2.5 after:rotate-45 after:-z-10 after:rounded-tl-full after:rounded-bl-full after:rounded-tr-full"></span> */}
                  <span className="absolute font-semibold text-white bottom-8 -translate-x-1/2 z-20 after:content-[''] after:absolute after:w-10 after:h-10 after:bg-smoke after:left-1/2 after:-translate-x-1/2 after:-top-[8px] after:-z-10 after:rounded-lg"></span>
                </div>
                <input
                  type="range"
                  onChange={(e) => handleChange(e)}
                  value={tempLayout.traceableCharacters}
                  id="traceableCharacters"
                  name="traceableCharacters"
                  min="0"
                  max="11"
                  step="1"
                  className="accent-smoke rounded-lg cursor-pointer h-[2px] w-full"
                />
              </div>

              <p>11</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <p className="font-newsreader italic text-lg">Color Options</p>
          <div className="bg-pearl p-8 rounded-2xl flex flex-col gap-y-16 border-carbon border-[1px]">
            <div className="flex flex-col items-center gap-y-6 sm:flex-row sm:gap-x-6">
              <div className="flex flex-col order-2 gap-y-4 w-full sm:justify-between sm:w-2/3 sm:order-1">
                <div className="flex flex-col sm:justify-between sm:flex-row gap-y-2">
                  <label htmlFor="strokeColor" className="order-1">
                    Character Color
                  </label>
                  <input
                    type="color"
                    id="strokeColor"
                    name="strokeColor"
                    value={tempLayout.strokeColor}
                    className="w-full sm:w-1/2 order-2"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="flex flex-col sm:justify-between sm:flex-row gap-y-2">
                  <input
                    type="color"
                    id="gridColor"
                    name="gridColor"
                    value={tempLayout.gridColor}
                    className="w-full sm:w-1/2 order-2"
                    onChange={(e) => handleChange(e)}
                  />
                  <label htmlFor="gridColor" className="order-1">
                    Grid Color
                  </label>
                </div>
                <div className="flex flex-col sm:justify-between sm:flex-row gap-y-2">
                  <input
                    type="color"
                    id="textColor"
                    name="textColor"
                    value={tempLayout.textColor}
                    className="w-full sm:w-1/2 order-2"
                    onChange={(e) => handleChange(e)}
                  />
                  <label htmlFor="textColor" className="order-1">
                    Text Color
                  </label>
                </div>
                <div className="flex flex-col sm:justify-between sm:flex-row gap-y-2">
                  <input
                    type="color"
                    id="traceableColor"
                    name="traceableColor"
                    value={tempLayout.traceableColor}
                    className="w-full sm:w-1/2 order-2"
                    onChange={(e) => handleChange(e)}
                  />
                  <label htmlFor="traceableColor" className="order-1">
                    Traceable Color
                  </label>
                </div>
              </div>

              <div className="sm:w-1/3 order-1 flex justify-center">
                <ColorGuideSvg />
              </div>
            </div>
          </div>

          <div className="bg-pearl p-8 rounded-2xl flex flex-col gap-y-8 border-carbon border-[1px]">
            <Spanning />
            <div className="flex flex-col sm:justify-between sm:flex-row gap-y-2">
              <input
                type="color"
                id="strokeOrderColor"
                name="strokeOrderColor"
                value={tempLayout.strokeOrderColor}
                className="w-full sm:w-1/2 order-2"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="strokeOrderColor" className="order-1">
                Stroke Order Color
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
