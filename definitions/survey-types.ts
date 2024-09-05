export interface surveyType {
  survey: string;
  description?: string;
  date: string;
  time: string;
  status?: React.ReactNode | string;
  unitName?: string;
  unitAddress?: string;
}

export interface SurveyParts {
  id: number;
  title: string;
  description: string;
  is_active: boolean;
  status: string;
}

export interface SurveyType {
  id: number;
  caption: string;
  description?: string;
  completion_date: string;
  completion_time: string;
  survey_status: string;
  status?: React.ReactNode | string;
  unitName?: string;
  unitAddress?: string;
  published?: boolean;
  surveyparts?: Array<SurveyParts>;
}
