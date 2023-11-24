import Image from "next/image";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

interface Employee {
  id: number;
  email: string;
  fullname: string;
  salary: number;
  avatar: any;
}

const UserList = async () => {
  const res = await fetch("http://localhost:3000/api/employees", {
    next: { revalidate: 10 },
  });
  const employees: Employee[] = await res.json();
  console.log(employees);
  return (
    <div>
      <h1 className="text-xl text-center font-bold py-3 my-5">UserList</h1>
      <table className="table table-bordered border-collapse  border-2 border-gray-500">
        <tr className="border-collapse  border-2 border-gray-500">
          <th className="border-collapse  border-2 border-gray-500">Avatar</th>
          <th className="border-collapse  border-2 border-gray-500">Name</th>
          <th className="border-collapse  border-2 border-gray-500">Email</th>
          <th className="border-collapse  border-2 border-gray-500">Salary</th>
          <th className="border-collapse  border-2 border-gray-500">Actions</th>
        </tr>
        {employees.map((employee) => (
          <tr
            className="border-collapse  border-2 border-gray-500"
            key={employee.id}
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
              {employee.fullname}
            </td>
            <td className="border-collapse  border-2 border-gray-500">
              {employee.email}
            </td>
            <td className="border-collapse  border-2 border-gray-500">
              {employee.email}
            </td>
            <td className="border-collapse  border-2 border-gray-500">
              <Link className="font-bold" href={`/edit/${employee.id}`}>
                <EditIcon />
              </Link>
              <DeleteIcon />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default UserList;
