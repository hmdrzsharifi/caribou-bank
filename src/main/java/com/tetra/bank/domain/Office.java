package com.tetra.bank.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="m_office")
//@Table(name = "m_office", uniqueConstraints = { @UniqueConstraint(columnNames = { "name" }, name = "name_org"),
//                @UniqueConstraint(columnNames = { "external_id" }, name = "externalid_org") })
//@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Office implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "external_id", length = 100)
    private String externalId;

    @Column(name = "opening_date", nullable = false)
    //@Temporal(TemporalType.DATE)
//    private Date openingDate;
    private Instant openingDate;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Set<Office> children = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Office parent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExternalId() {
        return externalId;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }

    public Instant getOpeningDate() {
        return openingDate;
    }

    public void setOpeningDate(Instant openingDate) {
        this.openingDate = openingDate;
    }

    public Set<Office> getChildren() {
        return children;
    }

    public Office children(Set<Office> offices) {
        this.children = offices;
        return this;
    }

    public Office addChildren(Office office) {
        this.children.add(office);
        office.setParent(this);
        return this;
    }

    public Office removeChildren(Office office) {
        this.children.remove(office);
        office.setParent(null);
        return this;
    }

    public void setChildren(Set<Office> offices) {
        this.children = offices;
    }

    public Office getParent() {
        return parent;
    }

    public Office parent(Office office) {
        this.parent = office;
        return this;
    }

    public void setParent(Office office) {
        this.parent = office;
    }
}
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here
