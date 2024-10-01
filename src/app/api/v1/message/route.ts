import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/db";
import Message from "@/model/message.model";

connect();

export async function GET(request:NextRequest) {
    try {
        const messages = await Message.find({});
        return NextResponse.json({
            hell: messages.filter(ele => !ele.isHeaven),
            heaven: messages.filter(ele => ele.isHeaven),
        })
    } catch (err: unknown) {
        console.log(err);
        NextResponse.json({
            error: "Error on fetching data",
        }, {
            status: 401
        })
    }
}