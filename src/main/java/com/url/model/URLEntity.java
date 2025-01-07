package com.url.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class URLEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String longUrl;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime expiryAt;

    public URLEntity(String longUrl){
        LocalDateTime cur = LocalDateTime.now();

        this.longUrl = longUrl;
        this.createdAt = cur;
        this.expiryAt = cur.plusDays(7);
    }
}
