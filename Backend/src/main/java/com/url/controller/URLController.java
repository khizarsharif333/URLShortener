package com.url.controller;


import com.url.service.URLService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@CrossOrigin(origins = "${front-end-url}")
public class URLController {

    private final URLService urlService;

    public URLController(URLService urlService){
        this.urlService = urlService;
    }

    @PostMapping("/shorten")
    public ResponseEntity<String> shortenUrl(@RequestParam String longUrl){
        try{
            return new ResponseEntity<>(urlService.shorten(longUrl),HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{shortUrl}")
    public RedirectView redirect(@PathVariable String shortUrl) {
        String longUrl = null;
        try {
            longUrl = urlService.getLongUrl(shortUrl);
        } catch (Exception e) {
            longUrl = "https://www.google.com";
        }
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(longUrl);
        return redirectView;
    }
}
