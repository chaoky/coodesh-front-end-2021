import { configure, fireEvent, render, waitFor } from "@testing-library/react";

import App from "../../App";

test("initial render", async () => {
  const screen = render(<App />);
  screen.getByAltText('Search anything. example: cecil "male"');
  await loading(screen);
  expect(rows(screen)).toHaveLength(10);
});

test("pagination", async () => {
  const screen = render(<App />);
  await loading(screen);
  const fst = rows(screen).map((e) => e.textContent);
  nextPage(screen);
  await loading(screen);
  const scd = rows(screen).map((e) => e.textContent);
  expect(fst).not.toEqual(scd);
});

test("modal", async () => {
  const screen = render(<App />);
  await loading(screen);
  modalUp(screen);

  const tableName = rows(screen)[1].childNodes[0].textContent;
  const modalName = screen.getByRole("heading", { name: "name" }).textContent;

  expect(tableName).toBe(modalName);
});

test("modal and pagination", async () => {
  const screen = render(<App />);
  await loading(screen);
  nextPage(screen);
  await loading(screen);
  modalUp(screen);

  const tableName = rows(screen)[1].childNodes[0].textContent;
  const modalName = screen.getByRole("heading", { name: "name" }).textContent;
  expect(tableName).toBe(modalName);
});

test.todo("modal and filter");

async function loading(screen: ReturnType<typeof render>) {
  await waitFor(() =>
    expect(
      screen.container.getElementsByClassName("ant-spin-dot")
    ).toHaveLength(1)
  );
  await waitFor(() =>
    expect(
      screen.container.getElementsByClassName("ant-spin-dot")
    ).toHaveLength(0)
  );
}

function nextPage(screen: ReturnType<typeof render>) {
  const btn = screen.getByRole("listitem", { name: "2" });
  fireEvent.click(btn);
}

function modalUp(screen: ReturnType<typeof render>) {
  const btn = screen.getAllByRole("button", { name: "View" })[0];
  fireEvent.click(btn);
}

function rows(screen: ReturnType<typeof render>) {
  return screen.getAllByRole("row");
}

beforeAll(() => {
  ///from antd issue
  Object.defineProperty(window, "matchMedia", {
    value: () => {
      return {
        matches: false,
        addListener: () => null,
        removeListener: () => null,
      };
    },
  });

  ///1000 is too little
  configure({ asyncUtilTimeout: 5000 });
});
