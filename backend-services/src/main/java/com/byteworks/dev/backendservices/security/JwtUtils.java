package com.byteworks.dev.backendservices.security;


import com.byteworks.dev.backendservices.entities.User;
import com.byteworks.dev.backendservices.exceptions.ValidationException;
import com.byteworks.dev.backendservices.repositories.UserRepository;
import com.byteworks.dev.backendservices.utils.LocalStorage;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtUtils {

        private final LocalStorage memStorage;
        private final UserRepository userRepository;

        @Value("${app.jwt_secret: defaultTokenSecret}")
        private String JWT_SECRET;

        public String extractUsername(String token){
            return extractClaim(token, Claims::getSubject);
        }

        public Date extractExpiration(String token) {
            return extractClaim(token, Claims::getExpiration);
        }
        public boolean hasClaim(String token, String claimName){
            final Claims claims = extractAllClaims(token);
            return claims.get(claimName) != null;
        }
        public Object getClaim(String token, String claimName){
            final Claims claims = extractAllClaims(token);
            return claims.get(claimName) ;
        }
        public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
            final Claims claims = extractAllClaims(token);
            return claimsResolver.apply(claims);
        }
        private Claims extractAllClaims(String token) {
            Claims claims;
            try {
                claims = Jwts
                        .parser()
                        .setSigningKey(JWT_SECRET)
                        .parseClaimsJws(token)
                        .getBody();
            } catch (JwtException e) {
                throw new JwtException(e.getMessage());
            }
            return claims;
        }

        public Boolean isTokenExpired(String token) {
            return extractExpiration(token).before(new Date());
        }

        public String generateToken(UserDetails userDetails) {
            Map<String, Object> claims = new HashMap<>();
            User user = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new ValidationException("error generating token"));
            claims.put("userId", user.getUuid());
            claims.put("roles", userDetails.getAuthorities().stream().map(Objects::toString)
                    .collect(Collectors.joining(",")));
           return createToken(claims, userDetails.getUsername());
        }
        private String createToken(Map<String, Object> claims, String email) {
            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(email)
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                    .signWith(SignatureAlgorithm.HS256, JWT_SECRET).compact();
        }

        public Boolean isTokenValid(String token, UserDetails userDetails) {
            final String username = extractUsername(token);
            if (memStorage.keyExist("Blacklist")) {
                String[] blacklistTokens = memStorage.getValueByKey("Blacklist").split(" ,");
                Set<String> blacklists = Arrays.stream(blacklistTokens).collect(Collectors.toSet());
                if (blacklists.contains(token)) {
                    return false;
                }
            }
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        }
}
