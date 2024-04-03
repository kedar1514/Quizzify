"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { options, questions, quizzes} from "./db/schema/quiz";
import { questionType } from "./app/create-quiz/page";
import { users } from "./db/schema/auth";

// export async function getProductsByCategoryId(categoryId: number) {
//   const data = await db.query.products.findMany({
//     where: eq(products.category_id, categoryId),
//     with: {
//       productFilters: true,
//     },
//   });

//   return data as Product[];
// }

// export async function getFilterByCategoryId(categoryId: number) {
//   const data = await db.query.filters.findMany({
//     where: eq(categories.id, categoryId),
//     with: {
//       filterValues: true,
//     },
//   });

//   return data;
// }

export interface QuizzeType {
  title: string;
  description: string;
  host_id: string;
}

export async function addQuizze(quizze: QuizzeType) {
  const insertedDataIds = await db.insert(quizzes).values(quizze).returning({ insertedId: quizzes.id });
  return insertedDataIds[0];
}

export interface QuestionType {
  quiz_id: number;
  question_text: string,
  question_type: string,
}

export async function addQuestion(
  questionArray: questionType[],
  quizId: number
) {
  try {
    for (const question of questionArray) {
      const questionIds = await db.insert(questions).values({
        quiz_id: quizId,
        question_text: question.question,
        question_type: question.type,
      }).returning({questionId:questions.id});

      for (const option of question.options) {
        await db.insert(options).values({
          question_id: questionIds[0].questionId,
          option_text: option,
          is_correct: true,
        });
      }
    }
    await db.insert(questions).values(questionArray);
  } catch (error) {
    console.log(error);
  }
}

export interface UserType {
  name: string;
  email: string;
  image: string;
}

export async function addUser(user: UserType) {
  await db.insert(users).values(user);
}

export async function getQuizzes(userId: string) {
  return await db.query.quizzes.findMany({
    where: eq(quizzes.host_id, userId)
  })
}