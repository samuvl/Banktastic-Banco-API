package com.fpmislata.banco.presentacion.json.implementacion;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpmislata.banco.presentacion.json.JsonTransformer;
import java.io.IOException;

/**
 *
 * @author Samuel Lao
 */
public class JsonTransformerImplJackson implements JsonTransformer {

    @Override
    public String objectToJson(Object o) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            return objectMapper.writeValueAsString(o);
        } catch (JsonProcessingException ex) {
            throw new RuntimeException(ex);
        }
    }

    @Override
    public <T> T jsonToObject(String json, Class <T> clazz) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            return objectMapper.readValue(json, clazz);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    
    }

}
