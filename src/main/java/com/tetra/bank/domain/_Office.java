//import java.io.Serializable;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.LinkedHashMap;
//import java.util.List;
//import java.util.Map;
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.FetchType;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.OneToMany;
//import javax.persistence.Table;
//import javax.persistence.Temporal;
//import javax.persistence.TemporalType;
//import javax.persistence.UniqueConstraint;
//import org.apache.commons.lang3.StringUtils;
//import org.apache.fineract.infrastructure.core.api.JsonCommand;
//import org.apache.fineract.infrastructure.core.domain.AbstractPersistableCustom;
//import org.apache.fineract.organisation.office.exception.CannotUpdateOfficeWithParentOfficeSameAsSelf;
//import org.apache.fineract.organisation.office.exception.RootOfficeParentCannotBeUpdated;
//import org.joda.time.LocalDate;
//
//@Entity
//public class Office extends AbstractPersistableCustom  {
//
//    @Column(name = "hierarchy", nullable = true, length = 50)
//    private String hierarchy;
//
//    public static Office headOffice(final String name, final LocalDate openingDate, final String externalId) {
//        return new Office(null, name, openingDate, externalId);
//    }
//
//    public static Office fromJson(final Office parentOffice, final JsonCommand command) {
//
//        final String name = command.stringValueOfParameterNamed("name");
//        final LocalDate openingDate = command.localDateValueOfParameterNamed("openingDate");
//        final String externalId = command.stringValueOfParameterNamed("externalId");
//        return new Office(parentOffice, name, openingDate, externalId);
//    }
//
//    protected Office() {
//        this.openingDate = null;
//        this.parent = null;
//        this.name = null;
//        this.externalId = null;
//    }
//
//    private Office(final Office parent, final String name, final LocalDate openingDate, final String externalId) {
//        this.parent = parent;
//        this.openingDate = openingDate.toDateTimeAtStartOfDay().toDate();
//        if (parent != null) {
//            this.parent.addChild(this);
//        }
//
//        if (StringUtils.isNotBlank(name)) {
//            this.name = name.trim();
//        } else {
//            this.name = null;
//        }
//        if (StringUtils.isNotBlank(externalId)) {
//            this.externalId = externalId.trim();
//        } else {
//            this.externalId = null;
//        }
//    }
//
//    private void addChild(final Office office) {
//        this.children.add(office);
//    }
//
//    public Map<String, Object> update(final JsonCommand command) {
//
//        final Map<String, Object> actualChanges = new LinkedHashMap<>(7);
//
//        final String dateFormatAsInput = command.dateFormat();
//        final String localeAsInput = command.locale();
//
//        final String parentIdParamName = "parentId";
//
//        if (command.parameterExists(parentIdParamName) && this.parent == null) {
//            throw new RootOfficeParentCannotBeUpdated();
//        }
//
//        if (this.parent != null && command.isChangeInLongParameterNamed(parentIdParamName, this.parent.getId())) {
//            final Long newValue = command.longValueOfParameterNamed(parentIdParamName);
//            actualChanges.put(parentIdParamName, newValue);
//        }
//
//        final String openingDateParamName = "openingDate";
//        if (command.isChangeInLocalDateParameterNamed(openingDateParamName, getOpeningLocalDate())) {
//            final String valueAsInput = command.stringValueOfParameterNamed(openingDateParamName);
//            actualChanges.put(openingDateParamName, valueAsInput);
//            actualChanges.put("dateFormat", dateFormatAsInput);
//            actualChanges.put("locale", localeAsInput);
//
//            final LocalDate newValue = command.localDateValueOfParameterNamed(openingDateParamName);
//            this.openingDate = newValue.toDate();
//        }
//
//        final String nameParamName = "name";
//        if (command.isChangeInStringParameterNamed(nameParamName, this.name)) {
//            final String newValue = command.stringValueOfParameterNamed(nameParamName);
//            actualChanges.put(nameParamName, newValue);
//            this.name = newValue;
//        }
//
//        final String externalIdParamName = "externalId";
//        if (command.isChangeInStringParameterNamed(externalIdParamName, this.externalId)) {
//            final String newValue = command.stringValueOfParameterNamed(externalIdParamName);
//            actualChanges.put(externalIdParamName, newValue);
//            this.externalId = StringUtils.defaultIfEmpty(newValue, null);
//        }
//
//        return actualChanges;
//    }
//
//    public boolean isOpeningDateBefore(final LocalDate baseDate) {
//        return getOpeningLocalDate().isBefore(baseDate);
//    }
//
//    public boolean isOpeningDateAfter(final LocalDate activationLocalDate) {
//        return getOpeningLocalDate().isAfter(activationLocalDate);
//    }
//
//    public LocalDate getOpeningLocalDate() {
//        LocalDate openingLocalDate = null;
//        if (this.openingDate != null) {
//            openingLocalDate = LocalDate.fromDateFields(this.openingDate);
//        }
//        return openingLocalDate;
//    }
//
//    public void update(final Office newParent) {
//
//        if (this.parent == null) {
//            throw new RootOfficeParentCannotBeUpdated();
//        }
//
//        if (identifiedBy(newParent.getId())) {
//            throw new CannotUpdateOfficeWithParentOfficeSameAsSelf(getId(), newParent.getId());
//        }
//
//        this.parent = newParent;
//        generateHierarchy();
//    }
//
//    public boolean identifiedBy(final Long id) {
//        return getId().equals(id);
//    }
//
//    public void generateHierarchy() {
//
//        if (this.parent != null) {
//            this.hierarchy = this.parent.hierarchyOf(getId());
//        } else {
//            this.hierarchy = ".";
//        }
//    }
//
//    private String hierarchyOf(final Long id) {
//        return this.hierarchy + id.toString() + ".";
//    }
//
//    public String getHierarchy() {
//        return this.hierarchy;
//    }
//
//    public Office getParent() {
//        return this.parent;
//    }
//
//    public boolean hasParentOf(final Office office) {
//        boolean isParent = false;
//        if (this.parent != null) {
//            isParent = this.parent.equals(office);
//        }
//        return isParent;
//    }
//
//    public boolean doesNotHaveAnOfficeInHierarchyWithId(final Long officeId) {
//        return !hasAnOfficeInHierarchyWithId(officeId);
//    }
//
//    private boolean hasAnOfficeInHierarchyWithId(final Long officeId) {
//
//        boolean match = false;
//
//        if (identifiedBy(officeId)) {
//            match = true;
//        }
//
//        if (!match) {
//            for (final Office child : this.children) {
//                final boolean result = child.hasAnOfficeInHierarchyWithId(officeId);
//
//                if (result) {
//                    match = result;
//                    break;
//                }
//            }
//        }
//
//        return match;
//    }
//
//    public void loadLazyCollections() {
//        this.children.size();
//    }
//}
