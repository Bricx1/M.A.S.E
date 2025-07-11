import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { patientId: string } }
) {
  try {
    const { patientId } = params
    const body = await request.json()

    const { data, error } = await supabase
      .from("patients")
      .update(body)
      .eq("id", patientId)
      .select()
      .single()
    if (error) throw error

    return NextResponse.json({
      success: true,
      patient: data,
      message: "Patient onboarding completed successfully",
    })
  } catch (error) {
    console.error("Error updating patient status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
