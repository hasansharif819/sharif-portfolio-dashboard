import {
    Table,
    TableColumnsType,
  } from "antd";
import { useGetAllAdminsQuery } from "../../../redux/features/admin/admin.api";
  
  
  const AdminLists = () => {
    const { data: admins, isFetching } = useGetAllAdminsQuery({});
    
    const tableData = admins?.data?.map(
      ({
        _id,
        name,
        email,
        role,
        isDeleted,
      }) => ({
        key: _id,
        name,
        email,
        role,
        isDeleted
      })
    );
  
    const columns: TableColumnsType<any> = [
      {
        title: "Name",
        key: "name",
        dataIndex: "name",
      },
      {
        title: "Email",
        key: "email",
        dataIndex: "email",
      },
      {
        title: "Role",
        key: "role",
        dataIndex: "role",
      },
    ];
  
    return (
      <>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
        />
      </>
    );
  };
  
  export default AdminLists;
  