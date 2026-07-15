package com.edir.app.shared.adapter.dto;

public abstract class ApiErrorResponse {
   private String message;
    private String statusCode;

    public String getMessage() {
        return message;
    }

    public String getStatusCode() {
        return statusCode;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }
}
