import { getQuizzes } from "@/actions";
import { auth } from "@/auth";
import AddQuizCard from "@/components/QuizCard/AddQuizCard";
import QuizCard from "@/components/QuizCard/QuizCard";

export default async function Home() {
  const session = await auth();
  const userQuizzes = await getQuizzes(session?.user?.id);
  const currentDiv = userQuizzes.map((quizz, idx) => {
    return <QuizCard title={quizz.id}  key={idx} />;
  });

  return (
    <div className="min-h-screen flex justify-center pt-10 bg-red-400">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-10 w-[80%] bg-blue-300">
        {currentDiv}
        <AddQuizCard />
      </div>
    </div>
  );
}
