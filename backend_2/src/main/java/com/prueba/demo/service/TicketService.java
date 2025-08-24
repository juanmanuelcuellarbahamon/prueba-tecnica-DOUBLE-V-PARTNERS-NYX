package com.prueba.demo.service;

import com.prueba.demo.model.Ticket;
import com.prueba.demo.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public Page<Ticket> getAllTickets(int page, int size) {
        return ticketRepository.findAll(PageRequest.of(page, size));
    }

    public Optional<Ticket> getTicketById(Long id) {
        return ticketRepository.findById(id);
    }

    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public Ticket updateTicket(Long id, Ticket ticketDetails) {
        return ticketRepository.findById(id).map(ticket -> {
            ticket.setUsuario(ticketDetails.getUsuario());
            ticket.setEstatus(ticketDetails.getEstatus());
            return ticketRepository.save(ticket);
        }).orElseThrow(() -> new RuntimeException("Ticket no encontrado"));
    }

    public boolean deleteTicket(Long id) {
        return ticketRepository.findById(id).map(ticket -> {
            ticketRepository.delete(ticket);
            return true;
        }).orElse(false);
    }
}
