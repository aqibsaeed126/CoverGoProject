import React, { useEffect } from 'react'
import { CURRENCY_MAPPER, RATE_MAPPER, PLAN_MAPPER } from '../utils/const';
import { isValid } from '../utils/helper'

type CurrencyKey = keyof typeof CURRENCY_MAPPER;
type RateKey = keyof typeof RATE_MAPPER;
type PlanKey = keyof typeof PLAN_MAPPER;

function InsuranceForm(props: any) {

  let {name, age, country, currency, plan, premium}: {name: string, age: number, country: string, currency: string, plan: string, premium: number } = props.values;

  useEffect(() => {
    calculateAndUpdatePremium();
  }, [props.values.age, props.values.country, props.values.plan]); 


  function calculateAndUpdatePremium() {
    if (isValid(age)) {
        let premiumValue = 10 * age;
        let rate = 1;
        let currencyValue = '';
        let planFactor = 1;

        if (isValid(country)) {
            currencyValue = CURRENCY_MAPPER[country as CurrencyKey];
            rate = RATE_MAPPER[currencyValue as RateKey];

            premiumValue = premiumValue * rate;

            if (isValid(plan)) {
                planFactor = PLAN_MAPPER[plan as PlanKey];
                premiumValue = premiumValue * planFactor;
            }
        }

        props.handlePremiumAndCurrency({
            premium: premiumValue,
            currency: currencyValue,
        });
    }
  }

  function isValidInfo() {
    return ( isValid(name) && isValid(age) && isValid(country) && isValid(plan))
  }

  function handleFieldChange(fieldName: string, e: any) {
    props.handleChange(fieldName, e.target.value);
  }

  function moveNext(): void {
    if(!isValidInfo()) {
        alert('Enter All Fields Before Proceed');
    } else {
        if (age <=100) props.nextStep();
        else props.nextStep(true);
    }
  }

  return (
    <>
        <h1>Tell us about yourself</h1>
        <div>
            <div>
                <label>Name</label>
                <input type='text' value={name} onChange={(e)=>handleFieldChange('name', e)}/>
            </div>
            
            <div>
                <label>Age</label>
                <input type='number' value={age} onChange={(e)=>handleFieldChange('age', e)}/>
            </div>
            
            <div>
                <label>Where do you live</label>
                <select name="countries" value={country} onChange={(e)=>handleFieldChange('country', e)}>
                    <option value="">Select Country</option>
                    <option value="hongkong">Hong Kong</option>
                    <option value="usa">USA</option>
                    <option value="australia">Australia</option>
                </select>
            </div>
            
            <div>
                <input checked={plan === 'standard'} type='radio' value='standard' name='plan' onChange={(e)=>handleFieldChange('plan', e)}/>
                <label>Standard</label><br></br>

                <input checked={plan === 'safe'} type='radio' value='safe' name='plan' onChange={(e)=>handleFieldChange('plan', e)}/>
                <label>Safe</label><br></br>

                <input checked={plan === 'supersafe'} type='radio' value='supersafe' name='plan' onChange={(e)=>handleFieldChange('plan', e)}/>
                <label>Super Safe</label><br></br>
            </div>
            
        </div>

        <div> Your premium is : {premium}{currency} </div>
        <div>
            <button onClick={props.previousStep}>Back</button>
            <button onClick={moveNext}>Next</button>
        </div>
            
        
    </>
    
  )
}

export default InsuranceForm;