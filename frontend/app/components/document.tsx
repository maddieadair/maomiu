import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Path,
  G,
  Line,
  Rect,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Noto Sans SC",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYxNbPzS5HE.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaGzjCnYxNbPzS5HE.ttf",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 16,
    textAlign: "left",
    fontFamily: "Noto Sans SC",
    fontWeight: 700,
    color: "#000000",
    borderBottom: "1px solid #000000",
    width: "100%",
    paddingBottom: 6,
    // paddingVertical: 8,
    marginLeft: -1,
  },
  section: {
    flexDirection: "column",
    rowGap: 24,
    marginVertical: 32, // padding/margin
    marginHorizontal: 35.5,
    // padding: 28,
    // border: "1px solid red",
  },
//   svg: {
//     display: "flex",
//     flexDirection: "column",
//     rowGap: 20,
//     border: "1px solid #000000",
//   },
  indivSVG: {
    width: 50,
    height: 50,
    borderWidth: "1px",
    borderStyle: "solid",
    marginLeft: -1,
    zIndex: 50,
  },
  char: {
    display: "flex",
    flexDirection: "column",
    rowGap: 10,
    // marginTop: -1,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: -1,
  },
  box: {
    marginLeft: -1,
    display: "flex",
    flexDirection: "row",
  },
  info: {
    borderWidth: "1px",
    borderStyle: "solid",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    padding: 6,
    marginLeft: -1,
    width: 491,
    rowGap: 4,
  },
  infoText: {
    fontSize: 12,
    fontFamily: "Noto Sans SC",
    width: "80%",
    padding: 6,
  },
  charBox: {
    display: "flex",
    flexDirection: "column",
    borderWidth: "1px",
    borderStyle: "solid",
    width: 50,
    rowGap: 4,
  },
  pinyin: {
    fontSize: 11,
    fontFamily: "Noto Sans SC",
    textAlign: "center",
    paddingBottom: 6,
  },
  hanzi: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  wholeWordInfo: {
    fontSize: 12,
    fontFamily: "Noto Sans SC",
    paddingBottom: 6,
    marginLeft: -1,
  },
});


interface Character {
    info: CharacterWordInfo;
    strokes: CharacterStrokeInfo;
}

interface CharacterWordInfo {
    hanzi: string;
    pinyin: string;
    english: string;
}

interface CharacterStrokeInfo {
  strokes: Array<string>;
  medians: Array<Array<Array<number>>>;
  radStrokes: Array<number>;
}

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

const upUntil = (char: CharacterStrokeInfo, jIndex: number, layoutData: Layout) => {
  const items = char["strokes"]
    .slice(0, jIndex + 1)
    .map((item: string, index: number) =>
      index == jIndex ? (
        <Path
          d={item}
          fill={`${layoutData["strokeOrderColor"]}`}
          fillOpacity="1"
          key={index}
        />
      ) : (
        <Path
          d={item}
          fill={`${layoutData["strokeOrderColor"]}`}
          fillOpacity="0.5"
          key={index}
        />
      )
    );

  return items;
};

const spanningChar = (char: CharacterStrokeInfo, layoutData: Layout) => {
  return (
    <View style={[styles.row, { paddingLeft: 6 }]}>
      {char["strokes"].map((jChar: string, jIndex: number) => {
        return (
          <Svg width="19.5" height="19.5" key={jChar}>
            <G
              transform="translate(0, 17.138671875) scale(0.01904296875, -0.01904296875)"
            //   width="19.5"
            //   height="19.5"
            >
              {upUntil(char, jIndex, layoutData)}
            </G>
          </Svg>
        );
      })}
    </View>
  );
};

const wholeChar = (char: CharacterStrokeInfo, fillColor: string) => {
  const items = char["strokes"].map((item: string, index: number) => (
    <Path d={item} key={index} fill={`${fillColor}`} />
  ));
  return items;
};

