import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(
  request: NextRequest,
  { params }: { params: { patientId: string } }
) {
  try {
    const { patientId } = params
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("id", patientId)
      .single()
    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Patient not found" }, { status: 404 })
      }
      throw error
    }

    if (!data) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, patient: data })
  } catch (error) {
    console.error("Error fetching patient:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
