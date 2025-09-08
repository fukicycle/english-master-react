import { get, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  LiaArrowRightSolid,
  LiaCheckSolid,
  LiaTimesSolid,
} from "react-icons/lia";
import WordCard from "../components/WordCard";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { getLevelWithRepeatNumber } from "../services/level";
import { updateProgressOnStudy } from "../services/progress";
import { DateTime } from "luxon";

export const Study = () => {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isMeaning, setIsMeaning] = useState(false);
  const { user, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const setLevelWithRepeatNumber = (repeat) => {
    const level = getLevelWithRepeatNumber(repeat);
    setTheme(level);
    localStorage.setItem("level", level);
  };

  useEffect(() => {
    if (!user) return;
    const getProgress = async () => {
      const indexRef = ref(db, `emr-users/${user.uid}/progress/currentIndex`);
      const snapshot = await get(indexRef);
      if (snapshot.val()) {
        setCurrentIndex(snapshot.val());
      } else {
        setCurrentIndex(0);
      }
      setWord(words[currentIndex]);
    };
    getProgress();
  }, [words]);

  useEffect(() => {
    const getWords = async () => {
      const wordRef = ref(db, "words");
      try {
        const snapshot = await get(wordRef);
        const existsData = snapshot.val();
        setWords(
          Object.entries(existsData)
            .map(([key, value]) => ({
              id: key,
              ...value,
            }))
            .sort((word) => word.id)
        );
      } catch (e) {
        console.error(e);
      }
    };
    getWords();
  }, []);
  const nextRound = async () => {
    try {
      const userId = user.uid;
      const progressRepeatRef = ref(db, `emr-users/${userId}/progress/repeat`);
      const snapshot = await get(progressRepeatRef);
      const repeat = snapshot.val() || 0;
      const newRepeat = repeat + 1;
      await update(progressRepeatRef, newRepeat);
      setLevelWithRepeatNumber(newRepeat);
    } catch (e) {
      console.error(e);
    }
  };

  const handleWordResult = async (isCorrect) => {
    if (!word) return;
    const userId = user.uid;
    let nextIndex = currentIndex + 1;
    if (nextIndex >= words.length) {
      nextRound();
      nextIndex = 0;
    }
    setIsMeaning(false);
    setWord(words[nextIndex]);
    setCurrentIndex(nextIndex);
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
        lastReviewed: DateTime.now().setZone("Asia/Tokyo"),
        difficulty: calculateDifficulty(existsData, isCorrect),
      };

      await update(wordHistoryRef, updateData);
    } catch (e) {
      console.error(e);
    }
    await updateProgressOnStudy(userId, nextIndex);
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
      newCorrectCount / (newCorrectCount + newIncorrectCount);
    if (correctAnswerRatio >= 0.8) return difficulty[0];
    if (correctAnswerRatio <= 0.3) return difficulty[2];
    return difficulty[1];
  };

  return (
    <>
      <div className="h-full flex justify-around items-center p-4 flex-col">
        {word ? (
          <p className="h-6">
            {currentIndex + 1}/{words.length}
          </p>
        ) : (
          <p className="h-6 w-24 animate-pulse bg-gray-200 rounded-full"></p>
        )}
        <WordCard key={word?.id} word={word} isMeaning={isMeaning} />
        <div>
          <div className="flex gap-12 justify-center">
            {isMeaning ? (
              <>
                <button
                  onClick={() => handleWordResult(true)}
                  className="btn-icon bg-green-500 text-white"
                >
                  <LiaCheckSolid className="size-12" />
                </button>
                <button
                  onClick={() => handleWordResult(false)}
                  className="btn-icon bg-red-500 text-white"
                >
                  <LiaTimesSolid className="size-12" />
                </button>
              </>
            ) : (
              <button
                className="btn-icon bg-[var(--color-accent)] text-white"
                onClick={() => setIsMeaning(true)}
              >
                <LiaArrowRightSolid className="size-12" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Study;
