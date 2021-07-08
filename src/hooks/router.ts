import {
  createRouter,
  defineRoute,
  param,
  Route,
  ValueSerializer,
} from "type-route";

const sortOrder: ValueSerializer<SortOrder> = {
  parse(raw) {
    return raw as SortOrder;
  },
  stringify(value) {
    return value;
  },
};

const sortField: ValueSerializer<SortField> = {
  parse(raw) {
    return raw as SortField;
  },
  stringify(value) {
    return value;
  },
};

export const {
  RouteProvider,
  useRoute,
  routes: { userList },
} = createRouter({
  userList: defineRoute(
    {
      page: param.query.optional.number.default(1),
      nameFilter: param.query.optional.string.default(""),
      sortField: param.query.optional.ofType(sortField),
      sortOrder: param.query.optional.ofType(sortOrder),
      current: param.query.optional.string,
    },
    () => "/"
  ),
});

export type UserListRoute = Route<typeof userList>;

export type SortField = "name" | "dob";
export type SortOrder = "ascend" | "descend";
