// services/consultationApi.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export interface ConsultationFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  courseInterest: string;
  preferredStateCity: string;
  preferredConsultationDate: string;
  preferredTime: string;
}

export interface ConsultationResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    createdAt: string;
  };
  error?: string;
}

export async function createConsultation(
  formData: ConsultationFormData
): Promise<ConsultationResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/consultation/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data: ConsultationResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Something went wrong. Please try again.',
        error: data.error || `HTTP error! status: ${response.status}`,
      };
    }

    return data;
  } catch (error) {
    console.error('Consultation API Error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}