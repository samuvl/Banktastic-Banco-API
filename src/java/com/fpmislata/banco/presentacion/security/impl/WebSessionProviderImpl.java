package com.fpmislata.banco.presentacion.security.impl;

import com.fpmislata.banco.presentacion.security.WebSession;
import com.fpmislata.banco.presentacion.security.WebSessionProvider;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Samuel Lao
 */
public class WebSessionProviderImpl implements WebSessionProvider {

    @Override
    public WebSession getWebSession(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {

        HttpSession httpSession = httpServletRequest.getSession();
        WebSession webSession = (WebSession) httpSession.getAttribute("webSession");

        return webSession;
    }
    
     @Override
    public void setWebSession(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, WebSession webSession) {
        httpServletRequest.getSession().setAttribute("webSession", webSession);
    }

}
