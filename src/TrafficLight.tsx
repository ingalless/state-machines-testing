import React from 'react'
import { useMachine } from '@xstate/react'
import { trafficLightMachine } from './machines/trafficLightMachine'

export default function TrafficLight() {
    const [lightColour, send] = useMachine(trafficLightMachine)
    return (
        <div>
            <div style={{color: lightColour.value.toString()}}>I'm {lightColour.value}</div>
            <div>
                <button onClick={() => send('CROSSING_BUTTON_PUSHED')} disabled={!lightColour.matches('green')}>{lightColour.matches('green') ? 'I want to cross the road!' : 'The light is changing'}</button>
            </div>
        </div>
    )
}