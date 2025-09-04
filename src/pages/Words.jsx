import { useEffect, useState } from "react";
import { app } from "../services/firebase";
import { child, ref, get, getDatabase } from "firebase/database";

export const Words = () => {
  const [words, setWords] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    console.log("starting fetch...");
    try {
      const dbRef = ref(getDatabase(app));
      get(child(dbRef, "words")).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const array = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setWords(array);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }, []);
  const handleOnChange = (e) => setSearch(e.target.value);

  const filteringWords = words.filter((word) =>
    word.Word.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="h-full px-2 pt-2 flex flex-col overflow-hidden">
        <input
          onChange={handleOnChange}
          value={search}
          className="rounded-full p-2 border border-orange-400 shadow"
        />
        {words.length == 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="overflow-y-auto flex-1">
            <ul>
              {filteringWords.map((word) => (
                <li id={word.id} key={word.id} className="p-2 border-b">
                  <p className="text-xl font-semibold">{word.Word}</p>
                  <p className="text-base font-JP">{word.Meaning}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Words;
