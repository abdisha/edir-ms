package com.edir.app.shared.adapter.dto;

import java.time.ZonedDateTime;

public abstract class ApiErrorResponse {
    private String message;
    private String statusCode;
    private ZonedDateTime timestamp = ZonedDateTime.now();
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

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(ZonedDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
