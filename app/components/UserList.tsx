import Image from "next/image";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import RemoveEmployee from "./DeleteUser";

interface Employee {
  employees: {
    _id: number;
    email: string;
    fullname: string;
    salary: number;
    avatar: any;
  };
}

const UserList = async () => {
  const res = await fetch("http://localhost:3000/api/employees", {
    cache: "no-store",
  });
  const employeeData: Employee[] = await res.json();
  const { employees } = employeeData;

  return (
    <div>
      <h1 className="text-xl text-center font-bold py-3 my-5">UserList</h1>
      <table className="table table-bordered border-collapse  border-2 border-gray-500">
        <thead>
          <tr className="border-collapse  border-2 border-gray-500">
            <th className="border-collapse  border-2 border-gray-500">
              Avatar
            </th>
            <th className="border-collapse  border-2 border-gray-500">Name</th>
            <th className="border-collapse  border-2 border-gray-500">Email</th>
            <th className="border-collapse  border-2 border-gray-500">
              Salary
            </th>
            <th className="border-collapse  border-2 border-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr
              className="border-collapse  border-2 border-gray-500"
              key={employee._id}
            >
              <td className="border-collapse  border-2 border-gray-500">
                <Image
                  src={employee.avatar}
                  width="50"
                  height="50"
                  alt={employee.fullname}
                />
              </td>
              <td className="border-collapse  border-2 border-gray-500">
                {employee.fullname.length > 25
                  ? `${employee.fullname.substring(0, 25)}...`
                  : employee.fullname}
              </td>
              <td className="border-collapse  border-2 border-gray-500">
                {employee.email}
              </td>
              <td className="border-collapse  border-2 border-gray-500">
                RM {employee.salary}
              </td>
              <td className="border-collapse  border-2 border-gray-500">
                <Link
                  className="font-bold cursor-pointer"
                  href={`/add/${employee._id}`}
                >
                  <EditIcon />
                </Link>
                <RemoveEmployee id={employee._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
