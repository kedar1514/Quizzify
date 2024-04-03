import {
  Button,
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Input,
  Label,
} from "../ui";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { questionType } from "@/app/create-quiz/page";

const QuestionDialog: React.FC<{
  setQuestions: React.Dispatch<React.SetStateAction<questionType[]>>;
}> = ({ setQuestions }) => {
  const [optionInputList, setOptionInputList] = useState([""]);
  const optionComponents = optionInputList.map((inputValues, idx) => {
    return (
      <Input
        key={idx}
        id={`option_${idx + 1}`}
        placeholder="Enter option"
        defaultValue={inputValues}
        className="mt-2"
      />
    );
  });

  const handleOnAddOptionClick = () => {
    setOptionInputList((prevState) => [...optionInputList, ""]);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let question: string;
    let type: string;
    const options: string[] = [];
    const elementsArray = Array.from(event.currentTarget.elements) as Element[];

    elementsArray.forEach((element: Element, idx: number) => {
      if (element.tagName === "INPUT" && element.id === "question") {
        question = (element as HTMLInputElement).value;
      } else if (element.tagName === "INPUT" && element.id.includes("")) {
        options.push((element as HTMLInputElement).value);
      } else if (element.tagName === "SELECT") {
        type = (element as HTMLInputElement).value;
      }
    });

    setQuestions((prev) => [{ question, options, type }, ...prev]);
    setOptionInputList([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add question</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new question</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleOnSubmit}>
          <div className="grid gap-4 py-4 items-center">
            <div className="flex flex-col items-start">
              <Label htmlFor="question" className="text-right">
                Question
              </Label>
              <Input
                id="question"
                placeholder="Enter question"
                className="mt-2"
              />
            </div>
            <div className="flex flex-col items-start">
              <Label htmlFor="username" className="text-right">
                Options
              </Label>
              {optionComponents}
            </div>
            <div className="flex items-center">
              <Button
                variant={"outline"}
                className=" w-full"
                onClick={handleOnAddOptionClick}
                type="button"
              >
                <Plus className="mr-2" /> Add Option
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Select defaultValue="1">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Question Type</SelectLabel>
                  <SelectItem value="1">Multi Choice</SelectItem>
                  <SelectItem value="2">Single Choice</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionDialog;
