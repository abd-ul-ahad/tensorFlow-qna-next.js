"use client";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import * as qna from "@tensorflow-models/qna";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import Loading from "@/components/Loading";

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
  const [question, setQuestion] = useState<string>();
  const [passage, setPassage] = useState<string>();
  const [answers, setAnswers] = useState<Answer[]>();

  const Load = async () => {
    console.log("start");
    const mod = await qna.load();
    setModel(mod);
    console.log("end");
  };

  const Predict = async () => {
    const ans = await model?.findAnswers(question!, passage!);
    setAnswers(ans);
  };

  useEffect(() => {
    Load();
    setLoading(!loading);
  }, []);

  return <main className={`${inter.className}`}></main>;
}
