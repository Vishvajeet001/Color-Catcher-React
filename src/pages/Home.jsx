import { useNavigate } from "react-router";
import PageContainer from "../components/common/PageContainer";
import Button from "../components/common/Button";
import { useState, useEffect } from "react";


function TargetIllustration() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-35 md:relative md:inset-auto md:opacity-100 md:py-12">
      {/* Violet glow */}
      <div className="absolute h-64 w-64 rounded-full bg-accent/30 blur-[90px] sm:h-80 sm:w-80 md:h-96 md:w-96" />

      {/* Target */}
      <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-white/10 bg-white/3 shadow-2xl sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-80 lg:w-80 2xl:h-112 2xl:w-md">
        <div className="flex h-[82%] w-[82%] items-center justify-center rounded-full bg-[#FF647C] shadow-[0_0_60px_rgba(255,100,124,0.2)]">
          <div className="flex h-[70%] w-[70%] items-center justify-center rounded-full bg-[#FFBE55]">
            <div className="flex h-[65%] w-[65%] items-center justify-center rounded-full bg-[#45D6A0]">
              <div className="h-[40%] w-[40%] rounded-full bg-[#4BBEFF]" />
            </div>
          </div>
        </div>

        <div className="absolute -right-5 top-8 h-7 w-7 rounded-full bg-accent shadow-lg shadow-accent/40" />
        <div className="absolute -left-6 bottom-12 h-5 w-5 rounded-full bg-[#FFBE55]" />
        <div className="absolute -right-2 -bottom-5 h-4 w-4 rounded-full bg-[#45D6A0]" />
      </div>
    </div>
  );
}


function Home() {
  const navigate = useNavigate();

  const [isRulesOpen, setIsRulesOpen] = useState(false);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsRulesOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <PageContainer onHowToPlay={() => setIsRulesOpen(true)}>
      <main className="relative flex min-h-[calc(100svh-100px)] flex-col items-center justify-center overflow-hidden md:pl-10 lg:pl-12">
        {/* Background glow */}
        <div className="pointer-events-none absolute -right-40 top-0 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />

        {/* Hero section */}

        <section className="relative isolate grid w-full flex-1 items-center gap-6 overflow-hidden py-12 sm:py-16 md:grid-cols-2 md:gap-10 md:py-10 lg:gap-16 xl:gap-24 2xl:gap-28">
          {/* Left content */}
          <div className="relative z-10 mx-auto w-full max-w-2xl text-center md:mx-0 md:text-left">
            <span className="mb-6 inline-block rounded-full border border-glass-border bg-surface/90 px-4 py-2 text-xs font-medium text-accent sm:text-sm m">
              A little game of color & speed
            </span>

            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
              See the color.
              <br />
              <span className="text-accent">Catch the color.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-text-muted sm:text-base sm:leading-8 md:mx-0 lg:max-w-lg lg:text-lg px-2 md:px-0">
              Test your focus and reflexes. Find the matching color, beat the
              clock, and see how high you can score.
            </p>

            <div className="mt-8 flex justify-center md:justify-start">
              <Button onClick={() => navigate("/game")}>Start Game →</Button>
            </div>

            <p className="mt-5 text-xs tracking-wide text-text-muted sm:text-sm">
              30 seconds <span className="mx-2">·</span>
              3×3 grid <span className="mx-2">·</span>
              Beat your score
            </p>
          </div>

          {/* Right illustration */}
          <div className="absolute inset-0 z-0 md:relative md:inset-auto">
            <TargetIllustration />
          </div>
        </section>
      </main>

      {isRulesOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          onClick={() => setIsRulesOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rules-title"
            className="relative w-full max-w-lg rounded-3xl border border-glass-border bg-surface p-7 shadow-2xl sm:p-9"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsRulesOpen(false)}
              aria-label="Close instructions"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-surface-elevated text-text-muted transition hover:text-white"
            >
              ✕
            </button>

            <span className="text-sm font-semibold text-accent">
              THE BASICS
            </span>

            <h2
              id="rules-title"
              className="mt-3 font-heading text-3xl font-bold"
            >
              How to Play
            </h2>

            <p className="mt-3 text-sm leading-6 text-text-muted">
              Ready to test your color recognition and reflexes?
            </p>

            <div className="mt-8 space-y-6">
              {[
                {
                  number: "01",
                  title: "Look at the target",
                  description: "A target color will appear above the grid.",
                },
                {
                  number: "02",
                  title: "Find the match",
                  description: "Choose the matching color from the 3×3 grid.",
                },
                {
                  number: "03",
                  title: "Score points",
                  description:
                    "Correct clicks earn 1 point. You have 30 seconds!",
                },
              ].map((step) => (
                <div key={step.number} className="flex gap-4">
                  <span className="font-heading text-lg font-bold text-accent">
                    {step.number}
                  </span>

                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsRulesOpen(false)}
              className="mt-9 w-full rounded-xl bg-accent py-3 font-semibold text-background transition hover:bg-violet-300"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </PageContainer>
  );
}

export default Home;
