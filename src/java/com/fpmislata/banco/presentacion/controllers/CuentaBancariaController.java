package com.fpmislata.banco.presentacion.controllers;

import com.fpmislata.banco.business.domain.CuentaBancaria;
import com.fpmislata.banco.business.service.CuentaBancariaService;
import com.fpmislata.banco.business.service.MovimientoBancarioService;
import com.fpmislata.banco.business.service.UsuarioService;
import com.fpmislata.banco.core.BusinessException;
import com.fpmislata.banco.core.BusinessMessage;
import com.fpmislata.banco.presentacion.json.JsonTransformer;
import java.io.IOException;
import static java.lang.Integer.parseInt;
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

@Controller
public class CuentaBancariaController {

    @Autowired
    CuentaBancariaService cuentaBancariaService;

    @Autowired
    MovimientoBancarioService movimientoBancarioService;
 
    @Autowired
    UsuarioService usuarioService;

    @Autowired
    JsonTransformer jsonTransformer;

    @RequestMapping(value = {"/cuentabancaria/{idCuentaBancaria}"}, method = RequestMethod.GET, produces = "application/json")
    public void get(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @PathVariable("idCuentaBancaria") int idCuentaBancaria) {
        try {
            CuentaBancaria cuentaBancaria = cuentaBancariaService.get(idCuentaBancaria);

            String jsonSalida = jsonTransformer.objectToJson(cuentaBancaria);

            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            httpServletResponse.setContentType("application/json");
            httpServletResponse.getWriter().println(jsonSalida);

        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    @RequestMapping(value = "/cuentabancaria", method = RequestMethod.GET, produces = "application/json")
    public void find(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        try {
            List<CuentaBancaria> cuentasBancarias;
            if (httpServletRequest.getParameter("sucursalbancaria.idSucursalBancaria") != null && httpServletRequest.getParameter("usuario.dni") == null && httpServletRequest.getParameter("usuario.idUsuario") == null) {
                int idSucursalBancaria = parseInt(httpServletRequest.getParameter("sucursalbancaria.idSucursalBancaria"));
                cuentasBancarias = cuentaBancariaService.findBySucursal(idSucursalBancaria);

            } else if (httpServletRequest.getParameter("usuario.dni") != null && httpServletRequest.getParameter("sucursalBancaria.idSucursalBancaria") == null && httpServletRequest.getParameter("usuario.idUsuario") == null) {
                String dni = httpServletRequest.getParameter("usuario.dni");
                cuentasBancarias = cuentaBancariaService.findByDni(dni);

            } else if (httpServletRequest.getParameter("usuario.idUsuario") != null && httpServletRequest.getParameter("usuario.dni") == null && httpServletRequest.getParameter("sucursalBancaria.idSucursalBancaria") == null) {
                int idUsuario = parseInt(httpServletRequest.getParameter("usuario.idUsuario"));
                cuentasBancarias = cuentaBancariaService.findByUsuario(idUsuario);
 
            } else if (httpServletRequest.getParameter("usuario.dni") == null && httpServletRequest.getParameter("sucursalBancaria.idSucursalBancaria") == null && httpServletRequest.getParameter("usuario.idUsuario") == null) {
                cuentasBancarias = cuentaBancariaService.findAll();

            } else if (httpServletRequest.getParameter("usuario.dni") == null ) {
                throw new BusinessException("DNI", "Introduzca un DNI.");
                
            } else {
                throw new BusinessException("Error", "Sólo se necesita 1 parámetro.");
            }
 
            String jsonSalida = jsonTransformer.objectToJson(cuentasBancarias);

            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            httpServletResponse.getWriter().println(jsonSalida);

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

    @RequestMapping(value = {"/cuentabancaria"}, method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public void insert(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @RequestBody String jsonEntrada) {
        try {
            //System.out.println(jsonEntrada);
            CuentaBancaria cuentaBancaria = (CuentaBancaria) jsonTransformer.jsonToObject(jsonEntrada, CuentaBancaria.class);
            cuentaBancariaService.insert(cuentaBancaria);

            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            httpServletResponse.getWriter().println(jsonTransformer.objectToJson(cuentaBancaria));

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

    @RequestMapping(value = {"/cuentabancaria"}, method = RequestMethod.PUT, consumes = "application/json", produces = "application/json")
    public void update(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @RequestBody String jsonEntrada) {
        try {

            CuentaBancaria cuentaBancaria = (CuentaBancaria) jsonTransformer.jsonToObject(jsonEntrada, CuentaBancaria.class);
            cuentaBancariaService.update(cuentaBancaria);

            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            httpServletResponse.getWriter().println(jsonTransformer.objectToJson(cuentaBancaria));

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

    @RequestMapping(value = "/cuentabancaria/{idCuentaBancaria}", method = RequestMethod.DELETE, produces = "application/json")
    public void delete(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @PathVariable("idCuentaBancaria") int idCuentaBancaria) {
        try {
            cuentaBancariaService.delete(idCuentaBancaria);
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

    /*
    @RequestMapping(value = "/cuentabancariabysucursal/{idSucursalBancaria}", method = RequestMethod.GET, produces = "application/json")
    public void findBySucursal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @PathVariable("idSucursalBancaria") int idSucursalBancaria) {
        try {
            List<CuentaBancaria> cuentasBancarias = cuentaBancariaService.getBySucursal(idSucursalBancaria);

            String jsonSalida = jsonTransformer.objectToJson(cuentasBancarias);

            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            httpServletResponse.getWriter().println(jsonSalida);

        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
    
    @RequestMapping(value = "/cuentabancariabydni/{dni}", method = RequestMethod.GET, produces = "application/json")
    public void findByDni(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @PathVariable("dni") String dni) {
        try {
            //obtenemos los los usuarios llamando al usuariservice.getByDni(dni) que acabo de crear
            Usuario usuario = usuarioService.getByDni(dni);

            //aprovecho el getByUsuario que has creado tu para sacar las cuentas
            List<CuentaBancaria> cuentasBancarias = cuentaBancariaService.getByUsuario(usuario.getIdUsuario());

            String jsonSalida = jsonTransformer.objectToJson(cuentasBancarias);

            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            httpServletResponse.getWriter().println(jsonSalida);

        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
    /*
    @RequestMapping(value = "/cuentabancariabyusuario/{idUsuario}", method = RequestMethod.GET, produces = "application/json")
    public void findByUsuario(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @PathVariable("idUsuario") int idUsuario) {
        try {
            List<CuentaBancaria> cuentasBancarias = cuentaBancariaService.getByUsuario(idUsuario);

            String jsonSalida = jsonTransformer.objectToJson(cuentasBancarias);

            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            httpServletResponse.getWriter().println(jsonSalida);

        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
     


    @RequestMapping(value = "/cuentabancariabyusuario/{idUsuario}", method = RequestMethod.GET, produces = "application/json")
    public void findByUsuario(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @PathVariable("idUsuario") int idUsuario) {
        try {
            List<CuentaBancaria> cuentasBancarias = cuentaBancariaService.getByUsuario(idUsuario);

            String jsonSalida = jsonTransformer.objectToJson(cuentasBancarias);

            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            httpServletResponse.getWriter().println(jsonSalida);

        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    */
}
