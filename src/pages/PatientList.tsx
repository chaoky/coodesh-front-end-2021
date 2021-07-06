import {
  Avatar,
  Button,
  Descriptions,
  Modal,
  Table,
  TableColumnsType,
  Tabs,
  Typography,
  Input,
} from "antd";
import React, { useState } from "react";

import PageLayout from "../Components/PageLayout";
import { Dob, Name, User, useRandomUser } from "../hooks/RandomUserHook";

export default function PatientList() {
  const [patients, loadMore, loading] = useRandomUser();
  const [selectedPatient, setSelectedPatient] = useState(""); //email
  const [searchValue, setSearchValue] = useState("");

  const nameFmt = (name: Name) =>
    name.title + " " + name.first + " " + name.last;
  const birthFmt = (dob: Dob) => new Date(dob.date).toDateString();

  const TableFooter = () => (
    <div>
      <button onClick={() => loadMore}>load more!</button>
    </div>
  );

  const ViewModal = ({ patient }: { patient: User }) => {
    const { street, city, state, postcode, country } = patient.location;
    const { cell, phone, email, gender, dob, nat, id } = patient;

    return (
      <Modal
        visible={selectedPatient != ""}
        footer={false}
        title={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar size={150} src={patient.picture.large} />
            <Typography.Title>{nameFmt(patient.name)}</Typography.Title>
          </div>
        }
        onCancel={() => setSelectedPatient("")}
      >
        <Tabs type="card" defaultActiveKey="1" tabPosition="left">
          <Tabs.TabPane tab="Bio" key="1">
            <Descriptions column={1}>
              <Descriptions.Item label="Email">{email}</Descriptions.Item>
              <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
              <Descriptions.Item label="Birth Date">
                {new Date(dob.date).toDateString()} ({dob.age})
              </Descriptions.Item>
              <Descriptions.Item label="Nationality">{nat}</Descriptions.Item>
              <Descriptions.Item label="ID">
                {id.value ? `${id.value} (${id.name})` : "No Data"}
              </Descriptions.Item>
            </Descriptions>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Address" key="2">
            <Descriptions column={1}>
              <Descriptions.Item label="Street">
                {street.name}, {street.number}
              </Descriptions.Item>
              <Descriptions.Item label="City">{city}</Descriptions.Item>
              <Descriptions.Item label="State">{state}</Descriptions.Item>
              <Descriptions.Item label="Postal Code">
                {postcode}
              </Descriptions.Item>
              <Descriptions.Item label="Country">{country}</Descriptions.Item>
            </Descriptions>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Contact" key="3">
            <Descriptions column={1}>
              <Descriptions.Item label="Mobile Phone">{cell}</Descriptions.Item>
              <Descriptions.Item label="Phone">{phone}</Descriptions.Item>
            </Descriptions>
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    );
  };

  const Action = (_t: string, e: User) => (
    <Button onClick={() => setSelectedPatient(e.email)}>View</Button>
  );

  const columns: TableColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      render: nameFmt,
      sorter: {
        compare: (a, b) => nameFmt(a.name).localeCompare(nameFmt(b.name)),
        multiple: 1,
      },
      filteredValue: [searchValue],
      onFilter: (value, record) => {
        if (typeof value === "string")
          return !!nameFmt(record.name)
            .toLocaleLowerCase()
            .match(value.toLocaleLowerCase());
        return false;
      },
    },
    { title: "Birth", dataIndex: "dob", render: birthFmt },
    { title: "Gender", dataIndex: "gender" },
    { title: "Actions", render: Action },
  ];

  return (
    <PageLayout>
      <>
        <Input
          placeholder="Patient Name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Table
          dataSource={patients}
          columns={columns}
          pagination={false}
          loading={loading}
          footer={TableFooter}
          rowKey={(e) => e.email}
        />
        {selectedPatient != "" && (
          <ViewModal
            patient={patients.find((e) => e.email == selectedPatient)!}
          />
        )}
      </>
    </PageLayout>
  );
}
