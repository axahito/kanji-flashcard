export interface KanjiData {
  strokes: number;
  grade?: number;
  freq?: number;
  jlpt_old?: number;
  jlpt_new?: number;
  meanings: string[];
  readings_on?: string[];
  readings_kun?: string[];
  wk_level?: number;
  wk_meanings?: string[];
  wk_readings_on?: string[];
  wk_readings_kun?: string[];
  wk_radicals?: string[];
}
