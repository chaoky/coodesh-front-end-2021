import { useEffect, useState } from "react";

export function useFetchUser(
  page = 1
): [Readonly<UserPages>, Readonly<boolean>] {
  const [users, setUsers] = useState({} as UserPages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!users[page]) {
      setLoading(true);
      const fiber = makeCancelable(
        fetch(`https://randomuser.me/api?results=50&seed=uwu&page=${page}`, {
          cache: "force-cache",
        })
      );

      fiber.promise
        .then((e) => e.json())
        .then((e: RandomUser) => {
          e.results.forEach((e) => (e.searchString = genSearchString(e)));
          setUsers({ ...users, [page]: e.results });
          setLoading(false);
        })
        .catch(({ isCanceled }) => console.log("isCanceled", isCanceled));

      return () => {
        fiber.cancel();
      };
    }
  }, [page]);

  return [users, loading];
}

function makeCancelable<T>(promise: Promise<T>) {
  let hasCanceled_ = false;

  const wrappedPromise: Promise<T> = new Promise((resolve, reject) => {
    promise.then(
      (val) => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
      (error) => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
}

//TODO better date strings
function genSearchString(user: User) {
  const { searchString, login, picture, ...notIgnored } = user; //eslint-disable-line @typescript-eslint/no-unused-vars
  const test = Object.values(notIgnored)
    .flatMap((e) => (typeof e === "object" ? Object.values(e || {}) : e))
    .flatMap((e) => (typeof e === "object" ? Object.values(e || {}) : e));
  return '"' + test.join('"') + '"';
}

export function nameFmt(name: Name) {
  return name.title + " " + name.first + " " + name.last;
}
export function birthFmt(dob: Dob) {
  return new Date(dob.date).toLocaleDateString();
}

interface UserPages {
  [page: number]: User[];
}

interface RandomUser {
  results: User[];
  info: Info;
}

interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface User {
  picture: Picture;
  name: Name;
  email: string;
  gender: string;
  dob: Dob;
  cell: string;
  phone: string;
  nat: string;
  location: Location;
  login: Login;
  id: Id;
  registered: Dob;
  searchString: string;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface Id {
  name?: string;
  value?: string;
}

export interface Dob {
  date: string;
  age: number;
}

interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: Coordinates;
  timezone: Timezone;
}

interface Timezone {
  offset: string;
  description: string;
}

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface Street {
  number: number;
  name: string;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}
