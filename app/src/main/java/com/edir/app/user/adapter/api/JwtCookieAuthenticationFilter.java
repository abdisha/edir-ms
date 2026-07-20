package com.edir.app.user.adapter.api;

import com.edir.app.user.adapter.security.SecurityUser;
import com.edir.app.user.adapter.utils.CookieUtils;
import com.edir.app.user.application.AccountService;
import com.edir.app.user.application.TokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.modulith.NamedInterface;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@NamedInterface
@Component
public class JwtCookieAuthenticationFilter extends OncePerRequestFilter {
    private final TokenProvider tokenProviderPort;
    private final AccountService accountOutputPort;

    public JwtCookieAuthenticationFilter(TokenProvider tokenProviderPort, AccountService accountOutputPort) {
        this.tokenProviderPort = tokenProviderPort;
        this.accountOutputPort = accountOutputPort;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {

        CookieUtils.extractJwtFromCookie(request).ifPresent(token -> {
            tokenProviderPort.extractEmail(token).ifPresent(email -> {
                if (SecurityContextHolder.getContext().getAuthentication() == null) {
                    accountOutputPort.findByEmail(email).ifPresent(user -> {
                        if (tokenProviderPort.validateToken(token, user.getEmail())) {

                            SecurityUser securityUser = new SecurityUser(user);
                            UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(securityUser, null, securityUser.getAuthorities());

                            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                        }
                    });
                }
            });
        });

        filterChain.doFilter(request, response);
    }
}
