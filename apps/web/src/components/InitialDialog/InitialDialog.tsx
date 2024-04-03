"use client";
import Link from "next/link";
import { Card } from "../ui";

const InitialDialog = () => {
  const cardsData = [{title:"Host Quiz", url:"/home"}, {title:"Join Quiz", url:"/quiz-contest/500"}];
  const cards = cardsData.map((data, idx) => {
    return (
      <Link key={idx} href={data.url} className="min-h-full min-w-full">
        <Card className=" min-h-full min-w-full shadow-xl border-gray-200 flex justify-center items-center hover:bg-gray-50">
          <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
            {data.title}
          </div>
        </Card>
      </Link>
    );
  });

  return (
    <Card className="grid grid-cols-2 gap-10 p-10 min-w-[50vw] min-h-[50vh] shadow-2xl border-gray-200 mt-5 font-display text-4xl font-extrabold leading-[1.15] text-black sm:text-6xl sm:leading-[1.15]">
      {cards}
    </Card>
  );
};

export default InitialDialog;
