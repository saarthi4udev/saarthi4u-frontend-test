// services/consultationApi.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export interface ConsultationFormData {
  fullName: string;
  email: string | null;
  phone: string;
  message: string | null;
  courseInterest: string;
  preferredStateCity: string | null;
  preferredConsultationDate: string | null;
  preferredTime: string | null;
}

export interface ConsultationResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    fullName: string;
    email: string | null;
    phone: string;
    message: string | null;
    courseInterest: string;
    preferredStateCity: string | null;
    preferredConsultationDate: string | null;
    preferredTime: string | null;
    createdAt: string;
  };
  error?: string;
}

export async function createConsultation(
  formData: ConsultationFormData
): Promise<ConsultationResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/consultation/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message:
          data?.message || "Something went wrong. Please try again.",
        error: data?.error || `HTTP error! status: ${response.status}`,
      };
    }

    return {
      success: true,
      message: data?.message || "Consultation created successfully.",
      data: data?.data,
    };
  } catch (error) {
    console.error("Consultation API Error:", error);

    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}