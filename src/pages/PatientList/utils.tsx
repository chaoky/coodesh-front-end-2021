import { Button, TableColumnsType } from "antd";

import { birthFmt, nameFmt, User } from "../../hooks/RandomUserHook";
import { PatientListRoute, routes } from "../../hooks/router";

export function genColumns(
  params: PatientListRoute["params"]
): TableColumnsType<User> {
  const { nameFilter, sortOrder, sortField } = params;
  return [
    {
      filteredValue: [nameFilter],
      onFilter: (_, record) =>
        nameFilter
          .split(" ")
          .every((e) => record.searchString.match(new RegExp(e, "i"))),

      title: "Name",
      dataIndex: "name",
      render: nameFmt,
      sorter: {
        compare: (a, b) => nameFmt(b.name).localeCompare(nameFmt(a.name)),
      },
      sortOrder: sortField == "name" ? sortOrder : undefined,
    },
    {
      title: "Birth",
      dataIndex: "dob",
      render: function DisplayBirth(e) {
        return <div style={{ minWidth: 90 }}>{birthFmt(e)}</div>;
      },
      sorter: {
        compare: (a, b) => b.dob.age - a.dob.age,
      },
      sortOrder: sortField == "dob" ? sortOrder : undefined,
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Actions",
      render: function DisplayAction(_, e) {
        return (
          <Button
            onClick={() =>
              routes.patientList({ ...params, current: e.email }).replace()
            }
          >
            View
          </Button>
        );
      },
      fixed: "right",
    },
  ];
}

export function genDetails(patient: User) {
  const { cell, phone, email, gender, dob, nat, id, location, picture, name } =
    patient;
  const { street, city, state, postcode, country } = location;

  return {
    name,
    picture,
    tabs: [
      {
        name: "Bio",
        items: [
          { label: "Email", field: email },
          { label: "Gender", field: gender },
          {
            label: "Birth Date",
            field: `${birthFmt(dob)} (${dob.age} years)`,
          },
          {
            label: "Nationality",
            field: nat,
          },
          {
            label: "ID",
            field: id.value ? `${id.value} (${id.name})` : "No Data",
          },
        ],
      },
      {
        name: "Address",
        items: [
          { label: "Street", field: `${street.name} (${street.number})` },
          { label: "City", field: city },
          { label: "State", field: state },
          { label: "Postal Code", field: postcode },
          {
            label: "Country",
            field: country,
          },
        ],
      },
      {
        name: "Contact",
        items: [
          { label: "Mobile Phone", field: cell },
          { label: "Phone", field: phone },
        ],
      },
    ],
  };
}
