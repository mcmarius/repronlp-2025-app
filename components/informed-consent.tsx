'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

//import { useForm } from 'react-hook-form';
//import { yupResolver } from '@hookform/resolvers/yup';
//import * as Yup from 'yup';

export default function InformedConsent() {
    const router = useRouter()
    // form validation rules 
    //const validationSchema = Yup.object().shape({
    //    acceptTerms: Yup.bool()
    //        .oneOf([true], 'You must give your consent to take part in this ReproNLP experiment')
    //});
    //const formOptions = { resolver: yupResolver(validationSchema) };
    // get functions to build form with useForm() hook
    //const { register, handleSubmit, reset, formState } = useForm(formOptions);
    //const { errors } = formState;

    const onSubmitFunc = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('accepted terms')
      
      router.push("/instructions")
    }
    function toggleButton() {
        let btn = document.getElementById('consent-button') as HTMLInputElement;
        //let input = btn?.disabled;
        btn.disabled = !btn.disabled;
        // console.log(btn)
        //if (input)
        //  document.getElementById('consent-button').disabled = "";
        //else
        //  document.getElementById('consent-button').disabled = "disabled";
    }

    return (
    <div id="consent-box" className="instructions-stim-container">
      <div className="row">
        <div className="col d-flex justify-content-center">
          <h2 className="bolded-blue">ReproNLP Definitions Accuracy: Informed consent</h2>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center align-self-center">
                <form onSubmit={onSubmitFunc}>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" name="acceptTerms" id="acceptTerms" onChange={toggleButton} />
                        <label htmlFor="acceptTerms" className="form-check-label">
                        I have received and signed a consent form for this study and
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
