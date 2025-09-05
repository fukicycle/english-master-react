import { useEffect, useState } from "react";

const WordCard = ({ word }) => {
  const [isMeaning, setIsMeaning] = useState(false);

  const blankExample = () => {
    if (!word) return "-";
    const length = word.Word.length;
    const blank = "_".repeat(length);
    return word.ExampleSentence.replace(word.Word, blank);
  };

  const flipCard = () => {
    if (!word) return;
    setIsMeaning(!isMeaning);
  };
  return (
    <>
      <div
        className="border-2 border-sky-400 rounded-md shadow-xl bg-gray-100 flex flex-col justify-center items-center w-full p-4 gap-4 h-72 overflow-auto"
        onClick={flipCard}
      >
        {isMeaning ? (
          <>
            <p className="font-extrabold text-3xl">{word.Word}</p>
            <p className="font-JP">{word.Meaning}</p>
            <span className="border-b w-full border-sky-400"></span>
            <p>{word.ExampleSentence}</p>
            <p className="font-JP">{word.ExampleTranslation}</p>
          </>
        ) : (
          <>
            <p className="font-extrabold text-3xl">{word.Word}</p>
            <p>{word.PartOfSpeech}</p>
            <span className="border-b w-full border-sky-400"></span>
            <p>{blankExample()}</p>
          </>
        )}
      </div>
    </>
  );
};
export default WordCard;
