package com.fpmislata.banco.presentacion.security;

import com.fpmislata.banco.business.domain.Usuario;
import com.fpmislata.banco.core.BusinessException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Lliurex
 */
public interface LoginService {
     WebSession login(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Usuario usuario)
        throws BusinessException;
    WebSession logged(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)
        throws BusinessException;
    void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)
        throws BusinessException;
}
