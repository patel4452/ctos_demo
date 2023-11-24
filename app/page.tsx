import Image from "next/image";
import Link from "next/link";
import UserList from "./components/UserList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-row justify-center w-6/12">
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          className="btn btn-primary"
        >
          <Link className="font-bold" href="/add">
            Add Employee
          </Link>
        </Button>
      </div>
      <UserList />
    </main>
  );
}
