"use client";
import QuestionDialog from "@/components/QuestionDialog/QuestionDialog";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import { addQuestion, addQuizze, addUser } from "@/actions";
import { redirect } from "next/dist/server/api-utils";
import {
  Label,
  RadioGroup,
  RadioGroupItem,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
} from "@/components/ui";
export interface questionType {
  question: string;
  type: "1" | "2";
  options: string[];
}

const questionsFormSchema = z.object({
  question: z
    .string()
    .min(1, {
      message: "Question cannot be blank",
    })
    .max(350, {
      message: "Maximum 350 charachters are allowed",
    }),
});

export default function Home() {
  const [questions, setQuestions] = useState<questionType[]>([]);
  const session = useSession();
  const user_id = session.data?.user?.id;
  const questionComponentList = questions.map(
    ({ question, type, options }, idx) => {
      return (
        <Card key={idx} className="w-[80%] mb-5">
          <CardHeader>
            <CardTitle>{question}</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="comfortable">
              {options.map((option, idx) => {
                return (
                  <div key={idx} className="flex items-center space-x-2">
                    <RadioGroupItem value={`${idx + 1}`} id={`r_${idx}`} />
                    <Label htmlFor={`r_${idx}`}>{option}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>
      );
    }
  );

  const quizzTitleInputRef = useRef(null);

  useEffect(() => {
    if (!session) {
      redirect("/home");
    }
  }, []);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const quizzTitle = quizzTitleInputRef.current.value;
    try {
      const { insertedId: quizId } = await addQuizze({
        title: quizzTitle,
        description: "",
        host_id: user_id,
      });
      await addQuestion(questions, quizId);
    } catch (error) {
      console.error("Error adding quiz:", error);
    }
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center w-full">
      <div>
        Enter quiz name
        <div className="flex flex-col items-start">
          <Label htmlFor="question" className="text-right">
            Question
          </Label>
          <Input
            id="question"
            ref={quizzTitleInputRef}
            placeholder="Enter question"
            className="mt-2"
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        {questions.length === 0 ? "No questions found" : questionComponentList}
      </div>
      <div className="my-5">
        <QuestionDialog setQuestions={setQuestions} />
      </div>
      <Button onClick={handleOnSubmit}>Save Quiz</Button>
    </div>
  );
}
