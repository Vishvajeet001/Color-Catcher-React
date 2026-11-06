import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PageContainer from "../components/common/PageContainer";

const COLORS = [
  "#FF647C",
  "#FF9B55",
  "#4BBEFF",
  "#A78BFA",
  "#45D6A0",
  "#FFBE55",
  "#38C9E8",
  "#F47BC1",
  "#477EFF",
];

// Generate a new round with exactly one matching tile
function createRound() {
  const targetColor = COLORS[Math.floor(Math.random() * COLORS.length)];

  const shuffledColors = [...COLORS];

  // Fisher-Yates shuffle
  for (let i = shuffledColors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledColors[i], shuffledColors[j]] = [
      shuffledColors[j],
      shuffledColors[i],
    ];
  }

  return {
    targetColor,
    colors: shuffledColors,
  };
}

// Game header containing timer and score
function GameHeader({ timeLeft, score }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-glass-border/60 px-5 py-5 sm:px-7">
      <h1 className="font-heading text-xl font-bold sm:text-2xl">
        🎯 Color Catcher
      </h1>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="rounded-full border border-glass-border bg-surface px-4 py-2">
          <span className="text-accent">◷</span>

          <span className="ml-2 font-heading font-bold tabular-nums">
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-2 font-heading font-bold">
          <span className="text-xl text-amber-400">★</span>
          <span>{score}</span>
        </div>
      </div>
    </header>
  );
}

// Target color display
function TargetColor({ color }) {
  return (
    <div className="flex min-h-65 flex-col items-center justify-center gap-5 rounded-2xl border border-glass-border bg-surface/80 p-6 sm:min-h-80">
      <h2 className="font-heading text-lg font-semibold">Target Color</h2>

      <div
        className="h-28 w-28 rounded-full shadow-lg sm:h-32 sm:w-32"
        style={{ backgroundColor: color }}
      />

      <p className="font-medium text-text-primary">Find this color!</p>
    </div>
  );
}

// Individual color tile
function ColorTile({ color, index, onClick, disabled }) {
  return (
    <button
      type="button"
      aria-label={`Color tile ${index + 1}`}
      onClick={onClick}
      disabled={disabled}
      className="aspect-square w-full rounded-xl border border-white/10 transition duration-200 hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed sm:rounded-2xl"
      style={{ backgroundColor: color }}
    />
  );
}

// 3x3 color grid
function ColorGrid({ colors, onTileClick, disabled }) {
  return (
    <div className="rounded-2xl bg-surface/60 p-3 sm:p-5">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {colors.map((color, index) => (
          <ColorTile
            key={color}
            color={color}
            index={index}
            disabled={disabled}
            onClick={() => onTileClick(color)}
          />
        ))}
      </div>
    </div>
  );
}

// Main Game component
function Game() {
  const navigate = useNavigate();

  const [round, setRound] = useState(createRound);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  // Countdown timer
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(timerId);
          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    // Cleanup timer when component unmounts
    return () => clearInterval(timerId);
  }, []);

  // Navigate to results when time runs out
  useEffect(() => {
    if (timeLeft === 0) {
      navigate("/results", {
        replace: true,
        state: { score },
      });
    }
  }, [timeLeft, score, navigate]);

  // Handle tile clicks
  function handleTileClick(selectedColor) {
    if (timeLeft === 0) return;

    // Incorrect selection: keep the same round
    if (selectedColor !== round.targetColor) {
      return;
    }

    // Correct selection: award a point and generate a new round
    setScore((previousScore) => previousScore + 1);
    setRound(createRound());
  }

  return (
    <PageContainer showNavbar={false}>
      <main className="flex min-h-screen items-center justify-center py-6 sm:py-10">
        <div className="w-full max-w-275 overflow-hidden rounded-3xl border border-glass-border bg-surface/30 shadow-2xl shadow-accent/5">
          <GameHeader timeLeft={timeLeft} score={score} />

          <section className="grid grid-cols-1 gap-5 p-4 sm:gap-6 sm:p-6 md:grid-cols-[0.85fr_1.15fr] md:items-stretch md:p-7">
            <TargetColor color={round.targetColor} />

            <ColorGrid
              colors={round.colors}
              onTileClick={handleTileClick}
              disabled={timeLeft === 0}
            />
          </section>

          <footer className="px-4 pb-5 text-center sm:pb-6">
            <p className="text-sm text-text-muted">
              💡 Pick the matching color to score a point
            </p>
          </footer>
        </div>
      </main>
    </PageContainer>
  );
}

export default Game;
