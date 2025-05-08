export interface ApiResponse<T> {
  statusCode: number;
  error: string | null;
  message: string;
  data: T;
}