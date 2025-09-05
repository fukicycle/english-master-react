import { child, get, getDatabase, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { app, auth } from "../services/firebase";
import {
  LiaArrowRightSolid,
  LiaCheckSolid,
  LiaTimesSolid,
} from "react-icons/lia";
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

  const handleWordResult = async (isCorrect) => {
    const userId = auth.currentUser.uid;
    const db = getDatabase(app);
    const wordHistoryRef = ref(
      db,
      `emr-users/${userId}/wordHistories/${word.id}`
    );

    try {
      const snapshot = await get(wordHistoryRef);
      const existsData = snapshot.val() || {
        correctCount: 0,
        incorrectCount: 0,
        difficulty: "new",
      };

      const updateData = {
        correctCount: isCorrect
          ? existsData.correctCount + 1
          : existsData.correctCount,
        incorrectCount: isCorrect
          ? existsData.incorrectCount
          : existsData.incorrectCount + 1,
        lastReviewed: new Date().toISOString(),
        difficulty: calculateDifficulty(existsData, isCorrect),
      };

      await update(wordHistoryRef, updateData);
    } catch (e) {
      console.error(e);
    }
  };

  const calculateDifficulty = (data, isCorrect) => {
    const newCorrectCount = isCorrect
      ? data.correctCount + 1
      : data.correctCount;
    const newIncorrectCount = isCorrect
      ? data.incorrectCount
      : data.incorrectCount + 1;
    const difficulty = ["easy", "normal", "hard"];
    //正答率が80％以上 -> easy
    //正答率が30%以下 -> hard
    //それ以外 -> normal
    const correctAnswerRatio =
      newCorrectCount / (newCorrectCount + newIncorrectCount - 1);
    if (correctAnswerRatio >= 0.8) return difficulty[0];
    if (correctAnswerRatio <= 0.3) return difficulty[2];
    return difficulty[1];
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
                    onClick={() => {
                      handleWordResult(true);
                      goNextWord();
                    }}
                    className="btn-icon bg-green-500 text-white"
                  >
                    <LiaCheckSolid className="size-8" />
                  </button>
                  <button
                    onClick={() => {
                      handleWordResult(false);
                      goNextWord();
                    }}
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
