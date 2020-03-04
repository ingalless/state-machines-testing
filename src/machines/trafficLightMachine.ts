import { Machine } from "xstate";

interface TrafficLightState {
  states: {
    green: {};
    yellow: {};
    red: {};
  };
}

type TrafficLightEvent = { type: "CROSSING_BUTTON_PUSHED" };
export const trafficLightMachine = Machine<
  any,
  TrafficLightState,
  TrafficLightEvent
>({
  id: "trafficLight",
  initial: "green",
  states: {
    green: {
      on: {
        CROSSING_BUTTON_PUSHED: "yellow"
      }
    },
    yellow: {
      after: {
        2000: {
          target: "red"
        }
      }
    },
    red: {
      after: {
        10000: "green"
      }
    }
  }
});
