package com.edir.app.user.adapter.security;

import com.edir.app.user.application.TokenProvider;
import com.edir.app.user.domain.Role;
import com.edir.app.user.domain.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class JwtToken implements TokenProvider {
    private final Key key;
    private final long expirationMillis;

    public JwtToken(
        @Value("${app.security.jwt.secret:SuperSecretKeyThatMustBeAtLeast32BytesLong!}") String secret,
        @Value("${app.security.jwt.expiration-ms:86400000}") long expirationMillis) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.expirationMillis = expirationMillis;
    }

    @Override
    public String generateToken(User user) {
        Claims claims = Jwts.claims().setSubject(user.getEmail());
        claims.put("roles", user.getRoles().stream().map(Role::name).collect(Collectors.toList()));

        Date now = new Date();
        Date validity = new Date(now.getTime() + expirationMillis);

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(validity)
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
    }

    @Override
    public Optional<String> extractEmail(String token) {
        try {
            String email = Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().getSubject();
            return Optional.ofNullable(email);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public boolean validateToken(String token, String expectedEmail) {
        return extractEmail(token)
            .map(email -> email.equals(expectedEmail) && !isTokenExpired(token))
            .orElse(false);
    }

    private boolean isTokenExpired(String token) {
        try {
            Date expiration = Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().getExpiration();
            return expiration.before(new Date());
        } catch (Exception e) {
            return true;
        }
    }
}
