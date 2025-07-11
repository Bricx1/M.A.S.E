import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"

export async function GET(
  request: NextRequest,
  { params }: { params: { patientId: string } }
) {
  try {
    const { patientId } = params
    const doc = await db.collection("patients").doc(patientId).get()

    if (!doc.exists) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, patient: { id: doc.id, ...doc.data() } })
  } catch (error) {
    console.error("Error fetching patient:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
