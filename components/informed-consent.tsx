'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export default function InformedConsent() {
    const router = useRouter()

    const onSubmitFunc = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('accepted terms')
      fetch('/api/terms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      router.push("/instructions")
    }
    function toggleButton() {
        let btn = document.getElementById('consent-button') as HTMLInputElement;
        btn.disabled = !btn.disabled;
    }

    return (
      <div id="consent-box" className="instructions-stim-container">
        <div className="row g-0">
          <div className="col d-flex justify-content-center">
            <h2 className="bolded-blue">ReproNLP Definitions Accuracy: Informed consent</h2>
          </div>
        </div>
        <div className="row g-0">
          <div className="col d-flex justify-content-center align-self-center">
            <form onSubmit={onSubmitFunc}>
              <div className="form-group required form-check">
                <input required type="checkbox" className="form-check-input" name="acceptTerms" id="acceptTerms" onChange={toggleButton} />
                <label htmlFor="acceptTerms" className="form-check-label">
                    <span style={{color: 'red'}}>*</span> I have received and signed a consent form for this study and
                    I agree to take part in the project<br/>
                    &quot;ReproHum – Evaluation of computer-generated scientific definitions&quot;</label>
              </div>
              <div className="form-group">
		            <div className="col d-flex justify-content-center">
		              <button type="submit" disabled={true} id="consent-button" className="btn btn-outline-primary btn-lg">Continue to instructions</button>
		            </div>
		          </div>
	          </form>
          </div>
        </div>
      </div>
    );
}
