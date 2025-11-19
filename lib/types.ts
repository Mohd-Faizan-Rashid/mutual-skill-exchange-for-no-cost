export type SkillSummary = {
  id: string
  name: string
  category: string | null
  description: string | null
  created_at: string | null
  teacher_count: number
  learner_count: number
  avg_rating: number
}

export type SkillDetail = {
  id: string
  name: string
  category: string | null
  description: string | null
  created_at: string | null
  teacher_count: number
  learner_count: number
  avg_rating: number
}

export type ReviewItem = {
  id: string
  rating: number
  feedback: string | null
  created_at: string
  match_id: string
  teacher_name: string | null
  teacher_avatar: string | null
  learner_name: string | null
  learner_avatar: string | null
}
