package com.edir.app.shared.adapter.dto;

import java.util.Map;

public record ErrorDto(
        String message,
        String statusCode,
        Map<String,String> errors
) {
}
