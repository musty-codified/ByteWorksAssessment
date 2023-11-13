package com.byteworks.dev.backendservices.utils;


import lombok.RequiredArgsConstructor;
import net.rubyeye.xmemcached.MemcachedClient;
import net.rubyeye.xmemcached.exception.MemcachedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeoutException;

@Component
@RequiredArgsConstructor
public class LocalStorage {
    private final MemcachedClient memcachedClient;
   private static final Logger LOGGER = LoggerFactory.getLogger(LocalStorage.class);

    public void save(String key, String value, int expiryInSeconds) {

        try {

            memcachedClient.set(key, expiryInSeconds, value);

        } catch (TimeoutException | InterruptedException | MemcachedException e) {
            e.printStackTrace();
            LOGGER.info("Memcached encountered an error : {}", e.getMessage());
        }

    }

    public String getValueByKey(String key) {
        try {
            return memcachedClient.get(key);
        } catch (Exception e) {
            return null;
        }
    }

    public Boolean keyExist(String key) {
        try {
            return memcachedClient.get(key)!=null;
        } catch (Exception e) {
            return null;
        }
    }

    public void clear(String key) {
        try {
            memcachedClient.delete(key);
        } catch (TimeoutException | InterruptedException | MemcachedException e) {
            e.printStackTrace();
            LOGGER.info("Memcached encountered an error : {}",e.getMessage());
        }

    }
}
