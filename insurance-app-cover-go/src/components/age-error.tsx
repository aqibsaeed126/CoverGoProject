import React from 'react'

export default function AgeError(props: any) {

    return (
        <>
            <div>
                <h1>Ooops</h1>
                <p>Your age is over our accepted limit.</p>
                <p>We are sorry but we cannot insure you now.</p>
                <button onClick={props.previousStep}>Ok :(</button>
            </div>
        </>
    )
}
