import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase.from("test").select("*")
    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error fetching data from Supabase:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data, error } = await supabase
      .from("test")
      .insert(body)
      .select()
      .single()
    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error writing to Supabase:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
