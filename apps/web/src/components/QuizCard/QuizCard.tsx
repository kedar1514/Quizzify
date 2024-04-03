import Link from 'next/link'
import React from 'react'
import { Button } from '../ui'

const QuizCard = ({title, ...props}) => {
  return (
    <div
        {...props}
        className="flex justify-center items-center bg-slate-300 border-dotted border-2 border-gray-400 rounded-md hover:cursor-pointer active:bg-gray-400"
      >
        {title}
        <Link href={"/quiz-contest"}>
          <Button>
            Start Quiz
          </Button>
        </Link>
      </div>
  )
}

export default QuizCard