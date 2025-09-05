import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { app } from "../services/firebase";
import { LiaArrowRightSolid, LiaCheckSolid, LiaTimesSolid } from "react-icons/lia";
import WordCard from "../components/WordCard";

export const Study = () => {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isMeaning, setIsMeaning] = useState(false);

  useEffect(() => {
    try {
      const dbRef = ref(getDatabase(app));
      get(child(dbRef, "words")).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const array = Object.entries(data)
            .map(([key, value]) => ({
              id: key,
              ...value,
            }))
            .sort((word) => word.id);
          setWords(array);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }, []);
  const goNextWord = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= words.length) {
      return;
    }
    setIsMeaning(false);
    setWord(words[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  return (
    <>
      <div className="h-full flex justify-around items-center p-4 flex-col">
        {word ? (
          <>
            <p>
              {currentIndex + 1}/{words.length}
            </p>
            <WordCard key={word.id} word={word} isMeaning={isMeaning} />
          </>
        ) : (
          <>
            <p></p>
            <button className="btn-primary" onClick={goNextWord}>
              Let's study English!
            </button>
          </>
        )}
        <div>
          {word ? (
            <div className="flex gap-8 justify-center">
              {isMeaning ? (
                <>
                  <button
                    onClick={goNextWord}
                    className="btn-icon bg-green-500 text-white"
                  >
                    <LiaCheckSolid className="size-8" />
                  </button>
                  <button
                    onClick={goNextWord}
                    className="btn-icon bg-red-500 text-white"
                  >
                    <LiaTimesSolid className="size-8" />
                  </button>
                </>
              ) : (
                <button
                  className="btn-icon bg-orange-400 text-white"
                  onClick={() => setIsMeaning(true)}
                >
                  <LiaArrowRightSolid className="size-8" />
                </button>
              )}
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </>
  );
};

export default Study;
