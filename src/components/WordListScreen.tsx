import React, { useState } from "react";
import { WORD_POOL } from "../data/words";

const WORDS_PER_PAGE = 50;

export default function WordListScreen({ onBack }: { onBack: () => void }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(WORD_POOL.length / WORDS_PER_PAGE);
  const wordsToShow = WORD_POOL.slice(page * WORDS_PER_PAGE, (page + 1) * WORDS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Word List</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
          {wordsToShow.map((word, idx) => (
            <li key={word + idx} className="text-lg font-mono text-gray-700 bg-blue-100 rounded-lg px-3 py-2 text-center tracking-widest">
              {word.toUpperCase()}
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 bg-blue-200 text-blue-700 rounded-lg font-bold disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-blue-700 font-mono">Page {page + 1} of {totalPages}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages - 1}
            className="px-4 py-2 bg-blue-200 text-blue-700 rounded-lg font-bold disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <button
          onClick={onBack}
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl"
        >
          Back
        </button>
      </div>
    </div>
  );
}