const sessveegees = (char: Character, charInd: number, layoutData: Layout) => {
  let maxSize: number = 11;
  let traceableNum: number = layoutData["traceableCharacters"];

  const traceable: number[] = [...Array(traceableNum).keys()];
  const blank: number[] = [...Array(maxSize - traceableNum).keys()];

  let info: CharacterWordInfo = char.info;

  if (char.hasOwnProperty("strokes")) {
    let strokes: CharacterStrokeInfo = char.strokes;

    return (
      <View style={styles.hanzi}>
        <View style={styles.box}>
          <View
            style={[
              styles.charBox,
              { borderColor: `${layoutData["gridColor"]}` },
            ]}
          >
            <Svg width="50" height="50">
              <G transform="translate(5, 40.15625) scale(0.0390625, -0.0390625)">
                {wholeChar(strokes, layoutData["strokeColor"])}
              </G>
            </Svg>

            <Text
              style={[styles.pinyin, { color: `${layoutData["textColor"]}` }]}
            >
              {info["pinyin"]}
            </Text>
          </View>
          <View
            style={[styles.info, { borderColor: `${layoutData["gridColor"]}` }]}
          >
            <Text
              style={[styles.infoText, { color: `${layoutData["textColor"]}` }]}
            >
              {info["english"]}
            </Text>
            {spanningChar(strokes, layoutData)}
          </View>
        </View>

        <View style={styles.row}>
          {traceable.map((index) => (
            <Svg
              width="50"
              height="50"
              style={[
                styles.indivSVG,
                { borderColor: `${layoutData["gridColor"]}` },
              ]}
              key={index}
            >
              {layoutData["guideSelection"] === "star" ||
              layoutData["guideSelection"] === "both" ? (
                <Line
                  x1="2"
                  y1="2"
                  x2="48"
                  y2="48"
                  stroke={layoutData["gridColor"]}
                  strokeOpacity="0.3"
                  strokeDasharray="2"
                  strokeWidth="0.5"
                ></Line>
              ) : null}

              {layoutData["guideSelection"] === "star" ||
              layoutData["guideSelection"] === "both" ? (
                <Line
                  x1="48"
                  y1="2"
                  x2="2"
                  y2="48"
                  stroke={layoutData["gridColor"]}
                  strokeOpacity="0.3"
                  strokeDasharray="2"
                  strokeWidth="0.5"
                ></Line>
              ) : null}

              {layoutData["guideSelection"] === "cross" ||
              layoutData["guideSelection"] === "both" ? (
                <Line
                  x1="24"
                  y1="2"
                  x2="24"
                  y2="48"
                  stroke={layoutData["gridColor"]}
                  strokeOpacity="0.3"
                  strokeDasharray="2"
                  strokeWidth="0.5"
                ></Line>
              ) : null}

              {layoutData["guideSelection"] === "cross" ||
              layoutData["guideSelection"] === "both" ? (
                <Line
                  x1="2"
                  y1="24"
                  x2="48"
                  y2="24"
                  stroke={layoutData["gridColor"]}
                  strokeOpacity="0.3"
                  strokeDasharray="2"
                  strokeWidth="0.5"
                ></Line>
              ) : null}
              <G transform="translate(5, 40.15625) scale(0.0390625, -0.0390625)">
                {wholeChar(strokes, layoutData["traceableColor"])}
              </G>
            </Svg>
          ))}

          {blank.map((index) => (
            <Svg
              width="50"
              height="50"
              style={[
                styles.indivSVG,
                { borderColor: `${layoutData["gridColor"]}` },
              ]}
              key={index}
            >
              {layoutData["guideSelection"] === "star" ||
              layoutData["guideSelection"] === "both" ? (
                <Line
                  x1="2"
                  y1="2"
                  x2="48"
                  y2="48"
                  stroke={layoutData["gridColor"]}
                  strokeOpacity="0.3"
                  strokeDasharray="2"
                  strokeWidth="0.5"
                ></Line>
              ) : null}

              {layoutData["guideSelection"] === "star" ||
              layoutData["guideSelection"] === "both" ? (
                <Line
                  x1="48"
                  y1="2"
                  x2="2"
                  y2="48"
                  stroke={layoutData["gridColor"]}
                  strokeOpacity="0.3"
                  strokeDasharray="2"
                  strokeWidth="0.5"
                ></Line>
              ) : null}

              {layoutData["guideSelection"] === "cross" ||
              layoutData["guideSelection"] === "both" ? (
                <Line
                  x1="24"
                  y1="2"
                  x2="24"
                  y2="48"
                  stroke={layoutData["gridColor"]}
                  strokeOpacity="0.3"
                  strokeDasharray="2"
                  strokeWidth="0.5"
                ></Line>
              ) : null}

              {layoutData["guideSelection"] === "cross" ||
              layoutData["guideSelection"] === "both" ? (
                <Line
                  x1="2"
                  y1="24"
                  x2="48"
                  y2="24"
                  stroke={layoutData["gridColor"]}
                  strokeOpacity="0.3"
                  strokeDasharray="2"
                  strokeWidth="0.5"
                ></Line>
              ) : null}
            </Svg>
          ))}
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={[styles.wholeWordInfo, { paddingTop: charInd === 0 ? 0 : 10 }]}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {info.hanzi}
        </Text>
        <Text>{info.pinyin}</Text>
        <Text>{info.english}</Text>
      </View>
    );
  }
};

