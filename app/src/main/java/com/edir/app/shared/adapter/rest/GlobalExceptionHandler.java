package com.edir.app.shared.adapter.rest;

import com.edir.app.shared.adapter.dto.ErrorDto;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseBody
    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorDto handleException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = ex.getBindingResult().getFieldErrors()
                .stream()
                .collect(Collectors
                        .toMap(FieldError::getField,
                                FieldError::getDefaultMessage,
                                (existing, replace) -> existing)
                );
        log.error("Validation error: {}", errors, ex);
        return new ErrorDto(HttpStatus.BAD_REQUEST.getReasonPhrase(),
                HttpStatus.BAD_REQUEST.toString(),
                errors);
    }

    @ResponseBody
    @ExceptionHandler(value = {ConstraintViolationException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorDto handleException(ConstraintViolationException ex) {
        String violations = extractViolationsFromException(ex);
        Map<String, String> exception = new HashMap<>();
        exception.put("violations", violations);
        log.error("Constraint violation error: {}", violations, ex);
        return new ErrorDto(HttpStatus.BAD_REQUEST.getReasonPhrase(),
                HttpStatus.BAD_REQUEST.toString(),
                exception);
    }

    @ExceptionHandler(HandlerMethodValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorDto handle(HandlerMethodValidationException ex) {

        Map message = ex.getAllErrors()
                .stream()
                .collect(
                        Collectors.toMap(
                                MessageSourceResolvable::getArguments,
                                MessageSourceResolvable::getDefaultMessage
                        )
                );

        return new ErrorDto("Bad Request",
                HttpStatus.BAD_REQUEST.toString()      ,
                message);
    }

    @ResponseBody
    @ExceptionHandler(value = Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDto handleException(Exception exception) {
        log.error(exception.getMessage(), exception);
        Map<String, String> exceptions = new HashMap<>();
        exceptions.put("exception", exception.getMessage());
        return new ErrorDto(
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                HttpStatus.INTERNAL_SERVER_ERROR.toString()      ,
                exceptions
        );
    }


    private String extractViolationsFromException(ConstraintViolationException validationException) {
        return validationException.getConstraintViolations()
                .stream().map(ConstraintViolation::
                        getMessage).collect(Collectors.joining("--"));
    }
}


