package com.url.service;

import org.springframework.stereotype.Service;

@Service
public class URLShortenerService {

    private static final String BASE62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public String encode(long id){

        StringBuilder sb = new StringBuilder();
        while(id > 0){
            sb.append(BASE62.charAt((int) (id%62)));
            id /= 62;
        }

        return sb.reverse().toString();
    }

    public long decode(String shortUrl) {
        long id = 0L;
        for (char c : shortUrl.toCharArray()) {
            id = id * 62 + BASE62.indexOf(c);
        }
        return id;
    }
}
