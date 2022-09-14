import React, { useEffect } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import App from './App';
import * as api from './api'
import MockedForm from './components/Form'

const mockData = {
  spendings:[
    {
        "amount": 1000,
        "currency": "USD",
        "description": "asd",
        "id": 3,
        "spent_at": "2022-09-14T17:52:48.627560"
    },
    {
        "amount": 120,
        "currency": "HUF",
        "description": "Banana",
        "id": 2,
        "spent_at": "2022-09-14T17:52:33.605215"
    },
    {
        "amount": 1200,
        "currency": "USD",
        "description": "Mango",
        "id": 1,
        "spent_at": "2022-09-14T17:52:33.598997"
    }
  ]
}


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', () => {
  render(<App />, container);
});

it('fetches spendings', async () => {
  jest.spyOn(api, "getSpendings").mockImplementation(() =>
    Promise.resolve({
      status:200,
      spendings: mockData
    })
  );
  await act(async () => {
    render(<App />, container)
  });
  expect(api.getSpendings.mock.calls.length).toBe(1);
  expect(container.querySelector("header").textContent).toBe('Spendings');
  container.querySelector("form")

  api.getSpendings.mockRestore()
});



jest.mock("./components/Form", () => {
  return function MockedForm({onSubmit}) {
    function send(){
      onSubmit({
          description:'dummy',
          amount:42,
          currency:'PHP'
        }, a=>a)
    }
    return (
      <div className="__form"><button onClick={send}>CLICKME</button></div>
    );
  };
});

it('handles post spending', async () => {
  jest.spyOn(api, "getSpendings").mockImplementation(() =>
    Promise.resolve({
      status:200,
      spendings: mockData
    })
  );
  jest.spyOn(api, "postSpending").mockImplementation(() =>
    Promise.resolve({ status:200 })
  );
  await act(async () => {
    render(<App />, container)
    container.querySelector(".__form button").click()
  });

  expect(container.querySelector(".__form").textContent).toBe('CLICKME');
  expect(api.postSpending.mock.calls.length).toBe(1);

  api.getSpendings.mockRestore()
  api.postSpending.mockRestore()
});

