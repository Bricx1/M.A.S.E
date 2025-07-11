import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"

export async function GET() {
  try {
    await db.collection("patients").limit(1).get()
    return NextResponse.json({ success: true, message: "Connected to Firebase" })
  } catch (error) {
    console.error("Firebase connection test failed:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
