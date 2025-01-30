'use client';

import { FormEvent, MouseEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface TaskFormProps {
  uid: string,
  id: string;
  term: string;
  definition: string;
}

const TaskForm = (props: TaskFormProps) => {
  const router = useRouter();
  const [currentId, setCurrentId] = useState(parseInt(props.id));
  const [answers, setAnswers] = useState({});

  /*const questions = [
    {
      id: 1,
      term: props.term.term_text,
      instruction: 'Please select one of the options below.',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
    {
      id: 2,
      instruction: 'Please select one of the options below.',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        { value: 'option4', label: 'Option 4' },
      ],
    },
    // Add more questions here...
  ];*/

  let [currentQuestion, setCurrentQuestion] = useState({
    id: props.id,
    term: props.term,
    definition: props.definition,
    instruction: 'Please',
    likertInstruction: 'Please 2',
    q1text: 'Does this definition contain factually incorrect information?',
    options: [
        { id: 'yes-opt', value: 'Yes' },
        { id:  'no-opt', value:  'No' },
    ],
    likertLabel1: 'Not at all',
    likertLabel2: 'Very',
    likertOptions: [
        { id: 'likert1', value: 1 },
        { id: 'likert2', value: 2 },
        { id: 'likert3', value: 3 },
        { id: 'likert4', value: 4 },
    ],
    likertDisable: false
  }); // questions.find((q) => q.id === currentId);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //const target = event.target as AnswerForm;
    //const answer = target.answer.value;
    //const answer2 = target.answer2.value;
    const form = event.target as HTMLFormElement;
    const answer = form.querySelector('input[name="answer"]') as HTMLInputElement;
    const answer2 = form.querySelector('input[name="answer2"]') as HTMLInputElement;
    // console.log(`have ${answer2}`)
    fetch('/api/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({uid: props.uid, qid: currentId, data: {q1: answer.value, q2: answer2.value }}),
    });
    setAnswers((prevAnswers) => ({ ...prevAnswers, [currentId]: [answer, answer2] }));
    setCurrentId(currentId + 1);
    if(currentId == 11)
        // TODO: replace with final page, set cookie to mark as to not complete again
        router.push('/')
    else
        router.push(`/tasks/${currentId + 1}`);
  };
  const handleQ1Click = (event: MouseEvent) => {
    // event.preventDefault();
    const target = event.target as HTMLElement;
    if(target.id == 'no-opt')
      setCurrentQuestion({ ...currentQuestion, likertDisable: true });
    else
      setCurrentQuestion({ ...currentQuestion, likertDisable: false });
  };

  //console.log(currentQuestion)
  //console.log(props)
  const styles = {
    container: {
      border: '1px solid blue',
      padding: '10px',
      borderRadius: '10px',
    },
    text: {
      border: '2px solid lightblue',
      padding: '10px 20px 10px 10px',
      borderRadius: '5px',
    },
    horizontalLine: {
      width: 'calc(100% + 20px)',
      height: '2px',
      backgroundColor: 'lightblue',
      margin: '10px 0px 10px -10px',
    },
  };
  return (
    <div id="task-box" className="instructions-stim-container">
      <div className="row">
          <div className="col d-flex justify-content-left">
            <h6>You are currently on section {props.id} / 300</h6><br/>
            <div className="mt-4 p-2"></div> <br/>
          </div>
      </div>
    <div className="row container d-flex">
    <form onSubmit={handleSubmit}>
      {currentQuestion && (
        <div>
          <div className="col-9 mb-8" style={styles.text}>
	          <h5>Instructions</h5>
	          <div style={styles.horizontalLine} />
	          <p><strong>Please read the following text and answer the questions below.</strong></p>
	          <p>You will first be asked whether the definitions contain any factual inaccuracies (yes or no) and then, if yes, you will be asked to rate the severity of the inaccuracies on a scale from <strong>1 (lowest)</strong> to <strong>4 (highest)</strong>.</p>
	          <p>When you do not know whether a definition is factually inaccurate, please use an internet search to check.</p>
	        </div>
	        <div className="col-9 mb-8" style={styles.text}>
          <div className="p-2"><strong>Term:</strong>{currentQuestion.term}</div>
          <div className="p-2 mb-2"><strong>Definition:</strong>{currentQuestion.definition}</div>
          </div>
          <div>
          <p>Does this definition contain factually incorrect information?</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {currentQuestion.options.map((option) => (
              <div key={option.value} className="col-2 ml-2">
                <input required onClick={handleQ1Click}
                  type="radio"
                  id={option.id}
                  name="answer"
                  value={option.value}
                />
                <label className="col-1 ml-4" htmlFor={option.id}>{option.value}</label>
              </div>
            ))}
          </div>
          <br/>
            <div>
            <p>If the definition contains factually incorrect information, how extensive are these errors?</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
            {/*<label className="col-1" htmlFor='likert1'>1 (lowest)</label>*/}
            {currentQuestion.likertOptions.map((option) => (
              <div key={option.value} className="col-1 ml-2 mr-2">
                <input disabled={currentQuestion.likertDisable}
                  required={!currentQuestion.likertDisable}
                  type="radio"
                  id={option.id}
                  name="answer2"
                  value={option.value}
                />
                
                <label className="ml-2" htmlFor={option.id}>{option.value}</label>
              </div>
            ))}
            
          </div>
          <br/>
          <button type="submit" className="btn btn-outline-primary btn">Submit</button>
        </div>
      )}
    </form>
    </div>
    </div>
  );
};

export default TaskForm;
