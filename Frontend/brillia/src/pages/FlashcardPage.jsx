import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "./FlashcardPage.css";

const dummyCards = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: 'Who wrote "Romeo and Juliet"?', answer: "William Shakespeare" },
  { question: "What is the chemical symbol for water?", answer: "H₂O" },
  { question: "Solve: 5 + 7", answer: "12" },
  { question: "What planet is known as the Red Planet?", answer: "Mars" },
];

function FlashcardPage() {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setCurrent((prev) => (prev + 1) % dummyCards.length);
    setFlipped(false);
  };

  const prevCard = () => {
    setCurrent((prev) => (prev - 1 + dummyCards.length) % dummyCards.length);
    setFlipped(false);
  };

  return (
    <>
      <Header />
      <div className="flashcard-page">
        <h2>Flashcards</h2>
        <div className="flashcard-container">
          <div
            className={`flashcard ${flipped ? "flipped" : ""}`}
            onClick={() => setFlipped(!flipped)}
          >
            <div className="front">{dummyCards[current].question}</div>
            <div className="back">{dummyCards[current].answer}</div>
          </div>
        </div>
        <div className="controls">
          <button onClick={prevCard}>Previous</button>
          <button onClick={nextCard}>Next</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FlashcardPage;
