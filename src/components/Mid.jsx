import React, { useState } from "react";
import quizQuestions from "../questions";
import "./Mid.css";

function Mid(){
    let randomQuestionNumber = Math.floor(Math.random() * quizQuestions.length);
    let currentQuestion = quizQuestions[randomQuestionNumber].question;
    //Randomize possible answers each time.
    let resultAnswersArray = [];
    let answersArray = [
        quizQuestions[randomQuestionNumber].choices[0],
        quizQuestions[randomQuestionNumber].choices[1],
        quizQuestions[randomQuestionNumber].choices[2],
        quizQuestions[randomQuestionNumber].choices[3]
    ];
    for(var i = answersArray.length - 1; i >= 0 ; i--){
        let max = answersArray.length;
        let rand = Math.floor(Math.random() * max);
        resultAnswersArray.push(answersArray[rand]);
        answersArray.splice(rand, 1);
    }
    // console.log(randomQuestionNumber);
    // Go to the next question..
    const [counter, setCounter] = useState(0);
    let checkAnswer = (event) => {
        let currentId = event.currentTarget.id;
        let currentValue = document.getElementById(currentId).value;
        let currentAnswer = document.getElementById(currentId);
        if(currentValue === quizQuestions[randomQuestionNumber].answer){
            currentAnswer.classList.remove("btn");
            currentAnswer.classList.add("correctAnswer")
            setTimeout(() => {
                currentAnswer.classList.remove("correctAnswer");
                currentAnswer.classList.add("btn")
                setCounter(counter + 1);
                if(counter + 1 === 20){
                    alert("You've answered all the questions correctly! Well Done!");
                    setCounter(0);
                }
            }, 1000)
            // setCounter(counter + 1);
            console.log(counter + 1);
        }else if(currentValue !== quizQuestions[randomQuestionNumber].answer && counter === 0){
            currentAnswer.classList.remove("btn");
            currentAnswer.classList.add("wrongAnswer");
            setTimeout(() => {
                currentAnswer.classList.remove("wrongAnswer");
                currentAnswer.classList.add("btn");
                alert("WRONG ANSWER! Your score was " + Math.floor(counter) + " out of 20");
                setCounter(0.001);
                console.log(counter);
            }, 1000)
        }else{
            currentAnswer.classList.remove("btn");
            currentAnswer.classList.add("wrongAnswer");
            setTimeout(() => {
                currentAnswer.classList.remove("wrongAnswer");
                currentAnswer.classList.add("btn");
                alert("WRONG ANSWER! Your score was " + Math.floor(counter) + " out of 20");
                setCounter(0);
                console.log(counter);
            }, 1000)
        }
        console.log(randomQuestionNumber);
    };
    return (
        <div className="container">
            <div className="questionBox" id="questionBox">
                <h2>{currentQuestion}</h2>
                <input className="btn" type="button" id="answer1" value={resultAnswersArray[0]} onClick={checkAnswer} />
                <input className="btn" type="button" id="answer2" value={resultAnswersArray[1]} onClick={checkAnswer} />
                <input className="btn" type="button" id="answer3" value={resultAnswersArray[2]} onClick={checkAnswer} />
                <input className="btn" type="button" id="answer4" value={resultAnswersArray[3]} onClick={checkAnswer} />
                <div className="scores">
                    <div className="currentScore">
                        <h2>Current score: {Math.floor(counter)}</h2>
                    </div>
                    <div className="scoresLeft">
                        <h2>{20 - Math.floor(counter)} more to go</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mid;