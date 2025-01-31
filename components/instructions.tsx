'use client'

import Link from 'next/link'

export default function Instructions() {

    function onSubmitFunc() {
      console.log('accepted terms')
    }

    return (
    <div id="instr-box" className="instructions-stim-container" style={{width: '1000px', padding: '20px'}}>
      <div className="row">
        <div className="col d-flex justify-content-left">
          <h2 className="bolded">Instructions</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-20 text-wrap justify-content-left align-self-left">
        <p>You will be given 300 terms with their definitions and asked to rate the factual truth of the definitions.</p>
      
        <p>You will first be asked whether the definitions contain any factual inaccuracies (yes or no) and then, if yes, you will be asked to rate the severity of the inaccuracies on a scale from <strong>1 (lowest)</strong> to <strong>4 (highest)</strong></p>
        <p>When you do not know whether a definition is factually inaccurate, please use an internet search to check.</p>
        </div>
      </div>
      <div className="grid gap-0">
      Examples of definitions with no factual inaccuracies:
      <div className="p-4"><strong>Term:</strong> Acanthoma <br/>
      <strong>Definiton:</strong> Acanthoma is a skin lesion that develops from cells in the skin. <br/><br/>
      <strong>Term:</strong> Transformer <br/>
      <strong>Definiton:</strong> The Transformer is a deep learning model architecture relying entirely on an attention mechanism to draw global dependencies between input and output.
      </div>
      </div>
      <div className="grid gap-0">
      Examples of factually inaccurate definitions:
      <div className="p-4"><strong>Term:</strong> Acanthoma <br/>
      <strong>Definiton:</strong> Acanthoma is a type of <span className="text-danger"><strong><u>skin cancer</u></strong></span>. <br/>(inaccuracy marked in red; it is benign, not cancerous).<br/><br/>
      <strong>Term:</strong> Transformer <br/>
      <strong>Definiton:</strong> The Transformer is a <span className="text-danger"><strong><u>type of cheese</u></strong></span>. <br/>(inaccuracy marked in red).<br/>
      </div>
      </div>
      <strong>Please do not press the back button while taking this task.</strong>
      <br/>
      <br/>
      <div className="row">
        <div className="col justify-content-left align-self-left">
                <form onSubmit={onSubmitFunc}>
                    <div className="form-group form-check">
		      <div className="row">
			<div className="col d-flex justify-content-left">
			  <Link href="/tasks/1">
			    <button type="button" className="btn btn-outline-primary btn-lg">Continue to task</button>
			  </Link>
			</div>
		      </div>
		    </div>
	        </form>
        </div>
      </div>
    </div>
    );
}