const Test = ({ data }) => {
  const wordInfo = data.wordInfo;
  const layoutData = data.layoutInfo;

  console.log("wordInfo", wordInfo);
  console.log("layoutData", layoutData);

  let hasTitle: boolean = layoutData.title.length > 0;

  let tempArr: Character[] = [];
  let obj = {} as Character;
  let arrays: Character[][] = [];

  let count: number = 0;

  let size: number = 6;

  if (hasTitle) {
    size = 5;
  } else {
    size = 6;
  }

  let wholeWordCount: number = 0;

  for (let i = 0; i < wordInfo.length; i++) {
    if (wordInfo[i].wordInfo.length > wordInfo[i].strokeInfo.length) {
      wholeWordCount++;
      if (count < size) {
        obj.info = wordInfo[i].wordInfo[0];
        tempArr.push(obj);
        count++;
        wordInfo[i].wordInfo.shift();
      } else {
        count = 0;
        arrays.push(tempArr);

        tempArr = [];
        obj.info = wordInfo[i].wordInfo[0];

        tempArr.push(obj);
        count++;
        wordInfo[i].wordInfo.shift();
      }
    }

    obj = {} as Character;

    for (let j = 0; j < wordInfo[i].wordInfo.length; j++) {
      if (count < size) {
        if (count === 5 && wholeWordCount === 0 && size === 6) {
          count = 0;
          arrays.push(tempArr);

          tempArr = [];
        }

        obj.info = wordInfo[i].wordInfo[j];
        obj.strokes = wordInfo[i].strokeInfo[j];

        tempArr.push(obj);
        count++;
      } else {
        count = 0;
        arrays.push(tempArr);

        tempArr = [];
        obj.info = wordInfo[i].wordInfo[j];
        obj.strokes = wordInfo[i].strokeInfo[j];

        tempArr.push(obj);
        count++;

        wholeWordCount = 0;
      }

      obj = {} as Character;
    }

    if (i === wordInfo.length - 1 && count <= size && count > 0) {
      arrays.push(tempArr);
    }
  }

  return (
    <>
      {arrays.map((item: Character[], index: number) => {
        return (
          <Page size="LETTER" style={styles.page} key={index} wrap>
            <View style={styles.section}>
              {hasTitle ? (
                <Text style={styles.header}>{layoutData.title}</Text>
              ) : null}
              <View key={index} style={styles.char}>
                {item.map((char: Character, charInd: number) => {
                  return (
                    <View key={charInd} style={styles.char} wrap={false}>
                      {sessveegees(char, charInd, layoutData)}
                    </View>
                  );
                })}
              </View>
            </View>
          </Page>
        );
      })}
    </>
  );
};

export default function MyDocument({ data }: {data: any}) {
  let parsedData: any = JSON.parse(JSON.stringify(data));
  console.log(parsedData)

  return (
    <Document>
      <Test data={parsedData} />
    </Document>
  );
}
