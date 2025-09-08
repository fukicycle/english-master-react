const WordCard = ({ word, isMeaning }) => {
  const blankExample = () => {
    if (!word) return "-";
    const length = word.Word.length;
    const blank = "_".repeat(length);
    return word.ExampleSentence.replace(word.Word, blank);
  };

  return (
    <>
      <div className="border-2 border-[var(--color-accent)] rounded-md shadow-xl bg-gray-100 flex flex-col justify-center items-center w-full p-4 gap-4 h-72 overflow-auto">
        {!word ? (
          <>
            <p className="animate-pulse h-12 bg-gray-200 rounded-full w-44"></p>
            <p className="animate-pulse h-6 bg-gray-200 rounded-full w-24"></p>
            <span className="border-b w-full border-[var(--color-accent)]"></span>
            <p className="animate-pulse h-6 bg-gray-200 rounded-full w-full"></p>
            <p className="animate-pulse h-6 bg-gray-200 rounded-full w-full"></p>
          </>
        ) : isMeaning ? (
          <>
            <p className="font-extrabold text-3xl">{word.Word}</p>
            <p className="font-JP">{word.Meaning}</p>
            <span className="border-b w-full border-[var(--color-accent)]"></span>
            <p>{word.ExampleSentence}</p>
            <p className="font-JP">{word.ExampleTranslation}</p>
          </>
        ) : (
          <>
            <p className="font-extrabold text-3xl">{word.Word}</p>
            <p>{word.PartOfSpeech}</p>
            <span className="border-b w-full border-[var(--color-accent)]"></span>
            <p>{blankExample()}</p>
          </>
        )}
      </div>
    </>
  );
};
export default WordCard;
