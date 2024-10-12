import React from "react";
import { Dispatch, SetStateAction } from "react";

interface ChildProps {
    view: string;
    setView: Dispatch<SetStateAction<string>>;
    allData: Array<Object>;
    setCurrIndex: Dispatch<SetStateAction<number|null>>;
    setMode: Dispatch<SetStateAction<string>>;
  };

export default function Words(props: ChildProps) {

  const handleEdit = (index: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    props.setCurrIndex(index);
    props.setMode("edit");
    props.setView("Input");
  };

  return (
    <div className={`lowercase ${props.view === "Words" ? "block" : "hidden"}`}>
      {props.allData.length > 0 ? (
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-4">
            <p>
              Click on any word to edit it.
            </p>

            <p className="text-red-400">
              Warning: Editing a word will replace any current data in the input
              fields.
            </p>
          </div>

          <div className="flex flex-row gap-x-4 gap-y-4 flex-wrap">
            {props.allData.map((item: object, index: number) => {
              return (
                <div
                  key={index}
                  onClick={(e) => {
                    handleEdit(index, e)
                  }}
                  className="bg-pearl border-carbon border-[1px] px-4 py-2 rounded-md flex gap-x-6 items-center hover:cursor-pointer"
                >
                  <p>{item["wordInfo"][0]["hanzi"]}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
