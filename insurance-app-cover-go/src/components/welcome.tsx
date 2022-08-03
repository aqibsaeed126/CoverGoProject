import React from 'react'

export default function Welcome(props: any) {

    return (
        <>
            <div>
                <h1>Hello There!</h1>
                <p>Lets buy some insurance. Its is goind to take only a few steps</p>
                <button onClick={props.nextStep}>Start</button>
            </div>
        </>
    )
}
