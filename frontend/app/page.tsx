"use client";
import React from "react";
import { useState } from "react";

import Header from "./components/hero";
import Footer from "./components/footer";

import MyDocument from "./components/document";
import Form from "./components/form";
import CharacterForm from "./components/characterForm";
import Words from "./components/words";
import { PDFViewer } from "@react-pdf/renderer";
import { FaRegCircleCheck } from "react-icons/fa6";

import dynamic from "next/dynamic";

const BlobProvider = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.BlobProvider),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function Home() {
  const [view, setView] = useState<string>("");
  const [allData, setAllData] = useState<Array<Object>>([]);
  const [layoutData, setLayoutData] = useState({
    title: "",
    strokeColor: "#4D1A1A",
    gridColor: "#9F5050",
    textColor: "#D57676",
    traceableColor: "#D8B0B0",
    strokeOrderColor: "#646464",
    guideSelection: "blank",
  });

  const [finalData, setFinalData] = useState({});
  const [currIndex, setCurrIndex] = useState<number|null>(null);

  const [mode, setMode] = useState<string>("generate");

  const [showComponent, setShowComponent] = useState<boolean>(false);


  const handleSubmit = () => {
    let temp: {layoutInfo: Object, wordInfo: Object} = {
        layoutInfo: layoutData,
        wordInfo: allData,
    }

    setFinalData(temp);
    setView("Submit");
  };

  return (
    <div className="flex flex-col gap-y-24 min-h-screen overflow-x-hidden">
      <div
        className={`fixed flex gap-x-4 items-center right-10 top-10 bg-pearl p-4 rounded-xl italic border-carbon border-[1px] transition-opacity ease-in-out duration-300 ${
          showComponent ? "opacity-100" : "opacity-0"
        }`}
      >
        <FaRegCircleCheck size={20} className="text-green-700" />
        <p>word successfully added!</p>
      </div>
      <div className="main px-8 flex flex-col gap-y-20">
        <Header />

        <div className="flex flex-col gap-y-12">
          <div className="border-b-[1px] border-carbon pb-3 flex justify-between">
            <div className="flex gap-x-8">
              <button
                type="button"
                onClick={() => setView("Layout")}
                className={`lowercase ${view === "Layout" ? null : "text-silver"}`}
              >
                Layout
              </button>
              <button
                type="button"
                onClick={() => setView("Input")}
                className={`lowercase ${view === "Input" ? null : "text-silver"}`}
              >
                Input
              </button>

              <button
                type="button"
                onClick={() => setView("Words")}
                className={`lowercase ${view === "Words" ? null : "text-silver"}`}
              >
                Words
              </button>
            </div>

            <button
              type="button"
              disabled={allData.length === 0}
              onClick={() => {
                handleSubmit();
              }}
              className="lowercase border-[1px] rounded-md p-2 bg-dune hover:bg-smoke hover:border-smoke text-white border-dune disabled:bg-pearl disabled:border-carbon disabled:text-ash disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>

          <Form
            view={view}
            setLayoutData={setLayoutData}
          />
          <CharacterForm
            view={view}
            allData={allData}
            setAllData={setAllData}
            currIndex={currIndex}
            setCurrIndex={setCurrIndex}
            mode={mode}
            setMode={setMode}
            showComponent={showComponent}
            setShowComponent={setShowComponent}
          />
          <Words
            view={view}
            setView={setView}
            allData={allData}
            setCurrIndex={setCurrIndex}
            setMode={setMode}
          />

          <div className={`${view === "Submit" ? "block" : "hidden"}`}>
            {Object.keys(finalData).length !== 0 ? (
              <div>
                <div className="hidden sm:block">
                  <PDFViewer width={"100%"} height={window.innerHeight}>
                    <MyDocument data={finalData} />
                  </PDFViewer>
                </div>

                <div className="block sm:hidden">
                  <BlobProvider
                    document={<MyDocument data={finalData} />}
                  >
                    {({ blob, url, loading, error }) => (
                      <a
                        href={url!}
                        target="_blank"
                        className="border border-black p-4 rounded-md w-1/4 hover:bg-green-800 hover:border-green-800 hover:text-white"
                      >
                        Download now!
                      </a>
                    )}
                  </BlobProvider>
                </div>
              </div>
            ) : (
              "Nothing to see here..."
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
