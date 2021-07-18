import { UserOutlined } from "@ant-design/icons";
import { css } from "@emotion/css";
import {
  Avatar,
  Descriptions,
  Input,
  Modal,
  Pagination,
  Table,
  Tabs,
  Typography,
} from "antd";
import { useMemo } from "react";

import PageLayout from "../../Components/PageLayout";
import { nameFmt, useFetchUser } from "../../hooks/RandomUserHook";
import { PatientListRoute, routes } from "../../hooks/router";
import { SortField } from "./params";
import { genColumns, genDetails } from "./utils";

export default function PatientList(props: { route: PatientListRoute }) {
  const { params } = props.route;
  const [patients, loading] = useFetchUser(params.page);
  const flatPatients = useMemo(
    () => Object.values(patients).flat(),
    [patients]
  );
  const columns = useMemo(() => genColumns(params), [params]);
  const details = useMemo(() => {
    if (params.current) {
      const patient = flatPatients.find((e) => e.email == params.current);
      if (patient) return genDetails(patient);
    }
  }, [params.current, patients]);

  return (
    <PageLayout>
      <Typography.Title level={5}>
        Greetings, On July 14, 2019, I will be shutting off my personal computer
        for good. My mobile phone will be disconnected and melted with thermite.
        I shall burn all my identification, money, and papers. Then I will
        commence my walk eastward.. into the rising sun.
      </Typography.Title>
      <Input
        placeholder='Search anything. example: cecil "male"'
        alt='Search anything. example: cecil "male"'
        value={params.nameFilter}
        onChange={(e) =>
          routes
            .patientList({ ...params, nameFilter: e.target.value })
            .replace()
        }
        size="large"
        suffix={<UserOutlined />}
      />
      <Table
        dataSource={flatPatients}
        onChange={(_p, _f, s) => {
          if (!(s instanceof Array)) {
            routes
              .patientList({
                ...params,
                sortOrder: s.order,
                sortField: s.field as SortField,
              })
              .replace();
          }
        }}
        columns={columns}
        loading={loading}
        rowKey={(e) => e.email}
        scroll={{ x: true }}
        pagination={{
          position: [],
          current:
            Math.max(0, Object.keys(patients).indexOf(String(params.page))) *
              5 +
            params.section,
        }}
        bordered
      />

      <Pagination
        responsive
        total={500}
        pageSize={10}
        current={(params.page - 1) * 5 + params.section}
        style={{ alignSelf: "center" }}
        showSizeChanger={false}
        showQuickJumper={true}
        onChange={(p) =>
          routes
            .patientList({
              ...params,
              page: Math.ceil(p / 5),
              section: ((p - 1) % 5) + 1,
            })
            .replace()
        }
      />

      <Modal
        onCancel={() =>
          routes.patientList({ ...params, current: undefined }).replace()
        }
        visible={!!details}
        footer={false}
        wrapClassName={css({
          "> div": {
            padding: 0,
            "@media only screen and (max-width: 500px)": {
              top: 0,
              margin: 0,
              minWidth: "100vw",
              minHeight: "100vh",
              "> .ant-modal-content": {
                minHeight: "100vh",
              },
            },
            "@media only screen and (max-height: 700px)": {
              top: 0,
            },
          },
        })}
      >
        {details && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <Avatar size={150} src={details.picture.large} />
              <Typography.Title
                style={{ textAlign: "center" }}
                aria-label="name"
              >
                {nameFmt(details.name)}
              </Typography.Title>
            </div>

            <Tabs defaultActiveKey="1">
              {details.tabs.map((e) => (
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
          </>
        )}
      </Modal>
    </PageLayout>
  );
}
