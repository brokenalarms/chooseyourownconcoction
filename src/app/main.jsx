'use client';
import Image from "next/image";
import React, {useEffect, useState} from "react";
import { useCsvData } from "./context/csvDataContext";
import { useRouter } from 'next/navigation';

export default function Main() {
    const router = useRouter();
    const { csvData } = useCsvData();

    useEffect(() => {
        if (!csvData?.length) {
            router.replace('/setup');
        }
    });

    if (!csvData?.length) {
        return null;        
    }

    const start = csvData.find(x => x.title == 'start') || csvData[0];
    const [currentChoice, setChoice] = useState(start);

    function handleClick(choice) {
        let newChoice = choice;
        let endNodeTitle = 'Start over';
        if (choice.title == endNodeTitle) {
            // last node tapped
            newChoice = welcome;
        } else if (!choice.choices?.length) {
            // construct final screen
            const question = `You ask the bartender for a delicious ${newChoice.title}. They give you a knowing smile and get to work.`
            const subquestion = 'You have chosen wisely.';
            newChoice = Object.assign({ question, subquestion, choices: [{ image: choice.image, title: endNodeTitle }] })
        }
        setChoice(newChoice)
    }
    const showSubquestion = currentChoice.subquestion
    return (
        <main className="min-h-screen flex flex-col items-center justify-between p-12">
            <div className="z-10 max-w-5xl items-center justify-between font-mono text-sm lg:flex mr-0 lg:mr-auto">
                <div className="p-6 text-xl flex flex-col justify-center  items-start border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  rounded-xl border bg-gray-200 lg:p-4 dark:bg-zinc-800/30">
                    <p>
                        {currentChoice.question}
                    </p>
                    {showSubquestion ? (
                        <div className="mt-5">{currentChoice.subquestion}</div>) : ""}
                </div>
            </div>
            <div className={`flex-grow place-items-center items-start content-center grid lg:max-w-5xl lg:w-full lg:mb-0 ${currentChoice.choices.length === 3 ?  'md:grid-cols-3' : 'md:grid-cols-1'} lg:text-left`}>
                {currentChoice.choices?.map((choice) => (
                    <div
                        key={choice.title ?? choice.question}
                        className="flex flex-col group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 hover:cursor-pointer"
                        onClick={handleClick.bind(this, choice)}
                    >
                        <Image
                            className="m-auto pb-4"
                            src={choice.image}
                            alt="Missing drink picture"
                            width={150}
                            height={150}
                            priority
                        />
                        <h2 className={`text-center mb-3 text-2xl font-semibold`}>
                            {choice.title}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                &nbsp;-&gt;
                            </span>
                        </h2>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                            {choice.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between w-full font-mono flex-col-reverse md:flex-row pt-6 md:pt-0">
                <div className="font-mono text-center pt-10 md:pt-0">
                    Presented by
                    <a href="http://www.calicraftconcoctions.com"
                        target="_blank">
                        <Image
                            className="m-auto"
                            src='/assets/calicraftconcoctions.png'
                            width={150}
                            height={150}
                            priority
                        />
                    </a>
                </div>
                <div className="flex-grow"></div>
                <button onClick={() => { setChoice(welcome) }} className="mt-auto font-mono text-sm flex">
                    <div className="p-6 text-xl flex flex-col justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto rounded-xl border bg-gray-200 lg:p-4 dark:bg-zinc-800/30">
                        <p>
                            Start over.
                        </p>
                    </div>
                </button>
            </div>
        </main>
    );
}
