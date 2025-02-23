package com.url.service;

import com.url.model.URLEntity;
import com.url.repository.URLRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class URLService {

    private final URLRepository urlRepository;
    private final URLShortenerService coder;

    public URLService(URLRepository urlRepository,URLShortenerService encoder){
        this.urlRepository = urlRepository;
        this.coder = encoder;
    }

    public String shorten(String longUrl) throws Exception{

        try {

            URLEntity savedUrl = urlRepository.save(new URLEntity(longUrl));
            return coder.encode(savedUrl.getId());
        } catch (Exception e) {
            throw new Exception("Unable to shorten the URL!");
        }

    }

    public String getLongUrl(String shortUrl) throws Exception{
        long id = coder.decode(shortUrl);

        Optional<URLEntity> urlEn = urlRepository.findById(id);

        if(urlEn.isEmpty() || urlEn.get().getExpiryAt().isBefore(LocalDateTime.now())) throw new Exception("The Short Url expired!");

        return urlEn.get().getLongUrl();
    }
}
