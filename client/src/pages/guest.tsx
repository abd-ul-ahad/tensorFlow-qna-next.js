"use client";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import * as qna from "@tensorflow-models/qna";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import Loading from "@/components/Loading";
import { BiSolidSend } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import { FiSun } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

interface Answer {
  endIndex: number;
  score: number;
  startIndex: number;
  text: string;
}

export default function Home() {
  const router = useRouter();

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
      if (localStorage?.getItem("__token_") === null) {
        Load();
      } else {
        router?.push("/");
      }
    } catch {}
  }, []);

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {loading === true && <Loading />}

      <main
        className={`${inter.className} flex lg:flex-row flex-col justify-center items-start`}
      >
        <div className="w-full pb-8 px-5 md:px-10 lg:px-0">
          <div className="w-full space-y-3 flex justify-center items-center flex-col">
            <div className="w-full mb-5 flex justify-end items-center">
              <Link href="/auth/login">
                <button className="py-3 md:mr-10 px-5 text-white flex flex-col justify-center items-center space-y-1 mt-10 text-sm rounded-lg bg-[var(--bg-sec)] outline-[var(--button-bg)]">
                  <p>Login</p>
                </button>
              </Link>
            </div>
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
            <div>
              {passage === "" && question[0] === "" && (
                <button
                  onClick={() => {
                    setPassage(
                      "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook. Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet."
                    );
                    setQuestion(["Who is the CEO of Google?"]);
                  }}
                  className="py-3 px-5 text-white flex flex-col justify-center items-center space-y-1 mt-10 text-sm rounded-lg bg-[var(--bg-sec)] outline-[var(--button-bg)]"
                >
                  <FiSun />
                  <p>Example</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
