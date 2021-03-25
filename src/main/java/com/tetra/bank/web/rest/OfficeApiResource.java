package com.tetra.bank.web.rest;

import com.tetra.bank.domain.Client;
import com.tetra.bank.domain.Office;
import com.tetra.bank.repository.OfficeRepository;
import com.tetra.bank.service.OfficeService;
import com.tetra.bank.service.dto.ClientDTO;
import com.tetra.bank.service.dto.OfficeDTO;
import com.tetra.bank.service.mapper.OfficeMapper;
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
import java.util.Optional;

/**
 * REST controller for managing offices.
 */
@RestController
@RequestMapping("/api")
public class OfficeApiResource {

    private final Logger log = LoggerFactory.getLogger(OfficeApiResource.class);

    private static final String ENTITY_NAME = "office";

    private final OfficeService officeService;

    private final OfficeRepository officeRepository;

    private final OfficeMapper officeMapper;

    public OfficeApiResource(OfficeService officeService, OfficeRepository officeRepository, OfficeMapper officeMapper) {
        this.officeService = officeService;
        this.officeRepository = officeRepository;
        this.officeMapper = officeMapper;
    }

    @GetMapping("/offices")
    public List<OfficeDTO> getAllOffices(){
        log.debug("REST request to get all offices");
        List<Office> offices = officeRepository.findAll();
        return officeMapper.toDto(offices);
    }

    @PostMapping("/offices")
    @Operation(summary = "Create an Office", description = "Note:\n\n"
            /*+ "1. You can enter either:firstname/middlename/lastname - for a person (middlename is optional) OR fullname - for a business or organisation (or person known by one name).\n"
            + "\n" + "2.If address is enable(enable-address=true), then additional field called address has to be passed.\n\n"
            + "Mandatory Fields: firstname and lastname OR fullname, officeId, active=true and activationDate OR active=false, if(address enabled) address\n\n"
            + "Optional Fields: groupId, externalId, accountNo, staffId, mobileNo, savingsProductId, genderId, clientTypeId, clientClassificationId"*/)

    public ResponseEntity<OfficeDTO> createOffice(@Valid @RequestBody OfficeDTO officeDTO) throws URISyntaxException {
        log.debug("REST request to save Office : {}", officeDTO);
        if (officeDTO.getId() != null) {
            throw new BadRequestAlertException("A new bankAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Office office = officeMapper.toEntity(officeDTO);
        if(officeDTO.getParentId() != null) {
            Optional<Office> parentOffice = officeRepository.findById(officeDTO.getParentId());
            office.setParent(parentOffice.isPresent() ? parentOffice.get() : null);
        }
        office = officeRepository.save(office);
        OfficeDTO result = officeMapper.toDto(office);
        return  ResponseEntity
                .created(new URI("/api/offices/" + result.getId()))
//                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }


}
