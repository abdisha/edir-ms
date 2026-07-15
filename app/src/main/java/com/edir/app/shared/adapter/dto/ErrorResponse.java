package com.edir.app.shared.adapter.dto;

public class ErrorResponse extends ApiErrorResponse{
    private String detailMessage;

    public ErrorResponse() {
    }

    public ErrorResponse(String message, String statusCode,String detailMessage) {
        setMessage(message);
        setStatusCode(statusCode);
        this.detailMessage =detailMessage;
    }

    public String getDetailMessage() {
        return detailMessage;
    }

}
