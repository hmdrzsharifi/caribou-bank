package com.tetra.bank.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * The Client entity.
 * @author HamidReza.
 */
//@ApiModel(description = "The Client entity.\n@author HamidReza.")
@Entity
@Table(name = "m_client")
//@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Client implements Serializable {

    //private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    @NotNull
    @Size(max = 20)
    @Column(name = "account_number", length = 20, nullable = false, unique = true)
    private String accountNumber;

    @Column(name = "status")
    private Integer status;

    @Column(name = "activation_date")
    private Instant activationDate;

    @Size(max = 50)
    @Column(name = "firstname", length = 50)
    private String firstname;

    @Size(max = 50)
    @Column(name = "lastname", length = 50)
    private String lastname;

    @Size(max = 50)
    @Column(name = "middlename", length = 50)
    private String middlename;

    @Size(max = 100)
    @Column(name = "fullname", length = 100)
    private String fullname;

    @Size(max = 100)
    @Column(name = "display_name", length = 100)
    private String displayName;

    @Size(max = 50)
    @Column(name = "mobile_no", length = 50, unique = true)
    private String mobileNo;

    @Size(max = 50)
    @Column(name = "email_address", length = 50, unique = true)
    private String emailAddress;

    @NotNull
    @Column(name = "is_staff", nullable = false)
    private Boolean isStaff;

    @Size(max = 100)
    @Column(name = "external_id", length = 100, unique = true)
    private String externalId;

    @Column(name = "date_of_birth")
    private Instant dateOfBirth;

    @Column(name = "closure_date")
    private Instant closureDate;

    @Column(name = "rejection_date")
    private Instant rejectionDate;

    @Column(name = "reactivate_date")
    private Instant reactivateDate;

    @Column(name = "submitted_on_date")
    private Instant submittedOnDate;

    @ManyToOne
    @JoinColumn(name = "office_id", nullable = false)
    private Office office;

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Instant getActivationDate() {
        return activationDate;
    }

    public void setActivationDate(Instant activationDate) {
        this.activationDate = activationDate;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getMiddlename() {
        return middlename;
    }

    public void setMiddlename(String middlename) {
        this.middlename = middlename;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public Boolean getStaff() {
        return isStaff;
    }

    public void setStaff(Boolean staff) {
        isStaff = staff;
    }

    public String getExternalId() {
        return externalId;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }

    public Instant getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Instant dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Instant getClosureDate() {
        return closureDate;
    }

    public void setClosureDate(Instant closureDate) {
        this.closureDate = closureDate;
    }

    public Instant getRejectionDate() {
        return rejectionDate;
    }

    public void setRejectionDate(Instant rejectionDate) {
        this.rejectionDate = rejectionDate;
    }

    public Instant getReactivateDate() {
        return reactivateDate;
    }

    public void setReactivateDate(Instant reactivateDate) {
        this.reactivateDate = reactivateDate;
    }

    public Instant getSubmittedOnDate() {
        return submittedOnDate;
    }

    public void setSubmittedOnDate(Instant submittedOnDate) {
        this.submittedOnDate = submittedOnDate;
    }

    public Office getOffice() {
        return office;
    }

    public void setOffice(Office office) {
        this.office = office;
    }
}
