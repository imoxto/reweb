
export class ServerError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ServerError";
    this.status = status;
  }
}