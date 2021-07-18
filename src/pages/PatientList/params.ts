import type { SortOrder } from "antd/lib/table/interface";
import { defineRoute, param, ValueSerializer } from "type-route";

export type SortField = "name" | "dob";

const sortOrder: ValueSerializer<SortOrder> = {
  parse: (raw) => raw as SortOrder,
  stringify: (value) => value || "",
};

const sortField: ValueSerializer<SortField> = {
  parse: (raw) => raw as SortField,
  stringify: (value) => value,
};

export default defineRoute(
  {
    page: param.query.optional.number.default(1),
    section: param.query.optional.number.default(1),
    nameFilter: param.query.optional.string.default(""),
    sortField: param.query.optional.ofType(sortField),
    sortOrder: param.query.optional.ofType(sortOrder),
    current: param.query.optional.string,
  },
  () => "/"
);
