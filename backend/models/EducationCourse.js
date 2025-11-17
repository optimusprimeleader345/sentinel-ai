import mongoose from 'mongoose'

const educationCourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['basics', 'advanced', 'phishing', 'malware', 'network'],
    default: 'basics',
  },
  content: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // in minutes
    default: 10,
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const EducationCourse = mongoose.models.EducationCourse || mongoose.model('EducationCourse', educationCourseSchema)

export default EducationCourse

