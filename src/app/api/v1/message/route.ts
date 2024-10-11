import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/db";
import Message from "@/model/message.model";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

connect();

export async function GET() {
  try {
    const email = cookies().get("email")?.value;
    if (!email) {
      throw new Error("Login First!!");
    }
    const messages = await Message.find({ email: email }).limit(20);
    return NextResponse.json({
      hell: messages.filter((ele) => !ele.isHeaven),
      heaven: messages.filter((ele) => ele.isHeaven),
      success: true,
    });
  } catch (err: unknown) {
    console.log(err);
    return NextResponse.json(
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
    const email = cookies().get("email")?.value;
    if (!email) {
      throw new Error("Login First!!");
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
