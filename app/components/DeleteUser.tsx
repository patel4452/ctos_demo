"use client";
interface IEmployee {
  id: number;
}
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

export default function RemoveEmployee({ id }: IEmployee) {
  const router = useRouter();
  const removeEmp = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/employees?id=${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      router.refresh();
    }
  };
  return (
    <button onClick={removeEmp}>
      <DeleteIcon className="cursor-pointer" />
    </button>
  );
}
