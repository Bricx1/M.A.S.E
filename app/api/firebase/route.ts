import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"

export async function GET() {
  try {
    const snapshot = await db.collection("test").get()
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error fetching data from Firestore:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const ref = await db.collection("test").add(body)
    const doc = await ref.get()
    return NextResponse.json({ success: true, data: { id: doc.id, ...doc.data() } })
  } catch (error) {
    console.error("Error writing to Firestore:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
