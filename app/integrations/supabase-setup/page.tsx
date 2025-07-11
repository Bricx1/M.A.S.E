"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Database } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DataItem {
  id: string
  [key: string]: any
}

export default function SupabaseSetupPage() {
  const [items, setItems] = useState<DataItem[]>([])
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const loadItems = async () => {
    try {
      const res = await fetch("/api/supabase")
      const data = await res.json()
      if (data.success) {
        setItems(data.data)
      } else {
        setError(data.error || "Failed to load data")
      }
    } catch (err) {
      setError("Failed to load data")
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const addItem = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/supabase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      })
      const data = await res.json()
      if (data.success) {
        setItems(prev => [...prev, data.data])
        setText("")
      } else {
        setError(data.error || "Failed to add item")
      }
    } catch (err) {
      setError("Failed to add item")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/integrations" className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Integrations
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Database className="h-7 w-7 text-green-500" />
            Supabase Demo
          </h1>
          <p className="text-gray-600 mt-1">View and add data stored in Supabase.</p>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>New Item</CardTitle>
            <CardDescription>Add a row to the Supabase "test" table.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text" />
            <Button onClick={addItem} disabled={loading}>Add</Button>
          </CardContent>
        </Card>
        {error && <p className="text-red-600">{error}</p>}
        <Card>
          <CardHeader>
            <CardTitle>Stored Items</CardTitle>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <p className="text-sm text-gray-600">No items found.</p>
            ) : (
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item.id} className="p-2 border rounded-md bg-white">
                    {item.text || JSON.stringify(item)}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
