import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function TestSupabase() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      console.log("🚀 Probando conexión con Supabase...")

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")

      if (error) {
        console.error("❌ ERROR:", error)
      } else {
        console.log("✅ DATA:", data)
        setProjects(data)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <p>Cargando datos...</p>

  return (
    <div>
      <h1>Test Supabase</h1>

      {projects.length === 0 ? (
        <p>No hay datos</p>
      ) : (
        projects.map((p) => (
          <div key={p.id} style={{ marginBottom: "20px" }}>
            <h2>{p.title}</h2>
            <p>{p.description}</p>
          </div>
        ))
      )}
    </div>
  )
}