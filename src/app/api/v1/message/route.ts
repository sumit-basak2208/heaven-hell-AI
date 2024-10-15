import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/db";
import Message from "@/model/message.model";
import { cookies } from "next/headers";
import { Error } from "@/types/error";

connect();

export async function GET() {
  try {
    const email = cookies().get("email")?.value;
    if (!email) {
      return NextResponse.json(
        {
          error: "Please login first!!",
        },
        {
          status: 401,
        }
      );
    }
    const messages = await Message.find({ email: email }).sort([["createdAt", 1]]).limit(20);
    return NextResponse.json({
      hell: messages.filter((ele) => !ele.isHeaven),
      heaven: messages.filter((ele) => ele.isHeaven),
      success: true,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(err.message);
    return NextResponse.json(
      {
        error: err.message?? "Error on fetching data",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const email = cookies().get("email")?.value;
    if (!email) {
      return NextResponse.json(
        {
          error: "Please login first!!",
        },
        {
          status: 401,
        }
      );
    }
    const reqBody = await request.json();
    const { prompt, heavenMessage, hellMessage } = reqBody;
    const userHellMsg = new Message({
      message: prompt,
      isBot: false,
      isHeaven: false,
      email:email,
    });
    const hellMsg = new Message({
      message: hellMessage,
      isBot: true,
      isHeaven: false,
      email: email,
    });
    const userHeavenMsg = new Message({
      message: prompt,
      isBot: false,
      isHeaven: true,
      email: email,
    });
    const heaveneMsg = new Message({
      message: heavenMessage,
      isBot: true,
      isHeaven: true,
      email: email,
    });
    await Promise.all([userHeavenMsg.save(), userHellMsg.save()]);
    await Promise.all([heaveneMsg.save(), hellMsg.save()]);

    return NextResponse.json({
      message: "Message added succesfully",
      success: true,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(err.message);
    NextResponse.json(
      {
        error: err.message ?? "Error on adding data",
      },
      {
        status: 500,
      }
    );
  }
}
