import "@testing-library/react/dont-cleanup-after-each";

import {
  cleanup,
  configure,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import App from "../../App";

let { container } = {} as ReturnType<typeof render>;

test("lazy loaded", async () => {
  screen.getByText("Loading...");
  await screen.findByAltText('Search anything. example: cecil "male"');
});

test("fetches data", async () => {
  await loading();
  expect(rows()).toHaveLength(11);
});

test("modal", async () => {
  modalUp();
  const tableName = screen.getAllByRole("row")[1].childNodes[0].textContent;
  const modalName = screen.getByRole("heading", { name: "name" }).textContent;
  expect(tableName).toBe(modalName);
  modalDown();
});

test("section pagination", async () => {
  const fst = rows();
  changePage(2);
  const scd = rows();
  expect(fst).not.toEqual(scd);

  changePage(1);
  const fst_ = rows();
  expect(fst).toEqual(fst_);

  changePage(5);
  const lst = rows();
  expect(fst_).not.toEqual(lst);
});

test("page pagination", async () => {
  const fst = rows();
  changePage(6);
  await loading();
  const scd = rows();
  expect(fst).not.toEqual(scd);

  changePage(50);
  await loading();
  const lst = rows();
  expect(fst).not.toEqual(lst);
});

test("section pagination after page", async () => {
  const fst = rows();
  changePage(49);
  const scd = rows();
  expect(fst).not.toEqual(scd);

  changePage(50);
  const fst_ = rows();
  expect(fst).toEqual(fst_);
});

test.todo("filter");
test.todo("sort birth");
test.todo("sort name");

test("modal with unordered", async () => {
  modalUp();
  const tableName = screen.getAllByRole("row")[1].childNodes[0].textContent;
  const modalName = screen.getByRole("heading", { name: "name" }).textContent;
  expect(tableName).toBe(modalName);
  modalDown();
});

async function loading() {
  await waitFor(() =>
    expect(container.getElementsByClassName("ant-spin-dot")).toHaveLength(1)
  );
  await waitFor(() =>
    expect(container.getElementsByClassName("ant-spin-dot")).toHaveLength(0)
  );
}

function changePage(n: number) {
  const btn = screen.getByRole("listitem", { name: String(n) });
  fireEvent.click(btn);
}

function modalUp() {
  const btn = screen.getAllByRole("button", { name: "View" })[0];
  fireEvent.click(btn);
}

function modalDown() {
  const btn = screen.getAllByRole("button", { name: "Close" })[0];
  fireEvent.click(btn);
}

function rows() {
  return screen.getAllByRole("row").map((e) => e.textContent);
}

beforeAll(() => {
  container = render(<App />).container;

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

afterAll(() => {
  cleanup();
});
