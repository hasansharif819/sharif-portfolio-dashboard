import { DatePicker, Form } from "antd";

type TDatePickerProps = {
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Form.Item label={label} name={name}>
        <DatePicker
          size="large"
          style={{ width: "100%" }}
          format="YYYY-MM-DD"
        />
      </Form.Item>
    </div>
  );
};

export default PHDatePicker;
