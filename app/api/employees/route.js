import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Employee from "../../../models/employee";

export async function POST(request) {
  const { email, fullname, salary, avatar } = await request.json();
  await connectMongoDB;
  await Employee.create({ email, fullname, salary, avatar });
  return NextResponse.json({ message: "Employee Added" }, { status: 201 });
}

export async function GET(request) {
  await connectMongoDB;
  const employees = await Employee.find();
  console.log(employees);
  return NextResponse.json({ employees });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB;
  await Employee.findByIdAndDelete(id);
  return NextResponse.json({ message: "Employee Deleted" }, { status: 200 });
}
