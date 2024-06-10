export default class DataResponse {
  constructor(message, statusCode, data) {
    this.message = message;
    this.statusCode = statusCode;
    this.success = String(statusCode).startsWith('2');
    this.items = data ? (Array.isArray(data) ? data.length : 1) : 0;
    this.data = data || {};
  }
}
