import React from "react";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

import { RxCrossCircled } from "react-icons/rx";
import { IoWarningOutline } from "react-icons/io5";
import { HiOutlineCheckCircle } from "react-icons/hi";

interface ChildProps {
  view: string;
  allData: Array<Object>;
  setAllData: Dispatch<SetStateAction<Array<Object>>>;
  currIndex: number | null;
  setCurrIndex: Dispatch<SetStateAction<number | null>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  showComponent: boolean;
  setShowComponent: Dispatch<SetStateAction<boolean>>;
}

type Errors = {
  wordError?: string;
  pinyinError?: string;
  engError?: string;
  charPinError?: string;
  charEngError?: string;
};

type CharError = {
  pinyin?: string;
  english?: string;
};

type Character = {
  hanzi: string;
  pinyin: string;
  english: string;
};

export default function CharacterForm(props: ChildProps) {
  const [word, setWord] = useState<string>("");
  const [pinyin, setPinyin] = useState<string>("");
  const [engTrans, setEngTrans] = useState<string>("");
  const [currCharArr, setCurrCharArr] = useState<Array<Character>>([]);

  const [strokeInfo, setStrokeInfo] = useState([]);
  const [wordInfo, setWordInfo] = useState([]);

  const [buttonMessage, setButtonMessage] = useState<string>("Generate");
  const [errors, setErrors] = useState<Errors>({});

  const [fetchMessage, setFetchMessage] = useState<string>("");

  const charNums = {
    a: "āáǎà",
    e: "ēéěè",
    i: "īíǐì",
    o: "ōóǒò",
    u: "ūúǔù",
    ü: "ǖǘǚǜ",
    "u:": "ǖǘǚǜ",
    A: "ĀÁǍÀ",
    E: "ĒÉĚÈ",
    I: "ĪÍǏÌ",
    O: "ŌÓǑÒ",
    U: "ŪÚǓÙ",
    Ü: "ǕǗǙǛ",
    "U:": "ǕǗǙǛ",
  };

  const chars = {
    a1: "ā",
    a2: "á",
    a3: "ǎ",
    a4: "à",
    e1: "ē",
    e2: "é",
    e3: "ě",
    e4: "è",
    i1: "ī",
    i2: "í",
    i3: "ǐ",
    i4: "ì",
    o1: "ō",
    o2: "ó",
    o3: "ǒ",
    o4: "ò",
    u1: "ū",
    u2: "ú",
    u3: "ǔ",
    u4: "ù",
    v0: "ü",
    v1: "ǖ",
    v2: "ǘ",
    v3: "ǚ",
    v4: "ǜ",
    "u:0": "ü",
    "u:1": "ǖ",
    "u:2": "ǘ",
    "u:3": "ǚ",
    "u:4": "ǜ",
    A1: "Ā",
    A2: "Á",
    A3: "Ǎ",
    A4: "À",
    E1: "Ē",
    E2: "É",
    E3: "Ě",
    E4: "È",
    I1: "Ī",
    I2: "Í",
    I3: "Ǐ",
    I4: "Ì",
    O1: "Ō",
    O2: "Ó",
    O3: "Ǒ",
    O4: "Ò",
    U1: "Ū",
    U2: "Ú",
    U3: "Ǔ",
    U4: "Ù",
    V0: "Ü",
    V1: "Ǖ",
    V2: "Ǘ",
    V3: "Ǚ",
    V4: "Ǜ",
    "U:0": "Ü",
    "U:1": "Ǖ",
    "U:2": "Ǘ",
    "U:3": "Ǚ",
    "U:4": "Ǜ",
  };

  const handleValidation = () => {
    setErrors({});

    let isValid: boolean = true;

    if (word.length <= 0) {
      setErrors((prevState) => {
        return {
          ...prevState,
          wordError:
            "Input too short. Please enter a word that is at least 1 character long.",
        };
      });

      isValid = false;
    } else if (!/^\p{Script=Han}+$/u.test(word)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          wordError: "Invalid word. Please enter a valid word in Chinese.",
        };
      });

      isValid = false;
    }

    if (props.mode === "generate") {
      const doesExist: boolean = props.allData.some(
        (element: any) => element.wordInfo[0].hanzi === word
      );

      if (doesExist) {
        setErrors((prevState) => {
          return {
            ...prevState,
            wordError: "Word already exists. Please try a different one.",
          };
        });
        isValid = false;
      }
    }

    if (props.mode === "add" || props.mode === "edit") {
      if (pinyin.length <= 0) {
        setErrors((prevState) => {
          return {
            ...prevState,
            pinyinError: "Missing pinyin",
          };
        });
        isValid = false;
      }

      if (engTrans.length <= 0) {
        setErrors((prevState) => {
          return {
            ...prevState,
            engError: "Missing English translation",
          };
        });
        isValid = false;
      }

      const charErrors: CharError = validateCharacters();
      if (charErrors.pinyin) {
        setErrors((prevState) => {
          return {
            ...prevState,
            charPinError: "Missing pinyin field(s).",
          };
        });
        isValid = false;
      }
      if (charErrors.english) {
        setErrors((prevState) => {
          return {
            ...prevState,
            charEngError: "Missing english field(s).",
          };
        });
        isValid = false;
      }
    }
    return isValid;
  };

  const validateCharacters = () => {
    let errors = {} as CharError;

    currCharArr.forEach(function (item: Character) {
      if (item.pinyin === "") {
        errors.pinyin = "Missing character pinyin";
      }
      if (item.english === "") {
        errors.english = "Missing character english";
      }
    });
    return errors;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setFetchMessage("");
    const isValid: boolean = handleValidation();

    if (isValid) {
      let wordObj = {};
      wordObj["strokeInfo"] = strokeInfo;
      wordObj["wordInfo"] = currCharArr;
      wordObj["wordInfo"][0].pinyin = pinyin;
      wordObj["wordInfo"][0].english = engTrans;

      props.setAllData((allData) => [...allData, wordObj]);

      const toRef = setTimeout(() => {
        props.setShowComponent(true);
        clearTimeout(toRef);
      }, 0);

      resetFields();
    }
  };

  useEffect(() => {
    if (props.showComponent) {
      const toRef = setTimeout(() => {
        props.setShowComponent(false);
        clearTimeout(toRef);
      }, 1500);
    }
  }, [props.showComponent]);

  const changeGeneratedPinyin = (pinyinInp: string) => {
    const newChArr = pinyinInp.split(" ");

    for (let j = 0; j < newChArr.length; j++) {
      let lastIndex: number = newChArr[j].length - 1;
      let tone: number = parseInt(newChArr[j][lastIndex]);

      newChArr[j] = newChArr[j].slice(0, -1);

      if (tone == 5) {
        continue;
      } else if (newChArr[j].includes("iu") || newChArr[j].includes("ui")) {
        newChArr[j] = newChArr[j].replace("u", charNums["u"][tone - 1]);
      } else if (newChArr[j].includes("IU") || newChArr[j].includes("UI")) {
        newChArr[j] = newChArr[j].replace("U", charNums["U"][tone - 1]);
      } else if (newChArr[j].includes("u:")) {
        newChArr[j] = newChArr[j].replace("u:", charNums["u:"][tone - 1]);
      } else if (newChArr[j].includes("U:")) {
        newChArr[j] = newChArr[j].replace("U:", charNums["U:"][tone - 1]);
      } else {
        for (const key in charNums) {
          if (!charNums.hasOwnProperty(key)) {
            continue;
          }

          if (newChArr[j].includes(key)) {
            newChArr[j] = newChArr[j].replace(key, charNums[key][tone - 1]);
            break;
          }
        }
      }
    }

    let newPinyin: string = newChArr.join(" ");

    return newPinyin;
  };

  const changeGeneratedPinyinArr = (pinyinArr: Character[]) => {
    const newArr = [...pinyinArr];

    for (let i = 0; i < newArr.length; i++) {
      let sepCharArr = newArr[i].pinyin.split(" ");

      for (let j = 0; j < sepCharArr.length; j++) {
        let lastIndex: number = sepCharArr[j].length - 1;
        let tone: number = parseInt(sepCharArr[j][lastIndex]);

        sepCharArr[j] = sepCharArr[j].slice(0, -1);

        if (tone == 5) {
          continue;
        } else if (
          sepCharArr[j].includes("iu") ||
          sepCharArr[j].includes("ui")
        ) {
          sepCharArr[j] = sepCharArr[j].replace("u", charNums["u"][tone - 1]);
        } else if (
          sepCharArr[j].includes("IU") ||
          sepCharArr[j].includes("UI")
        ) {
          sepCharArr[j] = sepCharArr[j].replace("U", charNums["U"][tone - 1]);
        } else if (sepCharArr[j].includes("u:")) {
          sepCharArr[j] = sepCharArr[j].replace("u:", charNums["u:"][tone - 1]);
        } else if (sepCharArr[j].includes("U:")) {
          sepCharArr[j] = sepCharArr[j].replace("U:", charNums["U:"][tone - 1]);
        } else {
          for (const key in charNums) {
            if (!charNums.hasOwnProperty(key)) {
              continue;
            }

            if (sepCharArr[j].includes(key)) {
              sepCharArr[j] = sepCharArr[j].replace(
                key,
                charNums[key][tone - 1]
              );
              break;
            }
          }
        }
      }
      let newPinyin: string = sepCharArr.join(" ");
      newArr[i].pinyin = newPinyin;
    }
  };

  const handleChangePinyin = (e: React.ChangeEvent<HTMLInputElement>) => {
    for (const key in chars) {
      if (!chars.hasOwnProperty(key)) {
        continue;
      }
      let newString = e.target.value.replace(key, chars[key]);
      e.target.value = newString;
      setPinyin(e.target.value);
    }
  };

  const getInfo = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setFetchMessage("");
    const isValid: boolean = handleValidation();

    if (isValid) {
      const urls = [
        `/api/getStrokeInfo?word=${word}`,
        `/api/getWordInfo?word=${word}`,
      ];

      setButtonMessage("Getting information...");
      Promise.all(urls.map((url) => fetch(url).then((r) => r.json())))
        .then(([strokeData, wordData]) => {
          setButtonMessage("generate");
          if (strokeData.error || wordData.error) {
            let errorArr: Array<Error> = [];
            if (strokeData.error) {
              errorArr.push(new Error("Stroke data could not be found"));
            }
            if (wordData.error) {
              errorArr.push(new Error("Word data could not be found"));
            }
            setFetchMessage(`Could not find data for the given word.`);
            throw errorArr;
          } else {
            setStrokeInfo(strokeData.data);

            let wordInfoArr: Array<Character> = [];
            for (var i = 0; i < wordData["data"].length; i++) {
              let parsedString: Character = wordData["data"][i];
              wordInfoArr.push(parsedString);
            }
            setPinyin(changeGeneratedPinyin(wordInfoArr[0]["pinyin"]));
            changeGeneratedPinyinArr(wordInfoArr);
            setEngTrans(wordInfoArr[0]["english"]);

            setCurrCharArr(wordInfoArr);

            setFetchMessage("Success!");
            props.setMode("add");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setFetchMessage(errors.wordError!);
    }
  };

  const resetFields = () => {
    setPinyin("");
    setEngTrans("");
    setWord("");
    props.setMode("generate");
    setCurrCharArr([]);
    setStrokeInfo([]);
    setWordInfo([]);
    setErrors({});
    props.setCurrIndex(null);
    setFetchMessage("");
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const isValid = handleValidation();

    if (isValid) {
      var newStateValue = [...props.allData];
      newStateValue[props.currIndex!]["wordInfo"] = currCharArr;
      newStateValue[props.currIndex!]["wordInfo"][0].pinyin = pinyin;
      newStateValue[props.currIndex!]["wordInfo"][0].english = engTrans;

      props.setAllData(props.allData);

      resetFields();
    }
  };

  useEffect(() => {
    if (props.mode === "edit") {
      setWord(props.allData[props.currIndex!]["wordInfo"][0]["hanzi"]);
      setPinyin(props.allData[props.currIndex!]["wordInfo"][0]["pinyin"]);
      setEngTrans(props.allData[props.currIndex!]["wordInfo"][0]["english"]);
      setCurrCharArr(props.allData[props.currIndex!]["wordInfo"]);
    }
  }, [props.currIndex]);

  const charArrOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ind: number
  ) => {
    const arr = JSON.parse(JSON.stringify(currCharArr));

    if (e.target.name === "pinyin") {
      for (const key in chars) {
        if (!chars.hasOwnProperty(key)) {
          continue;
        }
        let newString = e.target.value.replace(key, chars[key]);
        e.target.value = newString;
        arr[ind].pinyin = newString;
      }
      setCurrCharArr(arr);
    } else if (e.target.name === "english") {
      arr[ind].english = e.target.value;
    }

    setCurrCharArr(arr);
  };

  const removeInput = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    let data = [...props.allData];
    data.splice(props.currIndex!, 1);
    props.setAllData(data);

    resetFields();
  };

  useEffect(() => {
    if (props.mode === "generate" && errors.wordError) {
      setFetchMessage(errors.wordError);
    }
  }, [errors.wordError]);

  return (
    <div
      className={`flex flex-col gap-y-12 lowercase ${
        props.view === "Input" ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col gap-y-3">
        <p
          className="text-red-400 underline underline-offset-8 decoration-wavy decoration-1 decoration-red-400
"
        >
          重要 ‼️
        </p>
        <p>A minimum of 1 word is required to create the worksheet!</p>
      </div>

      <form className="flex flex-col gap-y-10" action="/" id="forms">
        <div className="flex flex-col gap-y-2">
          <label className="font-newsreader italic text-lg" htmlFor="title">
            Input
          </label>
          <input
            type="text"
            autoComplete="off"
            onChange={(e) => setWord(e.target.value)}
            value={word}
            id="word"
            name="word"
            disabled={props.mode !== "generate"}
            onKeyDown={(e) => {
              e.key === "Enter" && getInfo(e);
            }}
            className="ring-1 ring-carbon focus:outline-dune bg-pearl rounded-md p-2 w-full disabled:cursor-not-allowed"
          />
        </div>

        {fetchMessage ===
        "Input too short. Please enter a word that is at least 1 character long." ? (
          <div className="flex gap-x-4 sm:gap-x-2 text-yellow-600 border-[1px] border-yellow-600 rounded-md bg-yellow-50 p-2 items-center">
            <IoWarningOutline className="size-8 sm:size-4" />
            <p>{fetchMessage}</p>
          </div>
        ) : fetchMessage ===
          "Invalid word. Please enter a valid word in Chinese." ? (
          <div className="flex gap-x-4 sm:gap-x-2 text-yellow-600 border-[1px] border-yellow-600 rounded-md bg-yellow-50 p-2 items-center">
            <IoWarningOutline className="size-6 sm:size-4" />
            <p>{fetchMessage}</p>
          </div>
        ) : fetchMessage === `Could not find data for the given word.` ? (
          <div className="flex gap-x-2 text-red-500 border-[1px] border-red-500 rounded-md bg-red-50 p-2 items-center">
            <RxCrossCircled className="size-6 sm:size-4" />
            <p>{fetchMessage}</p>
          </div>
        ) : fetchMessage ===
          "Word already exists. Please try a different one." ? (
          <div className="flex gap-x-2 text-red-500 border-[1px] border-red-500 rounded-md bg-red-50 p-2 items-center">
            <RxCrossCircled className="size-6 sm:size-4" />
            <p>{fetchMessage}</p>
          </div>
        ) : fetchMessage === "Success!" ? (
          <div className="flex gap-x-2 text-green-700 border-[1px] border-green-700 rounded-md bg-green-50 p-2 items-center">
            <HiOutlineCheckCircle className="size-4" />
            <p>{fetchMessage}</p>
          </div>
        ) : null}

        {props.mode === "generate" ? (
          <div className="flex flex-col gap-y-4">
            <button
              type="button"
              className="lowercase bg-dune text-white rounded-md p-2 hover:bg-smoke"
              onClick={(e) => {
                getInfo(e);
              }}
            >
              {buttonMessage}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <label className="font-newsreader italic text-lg" htmlFor="title">
                Pinyin
              </label>
              <input
                type="text"
                autoComplete="off"
                onChange={(e) => handleChangePinyin(e)}
                value={pinyin}
                id="pinyin"
                name="pinyin"
                maxLength={60}
                onKeyDown={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                className="ring-1 ring-carbon focus:outline-dune bg-pearl rounded-md p-2 w-full"
              />
              {errors.pinyinError ? (
                <p className="text-red-500">{errors.pinyinError}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="font-newsreader italic text-lg" htmlFor="title">
                English
              </label>
              <textarea
                autoComplete="off"
                onChange={(e) => setEngTrans(e.target.value)}
                value={engTrans}
                id="engTrans"
                name="engTrans"
                rows={2}
                maxLength={60}
                onKeyDown={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                className="ring-1 ring-carbon focus:outline-dune bg-pearl rounded-md p-2 w-full"
              />
              {errors.engError ? (
                <p className="text-red-500">{errors.engError}</p>
              ) : null}
            </div>

            {props.mode === "add" || props.mode === "edit" ? (
              <div className="flex flex-col gap-y-10">
                <div className="flex flex-col gap-y-4">
                  {currCharArr.map((char, index) => {
                    if (index !== 0) {
                      return (
                        <div key={index} className="flex gap-x-4 w-full">
                          <p className="ring-1 font-medium cursor-not-allowed ring-carbon focus:outline-dune bg-pearl rounded-md p-2 w-fit disabled:cursor-not-allowed">
                            {char["hanzi"]}
                          </p>
                          <input
                            type="text"
                            autoComplete="off"
                            id="charPin"
                            name="pinyin"
                            value={char["pinyin"]}
                            maxLength={6}
                            onKeyDown={(e) => {
                              e.key === "Enter" && e.preventDefault();
                            }}
                            onChange={(e) => charArrOnChange(e, index)}
                            className="ring-1 ring-carbon focus:outline-dune bg-pearl rounded-md p-2 w-1/4 disabled:cursor-not-allowed"
                          ></input>
                          <input
                            type="text"
                            autoComplete="off"
                            id="charEng"
                            name="english"
                            value={char["english"]}
                            maxLength={60}
                            onKeyDown={(e) => {
                              e.key === "Enter" && e.preventDefault();
                            }}
                            onChange={(e) => charArrOnChange(e, index)}
                            className="ring-1 ring-carbon focus:outline-dune bg-pearl rounded-md p-2 w-full disabled:cursor-not-allowed"
                          ></input>
                        </div>
                      );
                    }
                  })}

                  <div className="flex justify-between">
                    {" "}
                    {errors.charPinError ? (
                      <p className="text-red-500">{errors.charPinError}</p>
                    ) : null}
                    {errors.charEngError ? (
                      <p className="text-red-500">{errors.charEngError}</p>
                    ) : null}
                  </div>
                </div>
                {props.mode === "edit" ? (
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={(e) => removeInput(e)}
                      className="lowercase text-red-400 font-semibold"
                    >
                      delete
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleUpdate(e)}
                      className="lowercase bg-dune text-white rounded-md p-2 hover:bg-smoke"
                    >
                      update
                    </button>
                  </div>
                ) : null}

                {props.mode === "add" ? (
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={resetFields}
                      className="lowercase text-dune"
                    >
                      reset
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleSubmit(e)}
                      className="lowercase bg-dune text-white rounded-md p-2 hover:bg-smoke"
                    >
                      add
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        )}
      </form>
    </div>
  );
}
