import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Employee from "../../../../models/employee";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    email: email,
    fullname: fullname,
    salary: salary,
    avatar: avatar,
  } = await request.json();
  await connectMongoDB();
  await Employee.findByIdAndUpdate(id, { email, fullname, salary, avatar });
  return NextResponse.json({ message: "Employee Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const employee = await Employee.findOne({ _id: id });
  return NextResponse.json({ employee }, { status: 200 });
}
