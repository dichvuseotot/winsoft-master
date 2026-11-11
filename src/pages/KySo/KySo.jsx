import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  Form,
  DatePicker,
  Select,
  Button,
  Table,
  Tag,
  Space,
  message,
  Alert,
  Progress,
  Modal,
  Radio,
} from "antd";

import {
  UsbOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

import moment from "moment";
const { RangePicker } = DatePicker;

const API_URL =
  "http://103.98.160.42:7979/api/export-xml-tren-18-tuoi-send-to-portal";

const LOCAL_AGENT_URL = "http://127.0.0.1:8090";

// ==========================================
// COMPONENT
// ==========================================

const KySo = () => {
  const [form] = Form.useForm();
  const token = localStorage.getItem("token");
  const [certificates, setCertificates] = useState([]);
  const [doctorThumbprint, setDoctorThumbprint] = useState("");
  const [hospitalThumbprint, setHospitalThumbprint] = useState("");
  const [agentConnected, setAgentConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(0);

  const [total, setTotal] = useState(0);
  const [openCertificateModal, setOpenCertificateModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const getCN = (value) => {
    if (!value) return "";

    if (typeof value === "string") {
      const match = value.match(/CN=([^,]+)/i);
      return match ? match[1] : value;
    }

    if (typeof value === "object") {
      return value.CN || value.cn || "";
    }

    return String(value);
  };

  const formatDate = (value) => {
    if (!value) return "";
    return new Date(value).toLocaleDateString("vi-VN");
  };

  const api = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 90000,
  });

  const Check_Local_Agent = async () => {
    try {
      const response = await axios.get(`${LOCAL_AGENT_URL}/health`, {
        timeout: 5000,
      });

      if (response.data) {
        setAgentConnected(true);
        return true;
      }

      setAgentConnected(false);
      return false;
    } catch (error) {
      setAgentConnected(false);
      return false;
    }
  };

  const Load_Certificates = async () => {
    try {
      const response = await axios.get(`${LOCAL_AGENT_URL}/certificates`, {
        timeout: 15000,
      });
      // Hỗ trợ hai kiểu trả về:
      // [ { subject, thumbprint, valid } ]
      // { success: true, certificates: [...] }

      const data = Array.isArray(response.data.data)
        ? response.data
        : response.data.certificates || [];

      setCertificates(data);

      setAgentConnected(true);

      if (data.length === 0) {
        message.warning("Không tìm thấy chứng thư số");
      }

      return data;
    } catch (error) {
      setAgentConnected(false);
      setCertificates([]);

      message.error(
        error.response?.data?.message ||
          "Không kết nối được Local Agent hoặc không đọc được USB Token",
      );

      return [];
    }
  };

  const Sign_By_Local_Agent = async ({ data, thumbprint }) => {
    try {
      const response = await axios.post(
        `${LOCAL_AGENT_URL}/sign`,
        {
          provider: "usb",
          data,
          thumbprint,
        },
        /*,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    timeout: 70000
                }*/
      );

      if (!response.data?.success || !response.data?.signature) {
        throw new Error(response.data?.message || "Ký USB Token thất bại");
      }
      return response.data.signature;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Không ký được USB Token",
      );
    }
  };

  const Prepare_Export_XML = async (TuNgay, DenNgay) => {
    /* const response = await api.get(API_URL, {
			params: {
				action: "prepare",
				TuNgay,
				DenNgay
			}
		});*/

    const response = await api.post(API_URL, {
      action: "prepare",
      TuNgay,
      DenNgay,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Lấy dữ liệu thất bại");
    }

    return response.data;
  };

  const Complete_Export_XML = async ({
    requestId,
    signatureDoctor,
    signatureHospital,
  }) => {
    const response = await api.post(API_URL, {
      action: "complete",
      requestId,
      signatureDoctor,
      signatureHospital,
    });
    return response.data;
  };

  const Handle_Export_XML = async () => {
    try {
      if (!agentConnected) {
        message.warning("Vui lòng kết nối Local Agent");
        return;
      }

      /*if (!doctorThumbprint || !hospitalThumbprint) {
                message.warning("Vui lòng chọn đủ hai chứng thư số");
                return;
            }*/

      /*if (doctorThumbprint === hospitalThumbprint) {
                message.warning(
                    "Chứng thư người kết luận và bệnh viện không được trùng nhau"
                );
                return;
            }*/

      const dates = form.getFieldValue("NgayLap");

      if (!dates || dates.length !== 2) {
        message.warning("Vui lòng chọn khoảng ngày");
        return;
      }

      const TuNgay = dates[0].format("YYYY-MM-DD");
      const DenNgay = dates[1].format("YYYY-MM-DD");

      setLoading(true);
      setResults([]);
      setProgress(0);
      setTotal(0);

      // --------------------------------------
      // BƯỚC 1: PREPARE
      // --------------------------------------

      message.loading({
        content: "Đang lấy danh sách hồ sơ...",
        key: "exportXML",
      });

      const prepareData = await Prepare_Export_XML(TuNgay, DenNgay);
      const tasks = prepareData.data || [];

      setTotal(tasks.length);

      if (tasks.length === 0) {
        setResults(prepareData.errors || []);

        message.info({
          content: "Không có hồ sơ cần ký",
          key: "exportXML",
        });

        return;
      }

      const exportResults = [...(prepareData.errors || [])];

      // --------------------------------------
      // BƯỚC 2: KÝ TỪNG HỒ SƠ
      // --------------------------------------

      for (let i = 0; i < tasks.length; i++) {
        const patient = tasks[i];

        try {
          message.loading({
            content: `Đang ký ${i + 1}/${tasks.length}: ${patient.HO_TEN}`,
            key: "exportXML",
          });

          // Ký người kết luận
          const signatureDoctor = await Sign_By_Local_Agent({
            data: patient.signingData,
            thumbprint: doctorThumbprint,
          });

          // Ký bệnh viện
          /*const signatureHospital =
                        await Sign_By_Local_Agent({
                            data: patient.signingData,
                            thumbprint: hospitalThumbprint
                        });*/

          const signatureHospital = "";
          // ----------------------------------
          // BƯỚC 3: COMPLETE
          // ----------------------------------

          const completeData = await Complete_Export_XML({
            requestId: patient.requestId,
            signatureDoctor,
            signatureHospital,
          });

          exportResults.push({
            KSKCD_TiepNhanId: patient.KSKCD_TiepNhanId,
            HO_TEN: patient.HO_TEN,
            success: completeData.success,
            response: completeData.response,
            error: completeData.message,
          });
        } catch (error) {
          exportResults.push({
            KSKCD_TiepNhanId: patient.KSKCD_TiepNhanId,
            HO_TEN: patient.HO_TEN,
            success: false,
            error:
              error.response?.data?.error ||
              error.response?.data?.message ||
              error.message,
          });
        }

        setResults([...exportResults]);

        setProgress(Math.round(((i + 1) / tasks.length) * 100));
      }

      // --------------------------------------
      // BƯỚC 4: TỔNG KẾT
      // --------------------------------------

      const successCount = exportResults.filter((x) => x.success).length;

      const errorCount = exportResults.filter((x) => !x.success).length;

      message.destroy("exportXML");

      if (errorCount === 0) {
        message.success(`Gửi thành công ${successCount} hồ sơ`);
      } else {
        message.warning(
          `Thành công ${successCount}, thất bại ${errorCount} hồ sơ`,
        );
      }
    } catch (error) {
      message.destroy("exportXML");

      message.error(
        error.response?.data?.message || error.message || "Xuất XML thất bại",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Check_Local_Agent();
  }, []);

  const columns = [
    {
      title: "STT",
      width: 60,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Mã tiếp nhận",
      dataIndex: "KSKCD_TiepNhanId",
      width: 140,
    },
    {
      title: "Họ tên",
      dataIndex: "HO_TEN",
      width: 200,
    },
    {
      title: "Kết quả",
      dataIndex: "success",
      width: 120,
      align: "center",
      render: (value) =>
        value ? (
          <Tag color="success">Thành công</Tag>
        ) : (
          <Tag color="error">Thất bại</Tag>
        ),
    },
    {
      title: "Thông báo",
      dataIndex: "error",
      render: (value, record) => {
        if (value) return value;

        return record.success ? "Đã gửi hồ sơ" : "";
      },
    },
  ];

  useEffect(() => {
    if (certificates?.data?.length > 0) {
      setOpenCertificateModal(true);
    }
  }, [certificates]);

  return (
    <div style={{ padding: 16 }}>
      <Card
        title="XUẤT XML KHÁM SỨC KHỎE TRÊN 18 TUỔI"
        extra={
          <Space>
            {agentConnected ? (
              <Tag color="success">Local Agent đã kết nối</Tag>
            ) : (
              <Tag color="error">Chưa kết nối Local Agent</Tag>
            )}

            <Button
              icon={<ReloadOutlined />}
              onClick={async () => {
                const connected = await Check_Local_Agent();

                if (connected) {
                  await Load_Certificates();
                }
              }}
            >
              Kết nối USB
            </Button>
          </Space>
        }
      >
        {!agentConnected && (
          <Alert
            type="warning"
            showIcon
            message="Chưa kết nối được Local Agent"
            description="Vui lòng khởi động WINSOFT Analyzer/Signing Agent trên máy tính và kiểm tra USB Token."
            style={{ marginBottom: 16 }}
          />
        )}

        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                NgayLap: [moment().startOf("month"), moment()],
              }}
            >
              <Form.Item
                label="Khoảng ngày tiếp nhận"
                name="NgayLap"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn khoảng ngày",
                  },
                ]}
              >
                <RangePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
              </Form.Item>
            </Form>
          </Col>

          <Modal
            title="CHỌN CHỨNG THƯ SỐ"
            open={openCertificateModal}
            onCancel={() => setOpenCertificateModal(false)}
            footer={null}
            width={750}
            centered
          >
            <Radio.Group
              style={{ width: "100%" }}
              value={selectedCertificate}
              onChange={(e) => setSelectedCertificate(e.target.value)}
            >
              {certificates?.data?.map((item, index) => (
                <Card
                  key={item.thumbprint}
                  size="small"
                  style={{
                    marginBottom: 12,
                    border:
                      selectedCertificate === item.thumbprint
                        ? "1px solid #1677ff"
                        : "1px solid #d9d9d9",
                    background:
                      selectedCertificate === item.thumbprint
                        ? "#f0f7ff"
                        : "#fff",
                  }}
                >
                  <div style={{ display: "flex", gap: 12 }}>
                    <Radio value={item.thumbprint} />

                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>
                        {getCN(item.subject)}
                      </div>

                      <div style={{ marginTop: 8 }}>
                        <div>
                          <b>Đơn vị cấp:</b> {getCN(item.issuer)}
                        </div>

                        <div>
                          <b>Serial Number:</b> {item.serialNumber}
                        </div>

                        <div>
                          <b>Thumbprint:</b> {item.thumbprint}
                        </div>

                        <div>
                          <b>Hiệu lực từ:</b> {formatDate(item.notBefore)}
                        </div>

                        <div>
                          <b>Hiệu lực đến:</b> {formatDate(item.notAfter)}
                        </div>

                        <div style={{ marginTop: 8 }}>
                          <Tag color={item.hasPrivateKey ? "success" : "error"}>
                            {item.hasPrivateKey
                              ? "Có khóa riêng tư"
                              : "Không có khóa riêng tư"}
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </Radio.Group>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 20,
                gap: 8,
              }}
            >
              <Button onClick={() => setOpenCertificateModal(false)}>
                Hủy
              </Button>

              <Button
                type="primary"
                disabled={!selectedCertificate}
                onClick={() => {
                  setOpenCertificateModal(false);
                  setDoctorThumbprint(selectedCertificate);
                }}
              >
                Xác nhận chứng thư
              </Button>
            </div>
          </Modal>

          <Col xs={24} md={8}>
            <Form.Item label="Chứng thư người kết luận dfgdfg">
              <Select
                placeholder="Chọn chứng thư số"
                value={doctorThumbprint || undefined}
                onChange={setDoctorThumbprint}
                showSearch
                optionFilterProp="label"
                options={(certificates?.data || [])
                  .filter((x) => x.valid !== false)
                  .map((item) => ({
                    label: item.subject,
                    value: item.thumbprint,
                  }))}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item label="Chứng thư bệnh viện">
              <Select
                placeholder="Chọn chứng thư số"
                value={hospitalThumbprint || undefined}
                onChange={setHospitalThumbprint}
                showSearch
                optionFilterProp="label"
                options={(certificates?.data || [])
                  .filter((x) => x.valid !== false)
                  .map((item) => ({
                    label: item.subject,
                    value: item.thumbprint,
                  }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 12 }}>
          <Col>
            <Button
              icon={<UsbOutlined />}
              onClick={Load_Certificates}
              disabled={!agentConnected}
            >
              Đọc chứng thư số
            </Button>
          </Col>

          <Col>
            <Button
              type="primary"
              icon={<SafetyCertificateOutlined />}
              loading={loading}
              onClick={Handle_Export_XML}
            >
              Xuất XML và ký USB Token
            </Button>
          </Col>
        </Row>

        {loading && (
          <div style={{ marginTop: 24 }}>
            <Progress percent={progress} status="active" />
            <div>
              Đã xử lý {results.length}/{total} hồ sơ
            </div>
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <Table
            rowKey={(record, index) => record.KSKCD_TiepNhanId || index}
            columns={columns}
            dataSource={results}
            size="small"
            bordered
            pagination={{
              pageSize: 10,
            }}
            scroll={{
              x: 900,
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default KySo;
