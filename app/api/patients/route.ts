import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"

export async function GET() {
  try {
    const snapshot = await db.collection("patients").get()
    const patients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ success: true, patients })
  } catch (error) {
    console.error("Error fetching patients:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const ref = await db.collection("patients").add(data)
    const doc = await ref.get()
    return NextResponse.json({ success: true, patient: { id: doc.id, ...doc.data() } })
  } catch (error) {
    console.error("Error creating patient:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
