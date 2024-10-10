import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/db";
import Message from "@/model/message.model";

connect();

export async function GET() {
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
    const { prompt, heavenMessage, hellMessage } = reqBody;
    const userHellMsg = new Message({
      message: prompt,
      isBot: false,
      isHeaven: false,
    });
    const hellMsg = new Message({
      message: hellMessage,
      isBot: true,
      isHeaven: false,
    });
    const userHeavenMsg = new Message({
      message: prompt,
      isBot: false,
      isHeaven: true,
    });
    const heaveneMsg = new Message({
      message: heavenMessage,
      isBot: true,
      isHeaven: true,
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
