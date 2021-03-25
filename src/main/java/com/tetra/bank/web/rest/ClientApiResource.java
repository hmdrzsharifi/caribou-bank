package com.tetra.bank.web.rest;

import com.tetra.bank.domain.Client;
import com.tetra.bank.repository.ClientRepository;
import com.tetra.bank.service.dto.ClientDTO;
import com.tetra.bank.service.mapper.ClientMapper;
import com.tetra.bank.web.rest.errors.BadRequestAlertException;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ClientApiResource {

    private final Logger log = LoggerFactory.getLogger(ClientApiResource.class);
    private static final String ENTITY_NAME = "client";

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    public ClientApiResource(ClientRepository clientRepository, ClientMapper clientMapper) {
        this.clientRepository = clientRepository;
        this.clientMapper = clientMapper;
    }

    @PostMapping("/clients")
    @Operation(summary = "Create a Client", description = "Note:\n\n"
            /*+ "1. You can enter either:firstname/middlename/lastname - for a person (middlename is optional) OR fullname - for a business or organisation (or person known by one name).\n"
            + "\n" + "2.If address is enable(enable-address=true), then additional field called address has to be passed.\n\n"
            + "Mandatory Fields: firstname and lastname OR fullname, officeId, active=true and activationDate OR active=false, if(address enabled) address\n\n"
            + "Optional Fields: groupId, externalId, accountNo, staffId, mobileNo, savingsProductId, genderId, clientTypeId, clientClassificationId"*/)
    public ResponseEntity<ClientDTO> createClient(@Valid @RequestBody ClientDTO clientDto) throws URISyntaxException {
        log.debug("REST request to save Client : {}", clientDto);
        if (clientDto.getId() != null) {
            throw new BadRequestAlertException("A new bankAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Client client = clientMapper.toEntity(clientDto);
        client = clientRepository.save(client);
        ClientDTO result = clientMapper.toDto(client);
        return ResponseEntity
                .created(new URI(""))
                .body(result);
    }

    @GetMapping("clients")
    public List<ClientDTO> getAllClients(){
        log.debug("REST request to get all clients");
        List<Client> clients = clientRepository.findAll();
        return clientMapper.toDto(clients);
    }
}
