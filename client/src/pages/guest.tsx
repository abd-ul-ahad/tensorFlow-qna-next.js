"use client";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import * as qna from "@tensorflow-models/qna";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import Loading from "@/components/Loading";
import { BiSolidSend } from "react-icons/bi";
import { MdAdd } from "react-icons/md";

const inter = Inter({ subsets: ["latin"] });

interface Answer {
  endIndex: number;
  score: number;
  startIndex: number;
  text: string;
}

export default function Home() {
  const [model, setModel] = useState<qna.QuestionAndAnswer>();
  const [loading, setLoading] = useState<boolean>(true);
  const [question, setQuestion] = useState<string[]>([""]);
  const [passage, setPassage] = useState<string>("");
  const [answers, setAnswers] = useState<(Answer | null)[]>([]);
  const [nQuestions, setNQuestions] = useState<number[]>([0]);
  const [count, setCount] = useState<number>(1);

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newQuestions = [...question!];
    newQuestions[index] = e.target.value;
    setQuestion(newQuestions);
  };

  const handleAnswerSubmit = async (index: number) => {
    if (question[0] === "" || passage === "") {
      return;
    }
    setLoading(true);
    const currentQuestion = question![index];
    const newAnswers = [...answers];
    const data = await Predict(currentQuestion);

    let maxScore = -Infinity;
    let maxObj = null;

    data?.forEach((obj) => {
      if (obj.score > maxScore) {
        maxScore = obj.score;
        maxObj = obj;
      }
    });

    newAnswers[index] = maxObj;
    setAnswers(newAnswers);
    setLoading(false);
  };

  const Load = async () => {
    const mod = await qna.load();
    setModel(mod);
    setLoading(false);
  };

  const Predict = async (current: string) => {
    try {
      const ans = await model?.findAnswers(current, passage!);
      return ans;
    } catch {}
  };

  useEffect(() => {
    try {
      Load();
    } catch {}
  }, []);

  return (
    <div className="bg-[var(--bg-primary)] h-screen">
      {loading === true && <Loading />}

      <main
        className={`${inter.className} flex lg:flex-row flex-col justify-center items-start`}
      >
        <div className="w-full py-8 px-5 md:px-10 lg:px-0">
          <div className="w-full space-y-3 flex justify-center items-center flex-col">
            <textarea
              rows={8}
              placeholder="Passage"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
              }}
              value={passage}
              className="py-4 px-5 rounded-lg bg-[var(--bg-sec)] w-full lg:w-1/2 outline-none caret-white text-[var(--text-color)]"
              onChange={(e) => setPassage(e.target.value)}
            ></textarea>
            <div className="lg:w-1/2 w-full flex flex-col justify-center items-end space-y-3">
              <button
                className="py-3 px-5 rounded-lg bg-[var(--bg-sec)] outline-[var(--button-bg)]"
                onClick={() => {
                  setNQuestions((prevState) => [...prevState, count]);
                  setQuestion((prevState) => [...prevState!, ""]);
                  setAnswers((prevState) => [...prevState, null]);
                  setCount(count + 1);
                }}
              >
                <MdAdd color="rgb(176, 178, 194)" />
              </button>
              {nQuestions?.map((item, i) => {
                return (
                  <div
                    className="w-full flex justify-center items-center flex-col"
                    key={i}
                  >
                    <div className="w-full flex justify-center items-center">
                      <input
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
                        }}
                        type="text"
                        placeholder="Question"
                        className="py-2 px-5 rounded-l-lg bg-[var(--bg-sec)] w-full outline-none caret-white text-[var(--text-color)]"
                        value={question![i]}
                        onChange={(e) => handleQuestionChange(e, i)}
                      />
                      <button
                        className="py-3 px-5 rounded-r-lg bg-[var(--bg-sec)] outline-[var(--button-bg)]"
                        onClick={() => handleAnswerSubmit(i)}
                      >
                        <BiSolidSend color="rgb(176, 178, 194)" />
                      </button>
                    </div>
                    {answers[i] && (
                      <p className="text-white text-sm mt-2 w-full text-start">
                        {answers[i]?.text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
