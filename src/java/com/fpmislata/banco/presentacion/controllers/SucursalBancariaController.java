package com.fpmislata.banco.presentacion.controllers;

import com.fpmislata.banco.business.domain.SucursalBancaria;
import com.fpmislata.banco.business.service.SucursalBancariaService;
import com.fpmislata.banco.core.BusinessException;
import com.fpmislata.banco.core.BusinessMessage;
import com.fpmislata.banco.core.json.JsonTransformer;
import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Lliurex
 */
@Controller
public class SucursalBancariaController {

    @Autowired
    JsonTransformer jsonTransformer;
    @Autowired
    SucursalBancariaService sucursalBancariaService;

    @RequestMapping(value = "/sucursalbancaria/{idSucursalBancaria}", method = RequestMethod.GET, produces = "application/json")
    public void get(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @PathVariable("idSucursalBancaria") int idSucursalBancaria) {
        try {
            SucursalBancaria sucursalBancaria = sucursalBancariaService.get(idSucursalBancaria);
            String jsonSalida = jsonTransformer.objectToJson(sucursalBancaria);

            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            httpServletResponse.setContentType("application/json");
            httpServletResponse.getWriter().println(jsonSalida);
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    @RequestMapping(value = "/sucursalbancaria", method = RequestMethod.GET, produces = "application/json")
    public void findAll(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {

        try {
            List<SucursalBancaria> sucursalesBancarias;

            if (httpServletRequest.getParameter("entidadbancaria.idEntidadBancaria") != null) {
                int idEntidadBancaria = Integer.parseInt(httpServletRequest.getParameter("entidadbancaria.idEntidadBancaria"));
                sucursalesBancarias = sucursalBancariaService.getByEntidad(idEntidadBancaria);

            } else {
                sucursalesBancarias = sucursalBancariaService.findAll();

            }
            String jsonSalida = jsonTransformer.objectToJson(sucursalesBancarias);

            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            httpServletResponse.getWriter().println(jsonSalida);

        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    @RequestMapping(value = {"/sucursalbancaria"}, method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public void insert(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @RequestBody String jsonEntrada) {
        try {
            SucursalBancaria sucursalBancaria = (SucursalBancaria) jsonTransformer.jsonToObject(jsonEntrada, SucursalBancaria.class);
            sucursalBancariaService.insert(sucursalBancaria);

            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            httpServletResponse.getWriter().println(jsonTransformer.objectToJson(sucursalBancaria));
        } catch (BusinessException ex) {
            List<BusinessMessage> bussinessMessage = ex.getBusinessMessages();
            String jsonSalida = jsonTransformer.objectToJson(bussinessMessage);

            httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            try {
                httpServletResponse.getWriter().println(jsonSalida);
            } catch (IOException ex1) {
                Logger.getLogger(SucursalBancariaController.class.getName()).log(Level.SEVERE, "Error devolviendo Lista de Mensajes", ex1);
            }
        } catch (Exception ex1) {
            httpServletResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            httpServletResponse.setContentType("text/plain; charset=UTF-8");
            try {
                ex1.printStackTrace(httpServletResponse.getWriter());
            } catch (IOException ex2) {
                Logger.getLogger(SucursalBancariaController.class.getName()).log(Level.SEVERE, "Error devolviendo la traza", ex2);
            }
        }
    }

    @RequestMapping(value = {"/sucursalbancaria"}, method = RequestMethod.PUT, consumes = "application/json", produces = "application/json")
    public void update(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @RequestBody String jsonEntrada) {
        try {
            SucursalBancaria sucursalBancaria = (SucursalBancaria) jsonTransformer.jsonToObject(jsonEntrada, SucursalBancaria.class);
            sucursalBancariaService.update(sucursalBancaria);

            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            httpServletResponse.getWriter().println(jsonTransformer.objectToJson(sucursalBancaria));
        } catch (BusinessException ex) {
            List<BusinessMessage> bussinessMessage = ex.getBusinessMessages();
            String jsonSalida = jsonTransformer.objectToJson(bussinessMessage);

            httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            try {
                httpServletResponse.getWriter().println(jsonSalida);
            } catch (IOException ex1) {
                Logger.getLogger(SucursalBancariaController.class.getName()).log(Level.SEVERE, "Error devolviendo Lista de Mensajes", ex1);
            }
        } catch (Exception ex1) {
            httpServletResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            httpServletResponse.setContentType("text/plain; charset=UTF-8");
            try {
                ex1.printStackTrace(httpServletResponse.getWriter());
            } catch (IOException ex2) {
                Logger.getLogger(SucursalBancariaController.class.getName()).log(Level.SEVERE, "Error devolviendo la traza", ex2);
            }
        }
    }

    @RequestMapping(value = "/sucursalbancaria/{idSucursalBancaria}", method = RequestMethod.DELETE, produces = "application/json")
    public void delete(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @PathVariable("idSucursalBancaria") int idSucursalBancaria) {
        try {
            sucursalBancariaService.delete(idSucursalBancaria);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            httpServletResponse.setStatus(HttpServletResponse.SC_NO_CONTENT);

        } catch (BusinessException ex) {
            List<BusinessMessage> bussinessMessage = ex.getBusinessMessages();
            String jsonSalida = jsonTransformer.objectToJson(bussinessMessage);

            httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            try {
                httpServletResponse.getWriter().println(jsonSalida);
            } catch (IOException ex1) {
                Logger.getLogger(EntidadBancariaController.class.getName()).log(Level.SEVERE, "Error devolviendo Lista de Mensajes", ex1);
            }
        } catch (Exception ex1) {
            httpServletResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            httpServletResponse.setContentType("text/plain; charset=UTF-8");
            try {
                ex1.printStackTrace(httpServletResponse.getWriter());
            } catch (IOException ex2) {
                Logger.getLogger(EntidadBancariaController.class.getName()).log(Level.SEVERE, "Error devolviendo la traza", ex2);
            }
        }
    }

//    @RequestMapping(value = "/sucursalbancariabyentidad/{idEntidadBancaria}", method = RequestMethod.GET, produces = "application/json")
//    public void findBySucursal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @PathVariable("idEntidadBancaria") int idEntidadBancaria) {
//        try {
//            List<SucursalBancaria> sucursalesBancarias = sucursalBancariaService.getByEntidad(idEntidadBancaria);
//
//            String jsonSalida = jsonTransformer.objectToJson(sucursalesBancarias);
//
//            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
//            httpServletResponse.setContentType("application/json; charset=UTF-8");
//            httpServletResponse.getWriter().println(jsonSalida);
//
//        } catch (Exception ex) {
//            throw new RuntimeException(ex);
//        }
//    }
}
