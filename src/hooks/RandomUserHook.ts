import { useEffect, useState } from "react";

export function useRandomUser(): [User[], () => void, boolean] {
  const [users, setUsers] = useState([] as User[]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const loadMore = () => setPage(page + 1);
  useEffect(() => {
    setLoading(true);
    fetch(`https://randomuser.me/api?results=10&seed=uwu&page=${page}`)
      .then((e) => e.json())
      .then((e: RandomUser) => {
        setLoading(false);
        setUsers(users.concat(e.results));
      });
  }, [page]);

  return [users, loadMore, loading];
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
