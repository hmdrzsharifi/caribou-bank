package com.tetra.bank.service.mapper;


import com.tetra.bank.domain.Office;
import com.tetra.bank.service.dto.OfficeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

//@Mapper(componentModel = "spring", uses = { UserMapper.class })
@Mapper(componentModel = "spring", uses = {})
public interface OfficeMapper extends EntityMapper<OfficeDTO, Office> {
    @Mapping(source = "parent.id", target = "parentId")
    OfficeDTO toDto(Office office);

    @Mapping(target = "children", ignore = true)
    @Mapping(target = "removeChildren", ignore = true)
    @Mapping(source = "parentId", target = "parent")
    Office toEntity(OfficeDTO officeDTO);

    default Office fromId(Long id) {
        if (id == null) {
            return null;
        }
        Office office = new Office();
        office.setId(id);
        return office;
    }
}
