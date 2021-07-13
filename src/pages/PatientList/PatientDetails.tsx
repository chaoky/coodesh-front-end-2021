import { CloseOutlined } from "@ant-design/icons";
import { Avatar, Button, Descriptions, Tabs, Typography } from "antd";

import { nameFmt, User } from "../../hooks/RandomUserHook";

export default function PatientDetails(props: {
  patient: User;
  onClose: () => void;
}) {
  const { cell, phone, email, gender, dob, nat, id, location, picture, name } =
    props.patient;
  const { street, city, state, postcode, country } = location;

  const tabs = [
    {
      name: "Bio",
      items: [
        { label: "Email", field: email },
        { label: "Gender", field: gender },
        {
          label: "Birth Date",
          field: new Date(dob.date).toDateString() + dob.age,
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
        { label: "Street", field: street.name + street.number },
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
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "scroll",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2em",
          boxShadow:
            "0 3px 6px -4px #0000001f,0 6px 16px #00000014,0 9px 28px 8px #0000000d",
          borderRadius: 2,
        }}
        className="modal-size"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button
            aria-label="close"
            onClick={props.onClose}
            style={{ color: "black" }}
            size="large"
            icon={<CloseOutlined />}
            ghost
          ></Button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar size={150} src={picture.large} />
          <Typography.Title aria-label="name">{nameFmt(name)}</Typography.Title>
        </div>

        <Tabs defaultActiveKey="1">
          {tabs.map((e) => (
            <Tabs.TabPane tab={e.name} key={e.name}>
              <Descriptions column={1} size="small" bordered>
                {e.items.map((e) => (
                  <Descriptions.Item key={e.label} label={e.label}>
                    {e.field}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
