import { supabase } from './supabase.js'

async function searchCounselors(query) {
  try {
    const { data, error } = await supabase
      .from('counselors')
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%`)

    if (error) {
      console.error('Search error:', error.message)
      return []
    }

    return data
  } catch (err) {
    console.error('Unexpected error:', err)
    return []
  }
}

async function runSearch() {
  const searchQuery = 'anxiety' 
  const results = await searchCounselors(searchQuery)

  console.log(`Results for "${searchQuery}":`)
  results.forEach((counselor, index) => {
    console.log(`${index + 1}. ${counselor.name} - ${counselor.email}`)
  })
}

runSearch()
