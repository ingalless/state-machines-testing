import { Machine } from "xstate";
import { RenderResult } from "@testing-library/react";

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
      },
      meta: {
        test: ({ getByText }: RenderResult) => {
          expect(getByText("I'm green")).toBeDefined();
        }
      }
    },
    yellow: {
      after: {
        2000: {
          target: "red"
        }
      },
      meta: {
        test: ({ getByText }: RenderResult) => {
          expect(getByText("I'm yellow")).toBeDefined();
        }
      }
    },
    red: {
      after: {
        10000: {
          target: "green"
        }
      },
      meta: {
        test: ({ getByText }: RenderResult) => {
          expect(getByText("I'm red")).toBeDefined();
        }
      }
    }
  }
});
