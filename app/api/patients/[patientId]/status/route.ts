import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { patientId: string } }
) {
  try {
    const { patientId } = params
    const body = await request.json()

    await db.collection("patients").doc(patientId).update(body)
    const doc = await db.collection("patients").doc(patientId).get()

    return NextResponse.json({
      success: true,
      patient: { id: doc.id, ...doc.data() },
      message: "Patient onboarding completed successfully",
    })
  } catch (error) {
    console.error("Error updating patient status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
