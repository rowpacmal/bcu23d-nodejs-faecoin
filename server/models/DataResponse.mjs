export default class DataResponse {
  constructor({ message, error, statusCode, data }) {
    message && (this.message = message);
    error && (this.error = error);
    this.statusCode = statusCode;
    this.success = String(statusCode).startsWith('2');
    this.items = data ? (Array.isArray(data) ? data.length : 1) : 0;
    this.data = data || null;
  }
}
