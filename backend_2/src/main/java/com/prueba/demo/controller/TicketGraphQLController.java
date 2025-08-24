package com.prueba.demo.controller;

import com.prueba.demo.model.Ticket;
import com.prueba.demo.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class TicketGraphQLController {

    @Autowired
    private TicketService ticketService;

    @QueryMapping
    public List<Ticket> getAllTickets(@Argument int page, @Argument int size) {
        return ticketService.getAllTickets(page, size).getContent();
    }

    @QueryMapping
    public Ticket getTicketById(@Argument Long id) {
        return ticketService.getTicketById(id).orElse(null);
    }

    @MutationMapping
    public Ticket createTicket(@Argument String usuario, @Argument Ticket.Estatus estatus) {
        Ticket ticket = Ticket.builder()
                .usuario(usuario)
                .estatus(estatus)
                .build();
        return ticketService.createTicket(ticket);
    }

    @MutationMapping
    public Ticket updateTicket(@Argument Long id, @Argument String usuario, @Argument Ticket.Estatus estatus) {
        Ticket t = new Ticket();
        t.setUsuario(usuario);
        t.setEstatus(estatus);
        return ticketService.updateTicket(id, t);
    }

    @MutationMapping
    public Boolean deleteTicket(@Argument Long id) {
        return ticketService.deleteTicket(id);
    }
}
