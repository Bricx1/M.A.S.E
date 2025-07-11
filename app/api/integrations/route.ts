import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, doc, setDoc, getDocs } from "firebase/firestore"

export async function POST(req: NextRequest) {
  try {
    const { id, data } = await req.json()
    const ref = doc(collection(db, "integrations"), id)
    await setDoc(ref, data, { merge: true })
    return NextResponse.json({ success: true, message: "Integration saved." })
  } catch (err) {
    console.error("Error saving integration:", err)
    return NextResponse.json({ success: false, error: "Failed to save integration." }, { status: 500 })
  }
}

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "integrations"))
    const integrations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ integrations })
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch integrations." }, { status: 500 })
  }
}
