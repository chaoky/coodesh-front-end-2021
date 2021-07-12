import { Avatar, Descriptions, Modal, Tabs, Typography } from "antd";

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
    <Modal
      visible={true}
      onCancel={props.onClose}
      style={{ margin: 0, padding: 0, maxWidth: "100vw" }}
      bodyStyle={{ minHeight: "100vh" }}
      footer={false}
      title={false}
      centered
    >
      <div>
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
    </Modal>
  );
}
