package com.fpmislata.banco.presentacion.controllers;

import com.fpmislata.banco.business.domain.CuentaBancaria;
import com.fpmislata.banco.business.domain.MovimientoBancario;
import com.fpmislata.banco.business.domain.RolMovimiento;
import com.fpmislata.banco.business.service.CuentaBancariaService;
import com.fpmislata.banco.business.service.MovimientoBancarioService;
import com.fpmislata.banco.core.BusinessException;
import com.fpmislata.banco.core.BusinessMessage;
import com.fpmislata.banco.core.json.JsonTransformer;
import java.io.IOException;
import java.math.BigDecimal;
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
public class MovimientoBancarioController {

    @Autowired
    CuentaBancariaService cuentaBancariaService;

    @Autowired
    MovimientoBancarioService movimientoBancarioService;

    @Autowired
    JsonTransformer jsonTransformer;

    private boolean updateSaldoCuenta(HttpServletResponse httpServletResponse, MovimientoBancario movimientoBancario) {
        try {
            if (movimientoBancario != null) {
                int idCuentaBancaria = movimientoBancario.getCuentaBancaria().getIdCuentaBancaria();
                if (idCuentaBancaria != 0) {
                    CuentaBancaria cuentaBancaria = cuentaBancariaService.get(idCuentaBancaria);
                    BigDecimal saldoNuevo = movimientoBancario.getImporte();
                    BigDecimal saldoViejo = cuentaBancaria.getSaldo();

                    if (movimientoBancario.getTipoMovimiento() == RolMovimiento.debe) {
                        saldoNuevo = saldoNuevo.multiply(new BigDecimal(-1));
                    }
                    saldoNuevo = saldoViejo.add(saldoNuevo);
                    if (saldoNuevo.compareTo(BigDecimal.ZERO) > 0) {
                        cuentaBancaria.setSaldo(saldoNuevo);
                        cuentaBancariaService.update(cuentaBancaria);
                        return true;
                    }
                } else {
                    throw new BusinessException("MovimientoBancario", "Ha ocurrido un error. NULL.");
                }
            }
        } catch (BusinessException ex) {
            List<BusinessMessage> bussinessMessage = ex.getBusinessMessages();
            String jsonSalida = jsonTransformer.objectToJson(bussinessMessage);

            httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            try {
                httpServletResponse.getWriter().println(jsonSalida);
            } catch (IOException ex1) {
                Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, "Error devolviendo Lista de Mensajes", ex1);
            }
        } catch (Exception ex1) {
            httpServletResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            httpServletResponse.setContentType("text/plain; charset=UTF-8");
            try {
                ex1.printStackTrace(httpServletResponse.getWriter());
            } catch (IOException ex2) {
                Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, "Error devolviendo la traza", ex2);
            }
        }
        return false;
    }

    @RequestMapping(value = {"/movimientobancario"}, method = RequestMethod.POST)
    public void insert(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @RequestBody String jsonEntrada) throws IOException {
        try {
            
            MovimientoBancario movimientoBancario = (MovimientoBancario) jsonTransformer.jsonToObject(jsonEntrada, MovimientoBancario.class);
           
            
            if(movimientoBancario.getImporte().compareTo(BigDecimal.ZERO)<=0){
            throw new BusinessException("Importe","el importe introducido tiene que ser mayor de 0");
            }else{
            //seguimos con la ejecución
            }
          
            if (updateSaldoCuenta(httpServletResponse, movimientoBancario)) {
                movimientoBancarioService.insert(movimientoBancario);
                httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            } else {
                throw new BusinessException("Saldo", "El saldo solicitado es mayor que el existente en la cuenta actualmente.");
            }

        } catch (BusinessException ex) {
            List<BusinessMessage> bussinessMessage = ex.getBusinessMessages();
            String jsonSalida = jsonTransformer.objectToJson(bussinessMessage);
            //System.out.println(jsonSalida);

            httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            try {
                httpServletResponse.getWriter().println(jsonSalida);
            } catch (IOException ex1) {
                Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, "Error devolviendo Lista de Mensajes", ex1);
            }
        } catch (Exception ex1) {
            httpServletResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            httpServletResponse.setContentType("text/plain; charset=UTF-8");
            
            try {
                ex1.printStackTrace(httpServletResponse.getWriter());
            } catch (IOException ex2) {
                Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, "Error devolviendo la traza", ex2);
            }
        }
    }

    @RequestMapping(value = {"/movimientobancario"})
    public void findAll(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException {
        try {
            List<MovimientoBancario> movimientosBancarios = movimientoBancarioService.findAll();
            httpServletResponse.getWriter().println(jsonTransformer.objectToJson(movimientosBancarios));
            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    @RequestMapping(value = {"/movimientobancario/{idCuentaBancaria}"}, method = RequestMethod.GET)
    public void getByIdCuenta(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @PathVariable("idCuentaBancaria") int idCuentaBancaria) {
        try {
            CuentaBancaria cuentaBancaria = new CuentaBancaria();
            cuentaBancaria.setIdCuentaBancaria(idCuentaBancaria);
            
            httpServletRequest.setAttribute("CuentaBancaria", cuentaBancaria);//lo meto en la cabecera
            //para después recuperarlo en el insert
            
            List<MovimientoBancario> movimientoBancario = movimientoBancarioService.getByIdCuenta(cuentaBancaria);
            String jsonSalida = jsonTransformer.objectToJson(movimientoBancario);

            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            httpServletResponse.setContentType("application/json");
            httpServletResponse.getWriter().println(jsonSalida);

        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

}
