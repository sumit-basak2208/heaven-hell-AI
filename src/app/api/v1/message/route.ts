import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/db";
import Message from "@/model/message.model";

connect();

export async function GET(request: NextRequest) {
  try {
    const messages = await Message.find({});
    return NextResponse.json({
      hell: messages.filter((ele) => !ele.isHeaven),
      heaven: messages.filter((ele) => ele.isHeaven),
      success: true,
    });
  } catch (err: unknown) {
    console.log(err);
    NextResponse.json(
      {
        error: "Error on fetching data",
      },
      {
        status: 401,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { message, isBot, isHeaven } = reqBody;
    const newMessage = new Message({
      message,
      isBot,
      isHeaven,
    });
    await newMessage.save();
    return NextResponse.json({
      message: "Message added succesfully",
      success: true,
    });
    return NextResponse.json({});
  } catch (err: unknown) {
    console.log(err);
    NextResponse.json(
      {
        error: "Error on adding data",
      },
      {
        status: 500,
      }
    );
  }
}
