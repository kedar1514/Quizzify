"use client";
import { Plus } from "lucide-react";
import Link from "next/link";

const AddQuizCard = () => {
  return (
    <Link href="/create-quiz">
      <div className="flex justify-center items-center border-dotted border-2 h-full border-gray-400 rounded-md hover:cursor-pointer active:bg-gray-300">
        <Plus />
      </div>
    </Link>
  );
};

export default AddQuizCard;
