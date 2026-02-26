import React, { useState } from "react";
import { WELCOME_QUESTIONS } from "../constants/welcomeQuestions";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const WelcomeQuestionsScreen = () => {
  // Destructure 'user' to get the ID for the backend payload
  const { user, checkAuth } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = WELCOME_QUESTIONS[currentStep];

  // Validation
  const isCurrentQuestionAnswered =
    answers[question.id] && answers[question.id].length > 0;

  const handleSelect = (option) => {
    const questionId = question.id;
    const currentAnswers = answers[questionId] || [];

    if (question.type === "single") {
      setAnswers({ ...answers, [questionId]: [option] });
    } else {
      if (currentAnswers.includes(option)) {
        setAnswers({
          ...answers,
          [questionId]: currentAnswers.filter((a) => a !== option),
        });
      } else {
        setAnswers({
          ...answers,
          [questionId]: [...currentAnswers, option],
        });
      }
    }
  };

  const nextStep = async () => {
    if (currentStep < WELCOME_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await submitAll();
    }
  };

  const submitAll = async () => {
    if (!user?.id) return alert("User session not found. Please log in again.");

    setIsSubmitting(true);
    try {
      /**
       * BACKEND ALIGNMENT:
       * Your relationshipController.js expects: { answers: { [userId]: answers } }
       * Your route is likely: /relationship/submit-answers
       */
      await API.post("/relationship/submit-answers", {
        answers: answers, // The controller wraps this in [userId] before saving to DB
      });

      // Refresh user state so TrafficController sees onboarded: true
      await checkAuth();

      // Navigate to dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Submission error:", err);
      alert(
        err.response?.data?.error || "Error saving answers. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-midnight-canvas flex items-center justify-center p-4 relative transition-colors duration-500">
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-110 transition-all"
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      {/* Ambient Background Glows */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-rose-500/10 blur-[120px] rounded-full animate-pulse"></div>

      <div className="w-full max-w-3xl bg-white/95 dark:bg-midnight-900 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-white/20 dark:border-white/10 relative overflow-hidden">
        {/* Progress Bar */}
        <div className="flex justify-center gap-2 mb-10">
          {WELCOME_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentStep
                  ? "w-12 bg-gradient-to-r from-rose-500 to-purple-600"
                  : i < currentStep
                    ? "w-2 bg-rose-400"
                    : "w-2 bg-gray-200 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>

        <div className="space-y-10 relative z-10">
          <div className="text-center space-y-3">
            <span className="text-rose-500 font-black tracking-[0.3em] uppercase text-[10px]">
              Question {currentStep + 1} of {WELCOME_QUESTIONS.length}
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {question.text}
            </h3>
            <p className="text-purple-600 dark:text-purple-300 font-medium text-lg italic">
              {question.sub}
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {question.options.map((option) => {
              const selected = answers[question.id]?.includes(option);

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  disabled={isSubmitting}
                  className={`p-6 rounded-3xl font-bold text-lg transition-all transform active:scale-95 border-2 text-left flex items-center justify-between ${
                    selected
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-xl scale-[1.02]"
                      : "bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-transparent hover:border-rose-500/30"
                  }`}
                >
                  {option}
                  {selected && <span className="text-xl">✨</span>}
                </button>
              );
            })}
          </div>

          {/* Navigation Button */}
          <div className="pt-4">
            <button
              disabled={!isCurrentQuestionAnswered || isSubmitting}
              onClick={nextStep}
              className={`group relative w-full overflow-hidden py-6 rounded-[2rem] font-black text-2xl transition-all active:scale-95 shadow-xl ${
                isCurrentQuestionAnswered && !isSubmitting
                  ? "bg-rose-500 text-white hover:bg-rose-600"
                  : "bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span className="relative z-10">
                {isSubmitting
                  ? "SYNCING REALMS..."
                  : currentStep === WELCOME_QUESTIONS.length - 1
                    ? "ENTER DASHBOARD ✨"
                    : "NEXT STEP →"}
              </span>

              {isCurrentQuestionAnswered && !isSubmitting && (
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeQuestionsScreen;
