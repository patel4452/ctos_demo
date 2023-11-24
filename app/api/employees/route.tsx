import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Employee from "../../../models/employee";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, fullname, salary, avatar } = await req.json();
  await connectMongoDB();
  await Employee.create({ email, fullname, salary, avatar });
  return NextResponse.json({ message: "Employee Added" }, { status: 201 });
}

export async function GET(req: NextRequest, res: NextResponse) {
  await connectMongoDB();
  const employees = await Employee.find();

  return NextResponse.json({ employees });
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Employee.findByIdAndDelete(id);
  return NextResponse.json({ message: "Employee Deleted" }, { status: 200 });
}
