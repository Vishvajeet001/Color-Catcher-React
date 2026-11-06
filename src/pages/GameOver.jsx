import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import PageContainer from "../components/common/PageContainer";

// Trophy section
function Trophy() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-accent/30 bg-accent/10 shadow-lg shadow-accent/10 sm:h-24 sm:w-24">
      <div className="absolute inset-2 rounded-full border border-accent/10" />

      <span className="text-4xl sm:text-5xl" role="img" aria-label="Trophy">
        🏆
      </span>
    </div>
  );
}

// Score display
function ScoreDisplay({ score }) {
  return (
    <div className="w-full rounded-2xl border border-glass-border bg-surface/70 px-5 py-6 sm:px-8 sm:py-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted sm:text-sm">
        Your Final Score
      </p>

      <div className="mt-2 flex items-baseline justify-center gap-2">
        <span className="font-heading text-6xl font-bold tracking-tight text-text-primary sm:text-7xl lg:text-8xl">
          {score}
        </span>

        <span className="text-sm font-medium text-text-muted">points</span>
      </div>

      <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-accent/70" />
    </div>
  );
}

// Best score indicator
function BestScore({ score }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2">
      <span aria-hidden="true">👑</span>

      <span className="text-sm font-medium text-amber-200">
        Best Score: {score}
      </span>
    </div>
  );
}

// Action buttons
function ResultActions({ onPlayAgain, onHome }) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={onPlayAgain}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-background transition duration-200 hover:scale-[1.02] hover:bg-violet-300 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <span aria-hidden="true">↻</span>
        Play Again
      </button>

      <button
        type="button"
        onClick={onHome}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-glass-border bg-surface px-6 py-3.5 font-semibold text-text-primary transition duration-200 hover:border-accent/50 hover:bg-surface-elevated active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <span aria-hidden="true">⌂</span>
        Back to Home
      </button>
    </div>
  );
}

function GameOver() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the score passed from the Game page
  const score = Math.max(0, Number(location.state?.score) || 0);

  // Load the previously saved best score
  const [bestScore, setBestScore] = useState(() => {
    const savedScore = Number(localStorage.getItem("colorCatcherBestScore"));

    return Number.isFinite(savedScore) ? savedScore : 0;
  });

  // Update and persist the best score when necessary
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("colorCatcherBestScore", String(score));
    }
  }, [score, bestScore]);

  const displayedBestScore = Math.max(score, bestScore);
  const isNewBest = score > 0 && score >= bestScore;

  function handlePlayAgain() {
    navigate("/game");
  }

  function handleHome() {
    navigate("/");
  }

  return (
    <PageContainer showNavbar={false}>
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden py-8 sm:py-12">
        {/* Decorative background glow */}
        <div className="pointer-events-none absolute -left-40 top-1/4 h-72 w-72 rounded-full bg-accent/10 blur-[120px] sm:h-96 sm:w-96" />

        <div className="pointer-events-none absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-accent-secondary/10 blur-[120px] sm:h-112.5 sm:w-112.5" />

        {/* Result card */}
        <section className="relative w-full max-w-135 overflow-hidden rounded-3xl border border-glass-border bg-surface/80 p-5 text-center shadow-2xl shadow-accent/5 backdrop-blur-xl sm:p-8 md:p-10 lg:p-12">
          {/* Top decorative accent */}
          <div className="absolute left-1/2 top-0 h-1 w-32 -translate-x-1/2 rounded-full bg-accent shadow-lg shadow-accent/40" />

          <div className="flex flex-col items-center">
            <Trophy />

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-accent sm:text-sm">
              Game Completed
            </p>

            <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              Time&apos;s Up!
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-muted sm:text-base">
              {score === 0
                ? "Every great player starts somewhere. Ready to give it another shot?"
                : "Nice work! Every round is a chance to sharpen your color-catching skills."}
            </p>

            <div className="mt-8 w-full">
              <ScoreDisplay score={score} />
            </div>

            <div className="mt-5">
              <BestScore score={displayedBestScore} />
            </div>

            {isNewBest && (
              <p className="mt-3 text-sm font-medium text-accent">
                ✨{" "}
                {score === bestScore && bestScore > 0
                  ? "You've set a new personal best!"
                  : "Personal best achieved!"}
              </p>
            )}

            <div className="mt-8 w-full">
              <ResultActions
                onPlayAgain={handlePlayAgain}
                onHome={handleHome}
              />
            </div>

            <p className="mt-7 text-xs text-text-muted">
              🎯 Thanks for playing Color Catcher
            </p>
          </div>
        </section>
      </main>
    </PageContainer>
  );
}

export default GameOver;
