package com.fpmislata.banco.presentacion.security.impl;

import com.fpmislata.banco.business.domain.Usuario;
import com.fpmislata.banco.business.service.UsuarioService;
import com.fpmislata.banco.core.BusinessException;
import com.fpmislata.banco.presentacion.security.LoginService;
import com.fpmislata.banco.presentacion.security.WebSession;
import com.fpmislata.banco.presentacion.security.WebSessionProvider;
import com.fpmislata.banco.security.PasswordManager;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author Lliurex
 */
public class LoginServiceImpl implements LoginService {

    @Autowired
    WebSessionProvider webSessionProvider;
    
    @Autowired
    UsuarioService usuarioService;

    @Autowired
    PasswordManager passwordManager;

    @Override
    public WebSession login(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Usuario usuario) throws BusinessException {
        WebSession webSession;
       
        Usuario usuarioNickComprobado = usuarioService.getByNick(usuario.getNick());
        System.out.println(usuarioNickComprobado.getNick());
        
        if (passwordManager.check(usuario.getPassword(), usuarioNickComprobado.getPassword())) {
            webSession = new WebSession(usuarioNickComprobado, new Date());
            webSessionProvider.setWebSession(httpServletRequest, httpServletResponse, webSession);

        } else {
            throw new BusinessException("Error: ", "Usuario/ Contraseña incorrecta.");
        }
        return webSession;
    }

    @Override
    public WebSession logged(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws BusinessException {

        WebSession webSession = webSessionProvider.getWebSession(httpServletRequest, httpServletResponse);

        if (webSession != null) {
            return webSession;
        } else {
            throw new BusinessException("Sesión: ", "No existe.");
        }
    }

    @Override
    public void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws BusinessException {
        webSessionProvider.setWebSession(httpServletRequest, httpServletResponse, null);
        httpServletResponse.setStatus(HttpServletResponse.SC_NO_CONTENT);
    }

}
