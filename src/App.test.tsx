import React from "react";
import { render, fireEvent, cleanup, Queries } from "@testing-library/react";
import App from "./App";
import { createModel } from "@xstate/test";
import { trafficLightMachine } from "./machines/trafficLightMachine";

test("renders initial correctly", () => {
  const { getByText } = render(<App />);
  const trafficLightText = getByText(/I'm green/i);
  expect(trafficLightText).toBeInTheDocument();
});

describe("traffic light state tests", () => {
  const trafficLightModel = createModel<any>(trafficLightMachine).withEvents({
    CROSSING_BUTTON_PUSHED: {
      exec: ({ getByText }) => {
        fireEvent.click(getByText("I want to cross the road!"));
      },
    },
    'xstate.after(2000)#trafficLight.yellow': ({ getByText }) => {
      expect(getByText("I'm yellow")).toBeDefined()
    }
  });
  const testPlans = trafficLightModel.getSimplePathPlans();
  testPlans.forEach(plan => {
    describe(plan.description, () => {
      afterEach(cleanup);
      plan.paths.forEach(path => {
        it(path.description, async () => {
          const rendered = render(<App />);
          await path.test(rendered);
        });
      });
    });
  });
  it("coverage", () => {
    trafficLightModel.testCoverage();
  });
});
