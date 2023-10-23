"use client";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { PiWarningLight } from "react-icons/pi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { jsPDF } from "jspdf";
import  "./fonts/TOBold-bold.js";
import "./fonts/GTWalsheimPro-Medium-normal.js";
import "./fonts/NotoSansSC-SemiBold-normal.js";
import "./fonts/KaiTi-normal.js";
import "./fonts/Classic Song ti Font-normal.js";

export default function Home(props) {
  const [word, setWord] = useState("");
  const [pinyin, setPinyin] = useState("");
  const [engTrans, setEngTrans] = useState("");
  const [wordLength, setWordLength] = useState();
  const [charArray, setCharArray] = useState([]);
  const [charsArrs, setCharsArr] = useState([]);

  const [pinyinArr, setPinyinArr] = useState([]);

  const [currentArr, setCurrArr] = useState([]);

  const [showPinArr, setPinArr] = useState(false);

  const [generateState, setGenerateState] = useState(true);
  const [infoFields, setInfoFields] = useState(false);

  const [generateWord, setGenerateWord] = useState(true);

  const [disableWord, setDisableWord] = useState(true);

  const vowels = ['a', 'e', 'i', 'o', 'u', 'ü'];

  const charNums = {
    'a' : "āáǎà",
    'e' : "ēéěè",
    'i' : "īíǐì",
    'o' :  "ōóǒò",
    'u' : "ūúǔù",
    'ü' : "ǖǘǚǜ",
    'A' :  "ĀÁǍÀ",
    'E' : "ĒÉĚÈ",
    'I' : "ĪÍǏÌ",
    'O' : "ŌÓǑÒ",
    'U' : "ŪÚǓÙ",
    'Ü' :  "ǕǗǙǛ"
  }


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
  };

  const [inputWords, setInputWords] = useState([]);

  const [edit, setEdit] = useState(false);
  const [i, setI] = useState();
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);

  const [buttonState, setButtonState] = useState("add");

  const [wordError, setWordError] = useState("");
  const [pinyinError, setPinyinError] = useState("");
  const [engError, setEngError] = useState("");
  const [charPinError, setCharPinError] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [foundWord, setFoundWord] = useState(false);
  /*const sendWord = async (e) => {
        try {
            fetch("/api/getWord", {
              method: "POST",
              header: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                word: word,
              }),
            });
          } catch (err) {
            console.log("Error");
          }
    }*/

  /*const sendWord = async (e) => {
        try {
            fetch("/api/getWord?word=" + word, {
              method: "GET",
              header: {
                "Content-Type": "application/json",
              },
            });
          } catch (err) {
            console.log("Error");
          }
    }*/


    const changeGeneratedPinyin = (pinyin) => {
        const newChArr = pinyin.split(" ");
        console.log(newChArr);
    
        /*for (let i = 0; i < newChArr.length; i++){
                for (const key in chars) {
                    if (!chars.hasOwnProperty(key)) {
                        continue;
                    }
                    let newString = e.target.value.replace(key, chars[key])
                    //console.log(newString);
                    e.target.value = newString;
                    setPinyin(e.target.value);
                }
            }*/
    
        /*for (let i = 0; i < newChArr.length; i++) {
          console.log(newChArr[i]);
          for (const key in chars) {
            if (!chars.hasOwnProperty(key)) {
              continue;
            }
    
            newChArr[i] = newChArr[i].replace(key, chars[key]);
          }
        }*/
        

        for (let j = 0; j < newChArr.length; j++){
            let lastIndex = newChArr[j].length - 1;
            let tone = newChArr[j][lastIndex];
            console.log("tone:", tone)

            newChArr[j] = newChArr[j].slice(0,-1)
            console.log("newChar:", newChArr[j])

            if (tone == 5){
                console.log('tone 5 pass')
                continue;
            }
            else if (newChArr[j].includes('iu') || newChArr[j].includes('ui')){
                newChArr[j] = newChArr[j].replace('u', charNums['u'][tone-1])
            }
            else if (newChArr[j].includes('IU') || newChArr[j].includes('UI')){
                newChArr[j] = newChArr[j].replace('U', charNums['U'][tone-1])
            }
            else {
                for (const key in charNums){
                    if (!charNums.hasOwnProperty(key)){
                        continue;
                    }

                    if (newChArr[j].includes(key)){
                        newChArr[j] = newChArr[j].replace(key, charNums[key][tone-1])
                        break;
                    }
                }
            }

           }
          
        //console.log(newChArr);
        let newPinyin = newChArr.join(" ");
        setPinyin(newPinyin);
        console.log("newpinyin:",newPinyin)
        console.log("PINYINN:", pinyin);
      }
    
      const handleChangePinyin = (e) => {
        setPinyin(e.target.value);
        //console.log(e.target.value)
    
        for (const key in chars) {
          if (!chars.hasOwnProperty(key)) {
            continue;
          }
          let newString = e.target.value.replace(key, chars[key]);
          //console.log(newString);
          e.target.value = newString;
          setPinyin(e.target.value);
        }
      };


  const sendWord = async () => {
    let worked = false;


    try {
      const res = await fetch("/api/getWord?word=" + word, {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      });

      const er = await res.json();
      /*if (er.hasOwnProperty("error")){
                console.log("has error")
                const {error} = er;
                console.log(error)
                setErrorMessage("word not found")
            }*/
      if (Object.entries(er).length === 0) {
        //alert("cannot find requested word")
        console.log("has error");
        const { error } = er;
        console.log("error:", error);
        setWordError("");
        setErrors({});
        setErrorMessage("Could not find word. Please enter a valid word.");
        //setFoundWord(false);
      } else {
      /*if (!res.ok){
            const errorData = await res.json();

            //const {message} = errorData;
            console.log(errorData)
            //console.log(message);
            //console.log(res.message)
            setErrorMessage("word not found")
            //throw new Error('failed to fetch data')
        }*/
        setErrorMessage("Word found.");
        //const data = await res.json();
        //console.log(data);
        console.log("er: ", er);
        const { traditional, simplified, english, pinyin } = er;
        setWord(simplified);
        setEngTrans(english);
        setPinyin(pinyin);

        changeGeneratedPinyin(pinyin);
        console.log("pinyin after change:", pinyin)
        worked = true;
        //setFoundWord(true);
      }
    } catch (err) {
      console.log(err);
    }
    console.log("worked:",worked)
    return worked;
  };

  useEffect(() => {
    if (!generateWord){

        console.log(pinyin)

        /*for (let ind = 0; ind < word.length; ind++) {
                    let para = document.createElement("p");
                    para.innerText = word[ind];
                    document.getElementById("pinyinFields").appendChild(para);
                }*/

        console.log("word in generate inputs:", word)
        let wordL = word.length;

        console.log("pinyin in generate inputs", pinyin)
        const ps = pinyin.split(" ");
        //console.log("ps:", ps)
        //console.log("pinyin", pinyin);
        console.log("wordl:", wordL);
        for (let inds = 0; inds < wordL; inds++) {
          //arr.push({
          //    hanChar: word[inds],
          //    charPin: inds
          //});
          //console.log("ps[inds]:", ps[inds])
          charArray.push({
            hanChar: word[inds],
            charPin: ps[inds],
          });
        }
        setPinArr(true);
        console.log("CHAR ARRAY", charArray);
        setGenerateWord(true)
    }
},[generateWord, pinyin, word, charArray]);

  const generateInputs = async (e) => {
    let tempErrors = {};
    let isValid = true;

    setErrorMessage("");

    if (word.length <= 0) {
      tempErrors["word"] = true;
      isValid = false;
      setWordError("Input too short. Please enter a word that is at least 1 character long.");
      setErrors({ ...tempErrors });
      //console.log("errors", errors);
      //console.log("isValid", isValid)
    } else if (!/^[\u4E00-\u9FCC]+$/i.test(word)) {
      tempErrors["word"] = true;
      isValid = false;
      setWordError("Invalid word. Please enter a word in Chinese.");
      setErrors({ ...tempErrors });
      console.log("invalid word");
    } else {
      if (await sendWord()) {
        console.log("sendWord returned true");
        tempErrors = {};
        isValid = true;
        setWordError("");
        setErrors({});
        setGenerateState(false);
        setInfoFields(true);
        setWordLength(word.length);
        setGenerateWord(false);
        setDisableWord(false);
        
      } else {
        console.log("send word false");
      }
    }
  };

  const handleChangeWord = (e) => {
    setWord(e.target.value);
  };


  const handleChangeEngTrans = (e) => {
    setEngTrans(e.target.value);
  };

  const handleClick = (i, e) => {
    e.preventDefault();
    const isValid = handleValidation();

    setErrorMessage("")
    if (isValid) {
      if (!edit) {
        setCharsArr([...charsArrs, charArray]);
        console.log("charArray", charArray);
        setInputWords([
          ...inputWords,
          { word: word, pinyin: pinyin, engTrans: engTrans },
        ]);
        setPinArr(false);
      } else {
        let data = [...inputWords];
        //let text = data[i];
        //data[i] = word;
        //data[i][e.target.name] = e.target.value;
        let value = data[i];
        value.word = word;
        value.pinyin = pinyin;
        value.engTrans = engTrans;
        setInputWords(data);
      }
      //console.log("charArray", charArray)
      setWord("");
      setPinyin("");
      setEngTrans("");
      setCharArray([]);
      setCurrArr([]);
      setEdit(false);
      setButtonState("add");
      setInfoFields(false);
      setGenerateState(true);
      setPinArr(false);
      setGenerateWord(true);
      setDisableWord(true);
    } else {
      console.log("not valid");
    }
  };

  const handleValidation = () => {

    setErrors({});
    let tempErrors = {};

    setCharPinError("");
    setPinyinError("");
    setEngError("");

    let isValid = true;

    if (word.length <= 0) {
      tempErrors["word"] = true;
      isValid = false;
      setWordError("Input too short. Please enter a word that is at least 1 character long.");
    }

    if (!/^[\u4E00-\u9FCC]+$/i.test(word)) {
      tempErrors["word"] = true;
      isValid = false;
      setWordError("Invalid word. Please enter a word in Chinese.");
      console.log("invalid word");
    }

    if (pinyin.length <= 0) {
      tempErrors["pinyin"] = true;
      isValid = false;
      setPinyinError("Pinyin field too short.");
    }

    if (engTrans.length <= 0) {
      tempErrors["engTrans"] = true;
      isValid = false;
      setEngError("English Translation too short.");
    }
    const val = validateCharPin();
    if (!val) {
      tempErrors["charPin"] = true;
      isValid = false;
      setCharPinError("Missing pinyin field(s).");
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    console.log("isValid", isValid);
    return isValid;
  };

  const removeInput = (index, e) => {
    e.stopPropagation();

    console.log("CURRENT INDEX TO REMOVE:", index);

    let stIn = 0;
    while (stIn < inputWords.length) {
      if (inputWords[stIn].word === word) {
        console.log("ON CURRENT INDEX WORD");
        console.log("stIn", stIn);
        setI(stIn);
        break;
      }
      stIn++;
    }

    let data = [...inputWords];
    data.splice(index, 1);
    setInputWords(data);
    console.log("data", data);
    if (index === 0) {
      console.log("index == 0");
    }

    let newCharArr = [...charsArrs];
    newCharArr.splice(index, 1);
    setCharsArr(newCharArr);

    if (edit) {
      console.log("edit is on");
    } else {
      console.log("edit is off");
    }

    if (inputWords.length === 0) {
      console.log("length is 0");
    } else {
      console.log("length is not 0", length);
      console.log(inputWords);
    }

    if (index === i) {
      console.log("index == i");
      console.log("index", index);
      console.log("i", i);
    } else {
      console.log("index != i");
      console.log("index", index);
      console.log("i", i);
    }

    if ((edit && inputWords.length <= 0) || (edit && index === stIn)) {
      setWord("");
      setPinyin("");
      setEngTrans("");
      setEdit(false);
      setInfoFields(false);
      setCharArray([])
      if (inputWords.length <= 0) {
        setGenerateState(true);
        setButtonState("add");
        //setButtonState(false)
      }
      if (index === stIn) {
        //setGenerateState(true)
        setGenerateState(true);
        setButtonState("add");
        setCurrArr([]);
        setPinArr(false);
        setGenerateWord(true);
        setDisableWord(true)
      }
    }
    //setWordError("");
    //setErrors({});
  };


  const changeInput = (index, e) => {
    setCurrArr(charsArrs[index]);

    setEdit(true);
    setButtonState("update");
    setGenerateState(false);
    setInfoFields(true);
    setPinArr(true);
    setGenerateWord(false);
    setDisableWord(false);
    console.log("current i:", i);
    let data = [...inputWords];
    let value = data[index];
    let text = value.word;
    let pinyinIn = value.pinyin;
    let engIn = value.engTrans;
    setWord(text);
    setPinyin(pinyinIn);
    setEngTrans(engIn);
  };

  const charPinOnChange = (e, ind) => {
    const newState = [...charArray];

    for (const key in chars) {
      if (!chars.hasOwnProperty(key)) {
        continue;
      }
      let newString = e.target.value.replace(key, chars[key]);
      //console.log(newString);
      e.target.value = newString;
      newState[ind].charPin = e.target.value;
    }

    setCharArray(newState);

  };

  const charArrOnChange = (e, ind) => {
    
    const newState = [...charsArrs];

    console.log("newState", newState)
    for (const key in chars) {
      if (!chars.hasOwnProperty(key)) {
        continue;
      }
      let newString = e.target.value.replace(key, chars[key]);
      //console.log(newString);
      e.target.value = newString;
      charsArrs[i][ind].charPin = e.target.value;
    }

    setCharsArr(newState);
    /*const {value, name} = e.target;
        const newState = [...charsArrs];
        console.log("charsArrs[i]", charsArrs[i])
        charsArrs[i][ind].charPin = value;
        setCharsArr(newState);*/
  };

  const validateCharPin = () => {
    let isValid = true;

    if (!edit) {
      charArray.forEach(function (item, index) {
        if (charArray[index].charPin === "") {
          isValid = false;
          console.log("TOO SHORT", index);
          return false;
        }
      });
    } else if (edit) {
      currentArr.forEach(function (item, index) {
        if (currentArr[index].charPin === "") {
          isValid = false;
          console.log("TOO SHORT", index);
          return false;
        }
      });
    }
    return isValid;
  };

  const resetFields = (e) => {
    setPinyin("");
    setEngTrans("");
    setPinyin("");
    setWord("");
    setEdit(false);
    setCharArray([]);
    setGenerateState(true);
    setGenerateWord(true);
    setDisableWord(true);
    setPinArr(false);
    setInfoFields(false);
    setButtonState("add");
    setWordError("");
    setEngError("");
    setPinyinError("");
    setCharPinError("");
    setErrors({});
    setErrorMessage("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doc = new jsPDF();

    doc.setFontSize(64);


    let y = 1;
    inputWords.forEach((element, index) => {
        doc.setFont('Classic Song ti Font','normal');
        doc.text(element.word, 10, (y*10));

        doc.setFont('KaiTi');
        doc.text(element.word, 10, (y*30));
        doc.setFontSize(12);


        doc.setFont('GTWalsheimPro-Medium','normal');
        doc.text(element.pinyin, 20, (y*10));

        doc.setFont('GTWalsheimPro-Medium','normal');
        doc.text(element.engTrans, 10, (y*20));
        doc.setLineDashPattern([0.5,2])
        doc.line(10,25,60,25)
        y = y+2;
    });
    doc.output('dataurlnewwindow');

  }


  console.log("CURRENT INPUT, INPUTWORDS", inputWords);
  //console.log(inputWords.length)
  console.log("CHARSARRS", charsArrs);
  console.log("CURRENTARR", currentArr);
  console.log("charArray:",charArray)
  console.log("i:", i)

  return (
    <div className="flex flex-col justify-start items-start m-10 gap-y-6 sm:m-20">
      <div>
        <Image
          src="./box cat.svg"
          alt="cat in a box"
          width="0"
          height="0"
          priority={true}
          className="w-56 h-auto"
        ></Image>
        <p className="text-3xl mt-6">
          chinese stroke order and character worksheet generator
        </p>
        <p className="text-4xl font-takeoffBold mt-2">田字格字帖生成器</p>
      </div>

      <p className="mt-4">
        simply add/delete characters or words and customize the worksheet as
        you&apos;d like
      </p>

      <div className="w-full sm:w-full lg:w-fit">
        <form className="space-y-20" action="/" id= "forms">
          <div className="space-y-6">
            <fieldset className="border-2 border-sesame rounded-md p-4 w-full">
              <legend className="font-walsheimBold bg-sesame text-cozyWhite px-2">
                guide <span className="font-takeoffBold text-lg">领路</span>
              </legend>
              <div className="flex flex-col gap-y-2 md:flex md:flex-row md:gap-x-6">
                <div className="space-x-2 flex flex-row">
                  <input
                    type="radio"
                    id="guide_none"
                    name="guide"
                    value="none"
                  />
                  <label htmlFor="guide_none">none</label>
                  <Image
                    src="/plain-box.svg"
                    alt="plain box"
                    width={25}
                    height={25}
                    className="border-[1px] border-lightGrey"
                  ></Image>
                </div>

                <div className="space-x-2 flex flex-row">
                  <input
                    type="radio"
                    id="guide-cross"
                    name="guide"
                    value="cross"
                  />
                  <label htmlFor="guide-cross">cross</label>
                  <Image
                    src="/cross-grid.svg"
                    alt="cross box"
                    width={25}
                    height={25}
                    className="border-[1px] border-lightGrey"
                  ></Image>
                </div>

                <div className="space-x-2 flex fex-row">
                  <input
                    type="radio"
                    id="guide-star"
                    name="guide"
                    value="star"
                  />
                  <label htmlFor="guide-star">star</label>
                  <Image
                    src="/star-grid.svg"
                    alt="star box"
                    width={25}
                    height={25}
                    className="border-[1px] border-lightGrey"
                  ></Image>
                </div>

                <div className="space-x-2 flex flex-row">
                  <input
                    type="radio"
                    id="cross-star"
                    name="guide"
                    value="cross-star"
                  />
                  <label htmlFor="cross-star">cross + star</label>
                  <Image
                    src="/both-grid.svg"
                    alt="both box"
                    width={25}
                    height={25}
                    className="border-[1px] border-lightGrey"
                  ></Image>
                </div>
              </div>
            </fieldset>

            <fieldset className="border-2 border-sesame rounded-md p-4 w-full">
              <legend className="font-walsheimBold bg-sesame text-cozyWhite px-2">
                layout <span className="font-takeoffBold text-lg">布局</span>
              </legend>
              <div className="flex flex-col gap-y-2 md:flex md:flex-row md:gap-x-6">
                <div className="space-x-2 flex flex-row">
                  <input
                    type="radio"
                    id="word-once"
                    name="layout"
                    value="word-once"
                  />
                  <label htmlFor="word-once">word (once)</label>
                </div>

                <div className="space-x-2 flex flex-row">
                  <input
                    type="radio"
                    id="word-full"
                    name="layout"
                    value="word-full"
                  />
                  <label htmlFor="word-full">word (full line)</label>
                </div>

                <div className="space-x-2 flex fex-row">
                  <input
                    type="radio"
                    id="word-extra"
                    name="layout"
                    value="word-extra"
                  />
                  <label htmlFor="word-extra">
                    word (full line + extra line)
                  </label>
                </div>

                <div className="space-x-2 flex fex-row">
                  <input
                    type="radio"
                    id="word-fill"
                    name="layout"
                    value="word-fill"
                  />
                  <label htmlFor="word-fill">word (fill)</label>
                </div>

                <div className="space-x-2 flex flex-row">
                  <input
                    type="radio"
                    id="stroke-once"
                    name="layout"
                    value="stroke-once"
                  />
                  <label htmlFor="stroke-once">stroke order (once)</label>
                </div>

                <div className="space-x-2 flex flex-row">
                  <input
                    type="radio"
                    id="stroke-extra"
                    name="layout"
                    value="stroke-extra"
                  />
                  <label htmlFor="stroke-extra">
                    stroke order + extra line
                  </label>
                </div>

                <div className="space-x-2 flex flex-row">
                  <input
                    type="radio"
                    id="stroke-fill"
                    name="layout"
                    value="stroke-fill"
                  />
                  <label htmlFor="stroke-fill">stroke order (fill)</label>
                </div>
              </div>
            </fieldset>

            <fieldset className="border-2 border-sesame rounded-md p-4 w-full">
              <legend className="font-walsheimBold bg-sesame text-cozyWhite px-2">
                pinyin?
              </legend>
              <div className="flex flex-row gap-x-2">
                <input
                  type="checkbox"
                  id="include-pinyin"
                  name="include-pinyin"
                  value="include-pinyin"
                />
                <label htmlFor="include-pinyin">include pinyin</label>
              </div>
            </fieldset>

            <fieldset className="border-2 border-sesame rounded-md p-4 w-full">
              <legend className="font-walsheimBold bg-sesame text-cozyWhite px-2">
                english translation?
              </legend>
              <div className="flex flex-row gap-x-2">
                <input
                  type="checkbox"
                  id="include-eng"
                  name="include-eng"
                  value="include-eng"
                />
                <label htmlFor="include-eng">include eng translation</label>
              </div>
            </fieldset>
          </div>

          <div className="flex flex-col gap-y-20 md:flex-row md:gap-x-10 md:justify-between">
            <div className="space-y-6 md:w-1/2">
              <div className="">
                <h3 className="font-walsheimBold text-2xl">add/delete words</h3>
                <h2 className="">max. 30 words</h2>
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="word" className="text-lg font-walsheimBold">
                  characters{" "}
                  <span className="font-takeoffBold text-lg">汉字</span>
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  onChange={handleChangeWord}
                  value={word}
                  id="word"
                  name="word"
                  disabled={!disableWord}
                  className="rounded-md border-2 border-stone-300 focus:outline-[#a66e6d] p-2 w-full disabled:border-stone-300 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  onKeyDown={(e) => {
                    e.key === "Enter" && handleClick(i, e);
                  }}
                />
              </div>

              {errors?.word && !edit && (
                <div className="flex flex-row space-x-4 border border-yellow-400 rounded p-3 bg-yellow-50">
                    <PiWarningLight className="stroke-[8px] text-yellow-700 relative top-[1px]" size={20}/>
                    <div className="text-yellow-700"><span className="font-semibold">Input Error! </span>{wordError}</div>
                </div>
              )}

            {errorMessage === "Could not find word. Please enter a valid word."  && !edit  ? (
                <div className="flex flex-row space-x-4 border border-red-400 rounded p-3 bg-red-50">
                    <RxCrossCircled className="stroke-[0.5px] text-red-700 relative top-[2px]" size={20}/>
                    <div className="text-red-700"><span className="font-semibold">Data Error! </span>{errorMessage}</div>
                </div>
              ) 
              : errorMessage === "Word found." && !edit ? 
                <div className="flex flex-row space-x-4 border border-green-600 rounded p-3 bg-green-50">
                    <HiOutlineCheckCircle className="stroke-2 text-green-800 relative top-[1px]" size={20}/>
                <div className="text-green-800"><span className="font-semibold">Success! </span>{errorMessage}</div>
            </div>
            : null}



            <div className = "flex flex-row space-x-4">
              <button
                type="button"
                onClick={(e) => {
                  generateInputs(e);
                }}
                className={
                  generateState
                    ? "text-lg bg-sesame hover:bg-[#a66e6d] text-cozyWhite rounded-md p-2 px-4 font-bold transition ease-in-out duration-500"
                    : "hidden"
                }
              >
                generate pinyin + eng trans
              </button>

              <button
                  type="button"
                  onClick={handleSubmit}
                  className={
                    !edit
                      ? "mr-4 text-xl  hover:text-[#a66e6d] text-sesame font-bold transition ease-in-out duration-500"
                      : "hidden"
                  }
                >
                  submit
                </button>
                </div>

              <div
                className={
                  generateState
                    ? "hidden"
                    : "block border-l-4 border-[#a66e6d] pl-4"
                }
              >
                <h4 className="text-[#a66e6d] font-walsheimBold underline underline-offset-4">
                  notes!
                </h4>
                <p>
                  <span className="font-walsheimBold text-[#a66e6d]">*</span> to
                  add accent marks, just type the corresponding tone number
                  after the vowel. (ex: a1 = ā, e3 = ě)
                </p>
                <p>
                  <span className="font-walsheimBold text-[#a66e6d]">*</span> ü
                  = v0 | ǖ = v1 | ǘ = v2 | ǚ = v3 | ǜ = v4
                </p>
              </div>

              <div
                className={
                  showPinArr && !edit
                    ? "flex flex-col gap-x-2 flex-wrap gap-y-6 mt-4"
                    : "hidden"
                }
              >
                {charArray.map((x, charInd) => (
                  <div key={charInd} className="flex flex-row gap-x-4">
                    <div
                      key={charInd}
                      className="disabled bg-[#dbbeb9] rounded-md w-fit p-2 font-takeoffBold text-xl hover:cursor-not-allowed"
                    >
                      {x.hanChar}
                    </div>
                    <input
                      type="text"
                      id="charArray"
                      name="charArray"
                      onChange={(e) => charPinOnChange(e, charInd)}
                      autoComplete="off"
                      value={x.charPin}
                      placeholder="..."
                      className="w-full bg-white p-2 focus:outline-[#a66e6d] rounded-md border-2 border-stone-300"
                    />
                  </div>
                ))}
                {errors?.charPin && (
                  <p className=" text-red-400">{charPinError}</p>
                )}
              </div>

              <div
                className={
                  edit
                    ? "flex flex-col gap-x-2 flex-wrap gap-y-6 mt-4"
                    : "hidden"
                }
              >
                {currentArr.map((c, charInd) => (
                  <div key={charInd} className="flex flex-row gap-x-4">
                    <div
                      key={charInd}
                      className="disabled bg-[#dbbeb9] rounded-md w-fit p-2 font-takeoffBold text-xl hover:cursor-not-allowed"
                    >
                      {c.hanChar}
                    </div>
                    <input
                      type="text"
                      id="currentArr"
                      name="currentArr"
                      onChange={(e) => charArrOnChange(e, charInd)}
                      autoComplete="off"
                      value={c.charPin}
                      //placeholder=".?"
                      className="w-full bg-white p-2 focus:outline-[#a66e6d] rounded-md border-2 border-stone-300"
                    />
                  </div>
                ))}
                {errors?.charPin && (
                  <p className=" text-red-400">{charPinError}</p>
                )}
              </div>

              <div className={infoFields ? "block space-y-6" : "hidden"}>
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="pinyin" className="text-lg font-walsheimBold">
                    pinyin{" "}
                    <span className="font-takeoffBold text-lg">拼音</span>
                  </label>
                  <input
                    type="text"
                    id="pinyin"
                    name="pinyin"
                    value={pinyin}
                    autoComplete="off"
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    onChange={handleChangePinyin}
                    className="rounded-md border-2 border-stone-300 focus:outline-[#a66e6d] p-2 w-full"
                  ></input>
                </div>
                {errors?.pinyin && (
                  <p className="text-red-400">{pinyinError}</p>
                )}

                <div className="flex flex-col gap-y-2">
                  <label htmlFor="pinyin" className="text-lg font-walsheimBold">
                    eng translation
                  </label>
                  <textarea
                    rows="1"
                    type="text"
                    id="eng-trans"
                    name="eng-trans"
                    value={engTrans}
                    autoComplete="off"
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    onChange={handleChangeEngTrans}
                    className="flex-wrap hover:h-32 h-11 transition-all duration-700 ease-in-out rounded-md border-2 border-stone-300 focus:outline-[#a66e6d] p-2 w-full"
                  ></textarea>
                </div>
                {errors?.engTrans && (
                  <p className=" text-red-400">{engError}</p>
                )}

                <button
                  onClick={(e) => resetFields(e)}
                  type="button"
                  className={
                    !edit
                      ? "mr-4 text-xl  hover:text-[#a66e6d] text-sesame font-bold transition ease-in-out duration-500"
                      : "hidden"
                  }
                >
                  reset
                </button>
                <button
                  onClick={(e) => handleClick(i, e)}
                  type="button"
                  className="text-lg bg-sesame hover:bg-[#a66e6d] text-cozyWhite rounded-md p-2 px-4 font-bold transition ease-in-out duration-500"
                >
                  {buttonState}
                </button>
              </div>
            </div>

            <fieldset className="border-2 border-sesame rounded-md p-4 md:w-3/5 h-fit">
              <legend className="font-walsheimBold bg-sesame text-cozyWhite px-2">
                input
              </legend>
              <p>
                click on the &quot;X&quot; to delete a word or click on the word
                to make any edits
              </p>
              <p className="text-red-400">
                <span className="font-walsheimBold underline underline-offset-4">
                  warning!
                </span>{" "}
                editing a word will replace any current data in the input fields
              </p>
              <div className="flex flex-row gap-x-2 flex-wrap gap-y-2 mt-4">
                {inputWords.map((x, index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      setI(index);
                      changeInput(index, e);
                    }}
                    className=" bg-sesame text-cozyWhite w-fit p-2 px-4 rounded-md transition duration-500 ease-in-out hover:bg-[#a66e6d] hover:cursor-pointer"
                  >
                    <button
                      type="button"
                      onClick={(e) => removeInput(index, e)}
                    >
                      <AiOutlineClose
                        className="relative top-1 -left-1"
                        size={20}
                      />
                    </button>{" "}
                    {x.word}
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
}