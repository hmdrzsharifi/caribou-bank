package com.tetra.bank.service.mapper;


import com.tetra.bank.domain.Office;
import com.tetra.bank.service.dto.OfficeDTO;
import org.mapstruct.Mapper;

//@Mapper(componentModel = "spring", uses = { UserMapper.class })
@Mapper(componentModel = "spring", uses = {})
public interface OfficeMapper extends EntityMapper<OfficeDTO, Office> {

}
