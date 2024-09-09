export interface Course {
  id: number;
  startDate?: string;
  endDate?: string;
  attendanceMethod?: string;
  name: string;
  description: string;
  price: number;
  educators: User[];
}
