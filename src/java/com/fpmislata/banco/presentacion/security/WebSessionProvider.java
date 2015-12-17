package com.fpmislata.banco.presentacion.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Samuel La
 */
public interface WebSessionProvider {
    WebSession getWebSession(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse);
    void setWebSession(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, WebSession webSession);
}
