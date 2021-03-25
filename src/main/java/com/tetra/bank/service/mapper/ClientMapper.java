package com.tetra.bank.service.mapper;

import com.tetra.bank.domain.Client;
import com.tetra.bank.service.dto.ClientDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface ClientMapper extends EntityMapper<ClientDTO, Client>{
}
