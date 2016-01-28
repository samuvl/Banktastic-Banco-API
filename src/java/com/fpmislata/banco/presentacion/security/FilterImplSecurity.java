package com.fpmislata.banco.presentacion.security;

import com.fpmislata.banco.business.domain.Usuario;
import com.fpmislata.banco.security.Authorization;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class FilterImplSecurity implements Filter {

    @Autowired
    WebSessionProvider webSessionProvider;

    @Autowired
    Authorization authorization;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;

        WebApplicationContext webApplicationContext = WebApplicationContextUtils.getRequiredWebApplicationContext(httpServletRequest.getServletContext());
        AutowireCapableBeanFactory autowireCapableBeanFactory = webApplicationContext.getAutowireCapableBeanFactory();
        autowireCapableBeanFactory.autowireBean(this);

        WebSession webSession = webSessionProvider.getWebSession(httpServletRequest, httpServletResponse);

        System.out.println("SESION FILTRO " + webSession);

        Usuario usuario;

        if (webSession != null) {
            usuario = webSession.getUsuario();
        } else {
            usuario = null;
            Logger.getLogger(FilterImplSecurity.class.getName()).log(Level.SEVERE, "No hay sesión");
        }
        System.out.println("USUARIO FILTRO " + usuario);

        if (authorization.isAuthorizedURL(usuario, httpServletRequest.getRequestURI(), httpServletRequest.getMethod())) {
            filterChain.doFilter(servletRequest, servletResponse);
        } else {
            httpServletResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);
        }

    }

    @Override
    public void destroy() {
    }

}
