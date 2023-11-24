import Link from "next/link";
import React from "react";
import FormAdd from "./FormAdd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";

const AddUser = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        className="btn btn-primary mb-4"
      >
        <Link className="font-bold" href="/">
          View All Employee
        </Link>
      </Button>
      <h2 className="my-3 text-xl font-bold">Employee Form</h2>
      <FormAdd />
    </main>
  );
};

export default AddUser;
