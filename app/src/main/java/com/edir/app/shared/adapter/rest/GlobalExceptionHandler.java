package com.edir.app.shared.adapter.rest;

import com.edir.app.shared.ApplicationException;
import com.edir.app.shared.adapter.dto.ApiErrorResponse;
import com.edir.app.shared.adapter.dto.ErrorResponse;
import com.edir.app.shared.adapter.dto.FieldValidationErrorResponse;
import com.edir.app.shared.domain.exceptions.DomainException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseBody
    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public FieldValidationErrorResponse handleException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = ex.getBindingResult().getFieldErrors()
                .stream()
                .collect(Collectors
                        .toMap(FieldError::getField,
                                FieldError::getDefaultMessage,
                                (existing, replace) -> existing)
                );
        log.error("Validation error: {}", errors, ex);
        return new FieldValidationErrorResponse(HttpStatus.BAD_REQUEST.getReasonPhrase(),
                HttpStatus.BAD_REQUEST.toString(),
                errors);
    }

    @ResponseBody
    @ExceptionHandler(value = {ConstraintViolationException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse handleException(ConstraintViolationException ex) {
        String violations = extractViolationsFromException(ex);
        return new ErrorResponse(
            violations,
            HttpStatus.BAD_REQUEST.toString(),
            Arrays.toString(ex.getStackTrace())
        );

    }

    @ExceptionHandler(HandlerMethodValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ApiErrorResponse handle(HandlerMethodValidationException ex) {

        Map message = ex.getAllErrors()
                .stream()
                .collect(
                        Collectors.toMap(
                                MessageSourceResolvable::getArguments,
                                MessageSourceResolvable::getDefaultMessage
                        )
                );

        return new FieldValidationErrorResponse(
            HttpStatus.BAD_REQUEST.getReasonPhrase(),
            HttpStatus.BAD_REQUEST.toString(),
            message
        );
    }

    @ExceptionHandler({DomainException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ApiErrorResponse handleDomainException(DomainException ex) {
        String message = ex.getMessage();

        return  new ErrorResponse(
            message,
            HttpStatus.BAD_REQUEST.toString(),
            Arrays.toString(ex.getStackTrace())
        );

    }

    @ExceptionHandler({ApplicationException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ApiErrorResponse handleApplicationException(ApplicationException ex) {
        String message = ex.getMessage();

        return  new ErrorResponse(
            message,
            HttpStatus.BAD_REQUEST.toString(),
            Arrays.toString(ex.getStackTrace())
        );

    }

    @ResponseBody
    @ExceptionHandler(value = Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiErrorResponse handleException(Exception exception) {
        log.error(exception.getMessage(), exception);

        return new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
            HttpStatus.INTERNAL_SERVER_ERROR.toString(),
            Arrays.toString(exception.getStackTrace())
        );
    }


    private String extractViolationsFromException(ConstraintViolationException validationException) {
        return validationException.getConstraintViolations()
                .stream().map(ConstraintViolation::
                        getMessage).collect(Collectors.joining("--"));
    }
}


