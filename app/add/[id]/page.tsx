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
      return await res.json();
    }
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};
export default async function Edit({ params }) {
  const { id } = params;
  console.log(id);
  const { employee } = await getEmployeeById(id);
  console.log(employee);
  return <EditUser />;
}
