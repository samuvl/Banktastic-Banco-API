package com.fpmislata.banco.presentacion.security;

import com.fpmislata.banco.business.domain.Usuario;
import java.util.Date;

/**
 *
 * @author Samuel Lao
 */
public class WebSession {

    private Usuario user;
    private Date fecha;

    public WebSession(){
        
    }
    
    public WebSession(Usuario user, Date fecha) {
        this.user = user;
        this.fecha = fecha;
    }

    public Usuario getUser() {
        return user;
    }

    public void setUser(Usuario user) {
        this.user = user;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

}
