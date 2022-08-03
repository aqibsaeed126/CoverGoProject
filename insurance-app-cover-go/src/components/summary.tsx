import React from 'react'

function Summary(props: any) {
 let {name, age, country, currency, plan, premium } = props.values;

  return (
    <>
        <div>
            <h1>Summary</h1>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Where do you live: {country}</p>
            <p>Package: {plan}</p>
            <p>Premium: {premium}{currency}</p>
            <button onClick={props.previousStep}>Back</button>
            <button onClick={props.nextStep}>Buy</button>
        </div>
    </>
  )
}

export default Summary;