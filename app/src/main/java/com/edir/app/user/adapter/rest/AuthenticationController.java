package com.edir.app.user.adapter.rest;

import com.edir.app.user.adapter.rest.dto.LoginRequestDto;
import com.edir.app.user.adapter.rest.dto.UserResponseDto;
import com.edir.app.user.adapter.security.SecurityUser;
import com.edir.app.user.adapter.utils.CookieUtils;
import com.edir.app.user.application.AccountService;
import com.edir.app.user.application.PasswordEncoder;
import com.edir.app.user.application.TokenProvider;
import com.edir.app.user.domain.User;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@RestController
@RequestMapping(REST_VERSION+"auth")
public class AuthenticationController {

    private final AccountService accountOutputPort;
    private final PasswordEncoder passwordEncoderPort;
    private final TokenProvider tokenProviderPort;

    public AuthenticationController(AccountService accountOutputPort,
                                    PasswordEncoder passwordEncoderPort,
                                    TokenProvider tokenProviderPort) {

        this.accountOutputPort = accountOutputPort;
        this.passwordEncoderPort = passwordEncoderPort;
        this.tokenProviderPort = tokenProviderPort;
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@RequestBody LoginRequestDto loginDto) {
        User user = accountOutputPort.findByEmail(loginDto.getEmail())
            .orElseThrow(() -> new IllegalArgumentException("Bad credentials"));

        if (!passwordEncoderPort.matches(loginDto.getPassword(),user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String jwtToken = tokenProviderPort.generateToken(user);
        ResponseCookie cookie = CookieUtils.createJwtCookie(jwtToken, 86400); // 1 day

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body( UserResponseDto.fromDomain(user));
    }
    @GetMapping("/me")
    public UserResponseDto me(@AuthenticationPrincipal SecurityUser principal) {
        return UserResponseDto.fromDomain(principal.getUser());

    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        ResponseCookie cookie = CookieUtils.deleteJwtCookie();
        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .build();
    }
}
