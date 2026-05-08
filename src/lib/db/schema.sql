-- Training Programs Table
-- Run this SQL in Supabase SQL Editor to create/update the training_programs table

-- Create training_programs table if not exists
CREATE TABLE IF NOT EXISTS training_programs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT,
  description TEXT,
  duration TEXT,
  schedule TEXT,
  current_cohort TEXT,
  icon TEXT DEFAULT 'GraduationCap',
  pdf_link TEXT,
  color_hex TEXT DEFAULT '#8A1A1A',
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns if they don't exist (for existing tables)
DO $$
BEGIN
  -- Summary column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'training_programs' AND column_name = 'summary') THEN
    ALTER TABLE training_programs ADD COLUMN summary TEXT;
  END IF;
  -- Duration column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'training_programs' AND column_name = 'duration') THEN
    ALTER TABLE training_programs ADD COLUMN duration TEXT;
  END IF;
  -- Schedule column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'training_programs' AND column_name = 'schedule') THEN
    ALTER TABLE training_programs ADD COLUMN schedule TEXT;
  END IF;
  -- Current cohort column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'training_programs' AND column_name = 'current_cohort') THEN
    ALTER TABLE training_programs ADD COLUMN current_cohort TEXT;
  END IF;
  -- Icon column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'training_programs' AND column_name = 'icon') THEN
    ALTER TABLE training_programs ADD COLUMN icon TEXT DEFAULT 'GraduationCap';
  END IF;
  -- PDF link column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'training_programs' AND column_name = 'pdf_link') THEN
    ALTER TABLE training_programs ADD COLUMN pdf_link TEXT;
  END IF;
  -- Color hex column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'training_programs' AND column_name = 'color_hex') THEN
    ALTER TABLE training_programs ADD COLUMN color_hex TEXT DEFAULT '#8A1A1A';
  END IF;
  -- Order column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'training_programs' AND column_name = 'order') THEN
    ALTER TABLE training_programs ADD COLUMN "order" INTEGER DEFAULT 0;
  END IF;
  -- Is active column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'training_programs' AND column_name = 'is_active') THEN
    ALTER TABLE training_programs ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
  END IF;
END $$;

-- Create index for faster slug lookup
CREATE INDEX IF NOT EXISTS idx_training_programs_slug ON training_programs(slug);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_training_programs_order ON training_programs("order");

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_training_programs_updated_at') THEN
    CREATE TRIGGER update_training_programs_updated_at
      BEFORE UPDATE ON training_programs
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END;
$$;

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  program_id INTEGER REFERENCES training_programs(id) ON DELETE SET NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  course_type TEXT CHECK (course_type IN ('Chuyên đề', 'Khóa học')) DEFAULT 'Khóa học',
  format TEXT CHECK (format IN ('in_person', 'online', 'hybrid')) DEFAULT 'in_person',
  status TEXT CHECK (status IN ('active', 'upcoming', 'completed')) DEFAULT 'active',
  status_label TEXT,
  format_label TEXT,
  start_date DATE,
  students_count INTEGER DEFAULT 0,
  "order" INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE,
  location TEXT,
  audience TEXT[] DEFAULT '{}',
  color_hex TEXT DEFAULT '#8A1A1A',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_program_id ON courses(program_id);
CREATE INDEX IF NOT EXISTS idx_courses_category_id ON courses(category_id);

-- Create trigger for courses
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_courses_updated_at') THEN
    CREATE TRIGGER update_courses_updated_at
      BEFORE UPDATE ON courses
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END;
$$;