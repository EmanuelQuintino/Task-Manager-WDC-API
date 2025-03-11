export class AppError {
  public message: string;
  public status: number;

  constructor(message: string, status = 400) {
    this.message = message;
    this.status = status;
  }
}
