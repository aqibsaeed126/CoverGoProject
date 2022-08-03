import React, { useState } from 'react';
import Welcome from './welcome';
import InsuranceForm from './insurance-form';
import Summary from './summary';
import AgeError from './age-error';
import {InsuranceState} from '../utils/modal'

const INITIAL_STATE: InsuranceState = {
    step: 1,
    isError: false,
    name: '',
    age: 0,
    country: '',
    currency: '',
    plan: '',
    premium: 0
}

function InsuranceSignup() {
  const [insuranceState, setInsuranceState] = useState<InsuranceState>(INITIAL_STATE);

  const { step } = insuranceState;
  const {name, age, country, currency, plan, premium} = insuranceState;
  const values: InsuranceState = {name, age, country, currency, plan, premium};

  let previousStep = () => {
    let step: number = insuranceState.step || 0;
    if (step === 4) step = 3;
    setInsuranceState({
        ...insuranceState, 
        step: step - 1
    });
  }

  let nextStep = (isError: boolean = false) => {
    let step: number = insuranceState.step || 0;
    if (step === 3) step = 0;
    if (typeof isError === 'boolean' && isError) step = 3;
    setInsuranceState({
        ...insuranceState, 
        step: step + 1
    });
  }

  let handlePremiumAndCurrency = (data: any) => {
    setInsuranceState({
        ...insuranceState, 
        ...data
    });
  }

  let handleFieldChange = (field: string, value: any) => {
    setInsuranceState({
        ...insuranceState, 
        [field]: value
    });
  }

  switch (step) {
    case 1: 
      return (
        <Welcome 
            nextStep={nextStep}
            handleChange={handleFieldChange}
            values={values}
        />
      )
    case 2: 
      return (
        <InsuranceForm 
            nextStep={nextStep}
            previousStep={previousStep}
            handleChange={handleFieldChange}
            handlePremiumAndCurrency={handlePremiumAndCurrency}
            values={values}
        />
      )
    case 3:
      return (
        <Summary 
            previousStep={previousStep}
            nextStep={nextStep}
            handleChange={handleFieldChange}
            values={values}
        />
      )
    case 4: 
      return (
      <AgeError 
          previousStep={previousStep}
      />
      )
    default: 
       return (
        <Welcome />
       )
  }
}

export default InsuranceSignup;