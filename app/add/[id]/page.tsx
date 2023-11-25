import EditUser from "@/app/components/EditUser";

interface IEmployee {
  params: {
    id: number;
  };
}
const getEmployeeById = async (id: Number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/employees/${id}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("No Data Available");
    } else {
      return res.json();
    }
  } catch (err) {
    console.log(err);
  }
};
export default async function Edit({ params }: IEmployee) {
  const { id } = params;
  const { employee } = await getEmployeeById(id);
  const { fullname, salary, email, avatar } = employee;
  return (
    <EditUser
      id={id}
      fullname={fullname}
      salary={salary}
      email={email}
      avatar={avatar}
    />
  );
}
