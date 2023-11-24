import EditUser from "@/app/components/EditUser";

const getEmployeeById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/employees/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("No Data Available");
    } else {
      return res.json();
    }
  } catch (err) {
    console.log(err);
  }
};
export default async function Edit({ params }) {
  const { id } = params;
  const { employee } = await getEmployeeById(id);
  const { fullname, salary, email, avatar } = employee;
  return (
    <EditUser
      id={id}
      fullname={fullname}
      email={email}
      salary={salary}
      oldavatar={avatar}
    />
  );
}
