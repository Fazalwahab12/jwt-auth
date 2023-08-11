

import { connect } from "@/app/dbcomfig/bdconfige";
import User from "@/app/modols/usermodule";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();


export async function POST(request: NextRequest){
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({error: "User not fount"}, {status: 400})
    }

    // Check password validity
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({error: "invied passward"}, {status: 400})
    }

    // Create token data
    const tokenData = { userId: user._id, email: user.email , password : user.passward }; // Example data, adjust as needed

    // Create a JWT token
    const jwtToken = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

    const response =  NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", jwtToken, { httpOnly: true});

    return response;
} catch (error) {
    console.error(error);
    return  NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
