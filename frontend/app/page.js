'use client'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";

export default function Home() {    
    const [word, setWord] = useState("");
    const [pinyin, setPinyin] = useState("");
    const [engTrans, setEngTrans] = useState("");
    const [wordLength, setWordLength] = useState();
    const [charArray, setCharArray] = useState([]);
    const [charsArrs, setCharsArr] = useState([]);

    const [currentArr, setCurrArr]= useState([]);


    const [showPinArr, setPinArr] = useState(false);

    const [generateState, setGenerateState] = useState(true);
    const [infoFields, setInfoFields] = useState(false);

    const [generateWord, setGenerateWord] = useState(true)

    const chars = {
        "a1": "ā",
        "a2": "á",
        "a3": "ǎ",
        "a4": "à",
        "e1": "ē",
        "e2": "é",
        "e3": "ě",
        "e4": "è",
        "i1": "ī",
        "i2": "í",
        "i3": "ǐ",
        "i4": "ì",
        "o1": "ō",
        "o2": "ó",
        "o3": "ǒ",
        "o4": "ò",
        "u1": "ū",
        "u2": "ú",
        "u3": "ǔ",
        "u4": "ù",
        "v0": "ü",
        "v1": "ǖ",
        "v2": "ǘ",
        "v3": "ǚ",
        "v4": "ǜ",
        "A1": "Ā",
        "A2": "Á",
        "A3": "Ǎ",
        "A4": "À",
        "E1": "Ē",
        "E2": "É",
        "E3": "Ě",
        "E4": "È",
        "I1": "Ī",
        "I2": "Í",
        "I3": "Ǐ",
        "I4": "Ì",
        "O1": "Ō",
        "O2": "Ó",
        "O3": "Ǒ",
        "O4": "Ò",
        "U1": "Ū",
        "U2": "Ú",
        "U3": "Ǔ",
        "U4": "Ù",
        "V0": "Ü",
        "V1": "Ǖ",
        "V2": "Ǘ",
        "V3": "Ǚ",
        "V4": "Ǜ",
    }

    const [inputWords, setInputWords] = useState([]);

    const [edit, setEdit] = useState(false);
    const [i, setI] = useState();
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(false);

    const [buttonState, setButtonState] = useState("add");

    const [wordError, setWordError] = useState("")
    const [pinyinError, setPinyinError] = useState("")
    const [engError, setEngError] = useState("")
    const [charPinError, setCharPinError] = useState("")


    const generateInputs = (e) => {
        let tempErrors = {};
        let isValid = true;

        if (word.length <= 0) {
            tempErrors["word"] = true;
            isValid = false;
            setWordError("* input too short!")
            setErrors({...tempErrors});
            //console.log("errors", errors);
            //console.log("isValid", isValid)
        }
        else if (!/^[\u4E00-\u9FCC]+$/i.test(word)) {
            tempErrors["word"] = true;
            isValid = false;
            setWordError("* invalid word")
            setErrors({...tempErrors});
            console.log("invalid word")
        } 
        else {
            tempErrors = {};
            isValid = true;
            setWordError("");
            setErrors({});
            setGenerateState(false);
            setInfoFields(true); 
            setWordLength(word.length)
            setGenerateWord(false)

            /*for (let ind = 0; ind < word.length; ind++) {
                let para = document.createElement("p");
                para.innerText = word[ind];
                document.getElementById("pinyinFields").appendChild(para);
            }*/

                let wordL = word.length

                for (let inds = 0; inds < wordL; inds++) {
                    //arr.push({
                    //    hanChar: word[inds],
                    //    charPin: inds
                    //});
                    charArray.push({
                        hanChar: word[inds],
                        charPin: "",
                    });
                }
                
                setPinArr(true)
                console.log("CHAR ARRAY", charArray)
        }

    }

    const handleChangeWord = (e) => {
        setWord(e.target.value);
    }

    const handleChangePinyin = (e) => {
        setPinyin(e.target.value);
        //console.log(e.target.value)

        for (const key in chars) {
            if (!chars.hasOwnProperty(key)) {
                continue;
            }
            let newString = e.target.value.replace(key, chars[key])
            //console.log(newString);
            e.target.value = newString;
            setPinyin(e.target.value);
        }
    }

    const handleChangeEngTrans = (e) => {
        setEngTrans(e.target.value);
    }

    const handleClick = (i, e) => {
        e.preventDefault();
        const isValid = handleValidation();

        if (isValid) {
            
        if (!edit) {
            setCharsArr([...charsArrs, charArray])
            console.log("charArray", charArray)
            setInputWords([...inputWords, {word: word, pinyin: pinyin, engTrans: engTrans}]);
            setPinArr(false)
        }
        else {
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
        setEdit(false)
        setButtonState("add")
        setInfoFields(false);
        setGenerateState(true);
        setPinArr(false);
        setGenerateWord(true)
    }
    else {
        console.log("not valid")
    }
    }

    const handleValidation = () => {
        let tempErrors = {};
        let isValid = true;

        if (word.length <= 0) {
            tempErrors["word"] = true;
            isValid = false;
            setWordError("* input too short!")
        }
        if (!/^[\u4E00-\u9FCC]+$/i.test(word)) {
            tempErrors["word"] = true;
            isValid = false;
            setWordError("* invalid word")
            console.log("invalid word")
        }    
        if (pinyin.length <= 0) {
            tempErrors["pinyin"] = true;
            isValid = false;
            setPinyinError("* pinyin too short!")
        }
        if (engTrans.length <= 0) {
            tempErrors["engTrans"] = true;
            isValid = false;
            setEngError("* eng trans too short!")
        }
        const val = validateCharPin();
        if (!val)
        {
            console.log("VALIDATECHARPIN NOT VALID")
            tempErrors["charPin"] = true;
            isValid = false;
            setCharPinError("* missing pinyin field(s)")
        }
    
        setErrors({...tempErrors});
        console.log("errors", errors);
        console.log("isValid", isValid)
        return isValid;
    }

    const removeInput = (index, e) => {
        e.stopPropagation();

        console.log("CURRENT INDEX TO REMOVE:", index)

        let stIn = 0;
        while (stIn < inputWords.length) {
            if (inputWords[stIn].word == word)
            {
                console.log("ON CURRENT INDEX WORD")
                console.log("stIn", stIn);
                setI(stIn)
                break;
            }
            stIn++;
        }
        

        let data = [...inputWords];
        data.splice(index,1)
        setInputWords(data);
        console.log("data", data)
        if (index == 0) {
            console.log("index == 0")
        }


        let newCharArr = [...charsArrs];
        newCharArr.splice(index,1);
        setCharsArr(newCharArr)

        if(edit) {
            console.log("edit is on")
        }
        else {
            console.log("edit is off")
        }
        
        if(inputWords.length == 0) {
            console.log("length is 0")
        }
        else {
            console.log("length is not 0", length)
            console.log(inputWords)
        }

        if(index == i) {
            console.log("index == i")
            console.log("index", index)
            console.log("i", i)
        }
        else {
            console.log("index != i")
            console.log("index", index)
            console.log("i", i)
        }


        if (edit && inputWords.length <= 0 || edit && index == stIn) {
            setWord("");
            setPinyin("");
            setEngTrans("");
            setEdit(false)
            setInfoFields(false)
            if (inputWords.length <= 0) {
                setGenerateState(true)
                setButtonState("add")
                //setButtonState(false)
            }
            if (index == stIn) {
                //setGenerateState(true)
                setGenerateState(true)
                setButtonState("add")
                setCurrArr([]);
                setPinArr(false);
                setGenerateWord(true)
            }
        }
    }
    
    const changeInput = (index, e) => {
        setCurrArr(charsArrs[index]);
        console.log("CURRENT CHAR ARR", currentArr)
        
        setEdit(true)
        setButtonState("update")
        setGenerateState(false)
        setInfoFields(true)
        setPinArr(true)
        setGenerateWord(false)
        console.log("i:", i)
        let data = [...inputWords];        
        let value = data[index];
        let text = value.word;
        let pinyinIn = value.pinyin;
        let engIn = value.engTrans;
        console.log('index', index)
        console.log(text)
        console.log(pinyinIn);
        console.log(engIn)
        setWord(text);
        setPinyin(pinyinIn);
        setEngTrans(engIn);
    }

    const charPinOnChange = (e, ind) => {

        const newState = [...charArray];

        for (const key in chars) {
            if (!chars.hasOwnProperty(key)) {
                continue;
            }
            let newString = e.target.value.replace(key, chars[key])
            //console.log(newString);
            e.target.value = newString;
            newState[ind].charPin =  e.target.value;
        }

        setCharArray(newState);
    }


    const charArrOnChange = (e, ind) => {
        const newState = [...charsArrs];

        for (const key in chars) {
            if (!chars.hasOwnProperty(key)) {
                continue;
            }
            let newString = e.target.value.replace(key, chars[key])
            //console.log(newString);
            e.target.value = newString;
            charsArrs[i][ind].charPin =  e.target.value;
        }
        
        
        setCharsArr(newState);

        /*const {value, name} = e.target;
        const newState = [...charsArrs];
        console.log("charsArrs[i]", charsArrs[i])
        charsArrs[i][ind].charPin = value;
        setCharsArr(newState);*/
    }

    const validateCharPin = () => {
        let isValid = true;

        if (!edit) {
            charArray.forEach(function(item, index) {
            if (charArray[index].charPin == "") {
                isValid = false;
                console.log("TOO SHORT", index)
                return;
            }
        });
        }
        else if (edit) {
            currentArr.forEach(function(item, index) {
                if (currentArr[index].charPin == "") {
                    isValid = false;
                    console.log("TOO SHORT", index)
                    return;
                }
    
            });
        }
        return isValid;
    }

    const resetFields = (e) => {
        setPinyin("");
        setEngTrans("");
        setPinyin("");
        setWord("");
        setEdit(false)
        setCharArray([]);
        setGenerateState(true);
        setGenerateWord(true)
        setPinArr(false);
        setInfoFields(false);
        setButtonState("add")
        setWordError("");
        setEngError("");
        setPinyinError("");
        setCharPinError("");
        setErrors({});
    }


    console.log("CURRENT INPUT", inputWords);
    //console.log(inputWords.length)
    console.log("CHARACTERS ARRAY OF ARRAYS", charsArrs)
    console.log("CURRENT CHAR ARR", currentArr)

    



  return (
    <div className="flex flex-col justify-start items-start m-10 gap-y-6 sm:m-20">
        <div>
            <Image src="./box cat.svg" alt='cat in a box' width="0" height="0" priority={true} className="w-56 h-auto"></Image>
            <p className="text-3xl mt-6">chinese stroke order and character worksheet generator</p>
            <p className="text-4xl font-takeoffBold mt-2">田字格字帖生成器</p>
        </div>
        
        <p className="mt-4">simply add/delete characters or words and customize the worksheet as you&apos;d like</p>


        <div className="w-full sm:w-full lg:w-fit">
            <form className="space-y-20" action='/'>
                <div className="space-y-6">
                    <fieldset className="border-2 border-sesame rounded-md p-4 w-full">
                        <legend className="font-walsheimBold bg-sesame text-cozyWhite px-2">guide <span className="font-takeoffBold text-lg">领路</span></legend>
                            <div className="flex flex-col gap-y-2 md:flex md:flex-row md:gap-x-6">
                                <div className="space-x-2 flex flex-row">
                                    <input type="radio" id="contactChoice1" name="contact" value="none" />
                                    <label htmlFor="contactChoice1">none</label>
                                    <Image src="/plain-box.svg" alt="plain box" width={25} height={25} className="border-[1px] border-lightGrey"></Image>
                                </div>

                                <div className="space-x-2 flex flex-row">
                                    <input type="radio" id="contactChoice2" name="contact" value="cross" />
                                    <label htmlFor="contactChoice2">cross</label>
                                    <Image src="/cross-grid.svg" alt="cross box" width={25} height={25} className="border-[1px] border-lightGrey"></Image>
                                </div>  

                                <div className="space-x-2 flex fex-row">
                                    <input type="radio" id="contactChoice3" name="contact" value="star" />
                                    <label htmlFor="contactChoice3">star</label>
                                    <Image src="/star-grid.svg" alt="star box" width={25} height={25} className="border-[1px] border-lightGrey"></Image>
                                </div>

                                <div className="space-x-2 flex flex-row">
                                    <input type="radio" id="contactChoice3" name="contact" value="cross-star" />
                                    <label htmlFor="contactChoice3">cross + star</label>
                                    <Image src="/both-grid.svg" alt="both box" width={25} height={25} className="border-[1px] border-lightGrey"></Image>
                                </div>
                            </div>              
                        </fieldset>

                        <fieldset className="border-2 border-sesame rounded-md p-4 w-full">
                        <legend className="font-walsheimBold bg-sesame text-cozyWhite px-2">layout <span className="font-takeoffBold text-lg">布局</span></legend>
                            <div className="flex flex-col gap-y-2 md:flex md:flex-row md:gap-x-6">
                            <div className="space-x-2 flex flex-row">
                                <input type="radio" id="contactChoice1" name="contact" value="word-once" />
                                <label htmlFor="contactChoice1">word (once)</label>
                            </div>

                            <div className="space-x-2 flex flex-row">
                                <input type="radio" id="contactChoice2" name="contact" value="woord-full" />
                                <label htmlFor="contactChoice2">word (full line)</label>
                            </div>  

                            <div className="space-x-2 flex fex-row">
                                <input type="radio" id="contactChoice3" name="contact" value="word-extra" />
                                <label htmlFor="contactChoice3">word (full line + extra line)</label>
                            </div>

                            <div className="space-x-2 flex fex-row">
                                <input type="radio" id="contactChoice3" name="contact" value="word-fill" />
                                <label htmlFor="contactChoice3">word (fill)</label>
                            </div>

                            <div className="space-x-2 flex flex-row">
                                <input type="radio" id="contactChoice3" name="contact" value="stroke-once" />
                                <label htmlFor="contactChoice3">stroke order (once)</label>
                            </div>

                            <div className="space-x-2 flex flex-row">
                                <input type="radio" id="contactChoice3" name="contact" value="stroke-extra" />
                                <label htmlFor="contactChoice3">stroke order + extra line</label>
                            </div>


                            <div className="space-x-2 flex flex-row">
                                <input type="radio" id="contactChoice3" name="contact" value="stroke-fill" />
                                <label htmlFor="contactChoice3">stroke order (fill)</label>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="border-2 border-sesame rounded-md p-4 w-full">
                        <legend className="font-walsheimBold bg-sesame text-cozyWhite px-2">pinyin?</legend>
                        <div className="flex flex-row gap-x-2">
                            <input type="checkbox" id="contactChoice3" name="contact" value="pinyin" />
                            <label htmlFor="contactChoice3">include pinyin</label>
                        </div>
                    </fieldset>

                    <fieldset className="border-2 border-sesame rounded-md p-4 w-full">
                        <legend className="font-walsheimBold bg-sesame text-cozyWhite px-2">english translation?</legend>
                        <div className="flex flex-row gap-x-2">
                            <input type="checkbox" id="contactChoice3" name="contact" value="engTrans" />
                            <label htmlFor="contactChoice3">include eng translation</label>
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
                        <label htmlFor="pinyin" className="text-lg font-walsheimBold">characters <span className="font-takeoffBold text-lg">汉字</span></label>
                        <input type="text" autoComplete="off" onChange={handleChangeWord} value={word} id="inputWord" name="add" disabled ={!generateWord} className= "rounded-md border-2 border-stone-300 focus:outline-[#a66e6d] p-2 w-full disabled:border-stone-300 disabled:bg-slate-50 disabled:cursor-not-allowed"
                        onKeyDown ={(e) =>{ e.key === "Enter" && handleClick(i,e); }}    
                        />
                    </div>
                    {errors?.word && !edit && (<p className=" text-red-400">{wordError}</p>)}

                    <button type="button" onClick = {(e) => generateInputs(e)} className={generateState ? "text-lg bg-sesame hover:bg-[#a66e6d] text-cozyWhite rounded-md p-2 px-4 font-bold transition ease-in-out duration-500" : "hidden"}>generate pinyin + eng trans</button>

                    <div className = {generateState ? "hidden" : "block border-l-4 border-[#a66e6d] pl-4"}>
                        <h4 className="text-[#a66e6d] font-walsheimBold underline underline-offset-4">notes!</h4>
                        <p><span className="font-walsheimBold text-[#a66e6d]">*</span> to add accent marks, just type the corresponding tone number after the vowel. (ex: a1 = ā, e3 = ě)</p>
                        <p><span className="font-walsheimBold text-[#a66e6d]">*</span> ü = v0 | ǖ = v1 | ǘ = v2 | ǚ = v3 | ǜ = v4</p>
                    </div>

                    <div className={showPinArr && !edit ? "flex flex-col gap-x-2 flex-wrap gap-y-6 mt-4" : "hidden"}>
                                {charArray.map((x,charInd) => (
                                        <div key={charInd} className="flex flex-row gap-x-4">
                                            <div key={charInd} className="disabled bg-[#dbbeb9] rounded-md w-fit p-2 font-takeoffBold text-xl hover:cursor-not-allowed">
                                                {x.hanChar}
                                            </div>
                                            <input type="text" onChange={(e) => charPinOnChange(e, charInd)} autoComplete="off" defaultValue={x.charPin} placeholder="..." className="w-full bg-white p-2 focus:outline-[#a66e6d] rounded-md border-2 border-stone-300"/>
                                    </div>
                                ))}
                                {errors?.charPin && (<p className=" text-red-400">{charPinError}</p>)}
                        </div>

                        <div className={edit ? "flex flex-col gap-x-2 flex-wrap gap-y-6 mt-4" : "hidden"}>
                        {currentArr.map((x,charInd) => (
                                            <div key={charInd} className="flex flex-row gap-x-4">
                                                <div key={charInd} className="disabled bg-[#dbbeb9] rounded-md w-fit p-2 font-takeoffBold text-xl hover:cursor-not-allowed">
                                                    {x.hanChar}
                                                </div>
                                                <input type="text" onChange={(e) => charArrOnChange(e, charInd)} autoComplete="off" defaultValue={x.charPin} placeholder="..." className="w-full bg-white p-2 focus:outline-[#a66e6d] rounded-md border-2 border-stone-300"/>
                                        </div>
                                ))}
                                {errors?.charPin && (<p className=" text-red-400">{charPinError}</p>)}
                        </div>


                <div className={infoFields ? "block space-y-6" : "hidden"}>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="pinyin" className="text-lg font-walsheimBold">pinyin <span className="font-takeoffBold text-lg">拼音</span></label>
                        <input type="text" id="pinyin" name="pinyin" value={pinyin} autoComplete="off" onKeyDown ={(e) =>{ e.key === "Enter" && e.preventDefault(); }} onChange={handleChangePinyin} className="rounded-md border-2 border-stone-300 focus:outline-[#a66e6d] p-2 w-full"></input>
                    </div>
                    {errors?.pinyin && (<p className=" text-red-400">{pinyinError}</p>)}


                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="pinyin" className="text-lg font-walsheimBold">eng translation</label>
                        <input type="text" id="eng-trans" name="eng-trans" value={engTrans} autoComplete="off" onKeyDown ={(e) =>{ e.key === "Enter" && e.preventDefault(); }} onChange={handleChangeEngTrans} className="rounded-md border-2 border-stone-300 focus:outline-[#a66e6d] p-2 w-full"></input>
                    </div>
                    {errors?.engTrans && (<p className=" text-red-400">{engError}</p>)}

                    <button onClick = {(e) => resetFields(e)} type="button" className={ !edit ? "mr-4 text-xl  hover:text-[#a66e6d] text-sesame font-bold transition ease-in-out duration-500" : "hidden"}>reset</button>
                    <button onClick = {(e) => handleClick(i,e)} type="button" className="text-lg bg-sesame hover:bg-[#a66e6d] text-cozyWhite rounded-md p-2 px-4 font-bold transition ease-in-out duration-500">{buttonState}</button>
                </div>
            </div>

                <fieldset className="border-2 border-sesame rounded-md p-4 md:w-3/5 h-fit">
                        <legend className="font-walsheimBold bg-sesame text-cozyWhite px-2">input</legend>
                        <p>click on the &quot;X&quot; to delete a word or click on the word to make any edits</p>
                        <p className="text-red-400"><span className="font-walsheimBold underline underline-offset-4">warning!</span> editing a word will replace any current data in the input fields</p>
                        <div className="flex flex-row gap-x-2 flex-wrap gap-y-2 mt-4">
                                {inputWords.map((x,index) => (
                                    <div key={index} onClick={(e)=>{setI(index); changeInput(index,e)}}className=" bg-sesame text-cozyWhite w-fit p-2 px-4 rounded-md transition duration-500 ease-in-out hover:bg-[#a66e6d] hover:cursor-pointer">
                                        <button type="button" onClick={(e)=>removeInput(index,e)}><AiOutlineClose className="relative top-1 -left-1" size={20}/></button> {x.word}
                                    </div>
                                ))}
                        </div>
                    </fieldset>
            </div>

                
            </form>
        </div>

        
    </div>
  )
}
