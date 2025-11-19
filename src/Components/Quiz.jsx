import React, {useState, useRef} from 'react'
import "../App.css";  // Updated import path
import { data } from "../assets/data";
// ...existing code...

const Quiz = () => {

    let [index,setIndex] = useState(0);
    let [question,setQuestion] = useState(data[index]);
    let [lock,setLock] = useState(false)
    let [score,setScore] = useState(0)
    let [result, setResult] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1,Option2,Option3,Option4];


const checkAns = (e,ans) => {
    if (lock === false){
        if (question.ans === ans){
            e.target.classList.add("correct");
            setLock(true)
            setScore(prev => prev + 1);
        } else {
            e.target.classList.add("wrong");
            setLock(true);
            option_array[question.ans-1].current.classList.add("correct");
        }
    }
}
const next = () => {
    if (lock === true){
        if (index === data.length -1){
            setResult(true);
            return;
        }
        setIndex(index + 1);
        setQuestion(data[index + 1]);
        setLock(false);
        option_array.forEach((option)=>{
            option.current.classList.remove("wrong");
            option.current.classList.remove("correct");
        });
    }
}

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

  return (
    <div className='flex items-center h-screen bg-gradient-to-b from-white to-blue-600'>
       <div className="w-[640px] mx-auto bg-white text-black flex flex-col gap-2 rounded-[10px] px-[50px] py-[40px]">
        <h1 className='font-medium text-3xl'>QUIZ-APP</h1>
        <hr className='h-1 bg-amber-50' />

                {!result && (
                    <>
                        <h2 className='text-2xl font-medium'>{index+1}. {question.question}</h2>
                        <ul className='list-none p-0 m-0'>
                                <li ref={Option1} onClick={(e)=>{checkAns(e,1)}} className='flex items-center h-[60px] pl-[10px] border border-[#606060] rounded-[8px] mb-[10px] text-[20px] cursor-pointer'>{question.option1}</li>
                                <li ref={Option2} onClick={(e)=>{checkAns(e,2)}} className='flex items-center h-[60px] pl-[10px] border border-[#606060] rounded-[8px] mb-[10px] text-[20px] cursor-pointer'>{question.option2}</li>
                                <li ref={Option3} onClick={(e)=>{checkAns(e,3)}} className='flex items-center h-[60px] pl-[10px] border border-[#606060] rounded-[8px] mb-[10px] text-[20px] cursor-pointer'>{question.option3}</li>
                                <li ref={Option4} onClick={(e)=>{checkAns(e,4)}} className='flex items-center h-[60px] pl-[10px] border border-[#606060] rounded-[8px] mb-[10px] text-[20px] cursor-pointer'>{question.option4}</li>
                        </ul>
                        <button onClick={next} className='mx-auto w-[150px] h-[60px] bg-blue-500 hover:bg-blue-600 text-white text-[25px] font-medium rounded-[8px] cursor-pointer block transition duration-300'>Next</button>
                        <div className="index mx-auto">{index+1} of {data.length} questions</div>
                    </>
                )}
            </div>
        {result?<>
        <h2 className='text-2xl font-medium'>You Scored {score} out of {data.length}</h2>
        <button className='mx-auto w-[150px] h-[60px] bg-blue-500 hover:bg-blue-600 text-white text-[25px] font-medium rounded-[8px] cursor-pointer block transition duration-300' onClick={reset}>Reset</button>
        </>:<></>}
       
    </div>
  )
}

export default Quiz
