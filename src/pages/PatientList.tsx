import { Button, Input, Table, TableColumnsType, Typography } from "antd";
import React, { useMemo } from "react";

import PageLayout from "../Components/PageLayout";
import { birthFmt, nameFmt, useFetchUser, User } from "../hooks/RandomUserHook";
import { SortField, SortOrder, userList, UserListRoute } from "../hooks/router";
import PatientDetails from "./PatientDetails";

export default function PatientList(props: { route: UserListRoute }) {
  const { params } = props.route;
  //TODO maybe only update the nameFilter param when a search button is pressed?
  const { page, nameFilter, sortOrder, sortField, current } = params;
  const [patients, loading] = useFetchUser(page);
  const currPatient = useMemo(
    () => patients.find((e) => e.email == current),
    [current, loading]
  );

  const columns: TableColumnsType<User> = [
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
            onClick={() => userList({ ...params, current: e.email }).replace()}
          >
            View
          </Button>
        );
      },
      fixed: "right",
    },
  ];

  return (
    <PageLayout>
      <Typography.Title level={5}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui eros,
        ornare id massa id, vestibulum varius velit. Integer eget velit pretium,
        posuere nisi porta, pretium dui. Pellentesque dapibus ipsum mollis
        finibus auctor. In hac habitasse platea dictumst. Praesent non augue
        tempus, consectetur augue quis, fringilla eros.
      </Typography.Title>
      <Input
        placeholder='Search anything. example: cecil "male"'
        value={nameFilter}
        onChange={(e) =>
          userList({ ...params, nameFilter: e.target.value }).replace()
        }
        size="large"
      />
      <Table
        dataSource={patients}
        onChange={(p, _f, s) => {
          if (!(s instanceof Array)) {
            userList({
              ...params,
              page: p.current,
              sortOrder: s.order as SortOrder,
              sortField: s.field as SortField,
            }).replace();
          }
        }}
        columns={columns}
        loading={loading}
        pagination={{
          current: page,
          total: 200,
          showSizeChanger: false,
          responsive: true,
          position: ["bottomCenter"],
        }}
        rowKey={(e) => e.email}
        scroll={{ x: true }}
      />
      {currPatient && (
        <PatientDetails
          patient={currPatient}
          onClose={() => userList({ ...params, current: undefined }).replace()}
        />
      )}
    </PageLayout>
  );
}
