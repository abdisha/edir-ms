package com.edir.app.shared.adapter.dto;


import java.util.HashMap;
import java.util.Map;

public class FieldValidationErrorResponse extends ApiErrorResponse{
    private  Map<String,String > validationErrors = new HashMap<>();
    public FieldValidationErrorResponse() {
    }

    public FieldValidationErrorResponse(String message, String statusCode, Map<String, String> validationErrors) {
        setMessage(message);
        setStatusCode(statusCode);
        this.validationErrors =validationErrors;
    }

    public Map<String, String> getValidationErrors() {
        return validationErrors;
    }


}
