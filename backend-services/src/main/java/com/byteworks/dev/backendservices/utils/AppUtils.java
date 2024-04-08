package com.byteworks.dev.backendservices.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import java.util.Hashtable;
import java.util.Random;


@Component
public class AppUtils {
    private final Random RANDOM = new Random();
    private static final Logger LOGGER = LoggerFactory.getLogger(AppUtils.class);

    public String getString( Object o){
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(o);
        } catch (Exception ex){
            ex.printStackTrace();
            return null;

        }
    }

    public  String generateSerialNumber(String prefix) {
        Random rand = new Random();
        long x = (long)(rand.nextDouble()*100000000000000L);
        return  prefix + String.format("%014d", x);
    }


    public boolean validEmail(String email) {
        String regex = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
        return email.matches(regex);
    }

    public Long generateOTP(){
        Random rnd = new Random();
        Long number = (long) rnd.nextInt(999999);
        return number;
    }

    public  Object getObject(String content, Class cls){
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(content,cls);
        }catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }

    public void print(Object obj){
        try {
            LOGGER.info(new ObjectMapper().writeValueAsString(obj));
        }
        catch (Exception ex){
            ex.printStackTrace();
        }
    }
    public ObjectMapper getMapper(){
        ObjectMapper mapper= new ObjectMapper();
        return mapper;
    }

    public void isEmailDomainValid(String email) {
        try {
            String domain = email.substring(email.lastIndexOf('@') + 1);
            int result = doDNSLookup(domain);
            LOGGER.info("Domain: " + domain);
            LOGGER.info("Result of domain: " + result);
        } catch (NamingException e) {
            LOGGER.error(e.getMessage());
        }
    }

    public int doDNSLookup(String hostName) throws NamingException {
        Hashtable<String, String> env = new Hashtable<>();
        env.put("java.naming.factory.initial", "com.sun.jndi.dns.DnsContextFactory");
        DirContext ictx = new InitialDirContext( env );
        Attributes attrs = ictx.getAttributes( hostName, new String[] { "MX" });
        Attribute attr = attrs.get( "MX" );
        if( attr == null ) return( 0 );
        return( attr.size() );
    }


}
