export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
}

export const fetchData = async <T>(url: string): Promise<ApiResponse<T> | ApiError> => {
  try {
    const response = await fetch(url);
    const data: T = await response.json();

    if (!response.ok) {
      return {
        data: null,
        status: response.status,
        message: data.message || 'An error occurred',
      };
    }

    return {
      data,
      status: response.status,
      message: 'Success',
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};