import EditUser from "@/app/components/EditUser";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";

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
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-row justify-center w-6/12">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          className="btn btn-primary my-3"
        >
          <Link className="font-bold" href="/">
            Go Back
          </Link>
        </Button>
      </div>
      <EditUser
        id={id}
        fullname={fullname}
        salary={salary}
        email={email}
        avatar={avatar}
      />
    </main>
  );
}
