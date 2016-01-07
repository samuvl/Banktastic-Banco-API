package com.fpmislata.banco.presentacion.controllers;

import com.fpmislata.banco.business.domain.Usuario;
import com.fpmislata.banco.business.service.UsuarioService;
import com.fpmislata.banco.core.BusinessException;
import com.fpmislata.banco.core.BusinessMessage;
import com.fpmislata.banco.presentacion.json.JsonTransformer;
import com.fpmislata.banco.presentacion.security.LoginService;
import com.fpmislata.banco.presentacion.security.WebSession;
import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Samuel Lao
 */
@Controller
public class LoginController {

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    LoginService loginService;

    @Autowired
    JsonTransformer jsonTransformer;

    @RequestMapping(value = {"/session"}, method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public void login(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @RequestBody String jsonEntrada) {
        try {
            Usuario usuario = (Usuario) jsonTransformer.jsonToObject(jsonEntrada, Usuario.class);
            WebSession webSession = loginService.login(httpServletRequest, httpServletResponse, usuario);

            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            httpServletResponse.getWriter().println(jsonTransformer.objectToJson(webSession));

        } catch (BusinessException ex) {
            List<BusinessMessage> bussinessMessage = ex.getBusinessMessages();

            String jsonSalida = jsonTransformer.objectToJson(bussinessMessage);

            httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            try {
                httpServletResponse.getWriter().println(jsonSalida);
            } catch (IOException ex1) {
                Logger.getLogger(LoginController.class.getName()).log(Level.SEVERE, "Error devolviendo Lista de Mensajes", ex1);
            }
        } catch (Exception ex1) {
            httpServletResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            httpServletResponse.setContentType("text/plain; charset=UTF-8");
            try {
                ex1.printStackTrace(httpServletResponse.getWriter());
            } catch (IOException ex2) {
                Logger.getLogger(LoginController.class.getName()).log(Level.SEVERE, "Error devolviendo la traza", ex2);
            }
        }
    }

    @RequestMapping(value = {"/session"}, method = RequestMethod.DELETE)
    public void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        try {
            loginService.logout(httpServletRequest, httpServletResponse);

        } catch (Exception ex1) {
            httpServletResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Logger.getLogger(LoginController.class.getName()).log(Level.SEVERE, "Error devolviendo la traza", ex1);
        }
    }

    @RequestMapping(value = {"/session"}, method = RequestMethod.GET, consumes = "application/json", produces = "application/json")
    public void logged(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @RequestBody String jsonEntrada) {
        try {
            WebSession webSession = loginService.logged(httpServletRequest, httpServletResponse);

            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            httpServletResponse.getWriter().println(jsonTransformer.objectToJson(webSession));

        } catch (BusinessException ex) {
            List<BusinessMessage> bussinessMessage = ex.getBusinessMessages();

            String jsonSalida = jsonTransformer.objectToJson(bussinessMessage);

            httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            httpServletResponse.setContentType("application/json; charset=UTF-8");

            try {
                httpServletResponse.getWriter().println(jsonSalida);
            } catch (IOException ex1) {
                Logger.getLogger(LoginController.class.getName()).log(Level.SEVERE, "Error devolviendo Lista de Mensajes", ex1);
            }
        } catch (Exception ex1) {
            httpServletResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            httpServletResponse.setContentType("text/plain; charset=UTF-8");
            try {
                ex1.printStackTrace(httpServletResponse.getWriter());
            } catch (IOException ex2) {
                Logger.getLogger(LoginController.class.getName()).log(Level.SEVERE, "Error devolviendo la traza", ex2);
            }
        }

    }
}
