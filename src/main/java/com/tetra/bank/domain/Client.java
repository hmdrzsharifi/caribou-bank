package com.tetra.bank.domain;

import com.sun.org.apache.xpath.internal.operations.Bool;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
@Entity
@Table(name = "m_client")
public class Client implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    @Column(name = "firstname", nullable = false, length = 100)
    private String firstname;
    private String middlename;
    @Column(name = "lastname",  nullable = false, length = 100)
    private String lastname;
    private String fullname;
    private Instant dateOfBirth; // date_of_birth
    private String external_id;
    private String mobileNo; //mobile_no
    private String emailAddress; //email_address
    private Boolean isStaff; //is_staff
    //private int status; //status_enum
//    activationDate Instant //activation_date
//    submittedOnDate Instant //submittedon_date
//    accountNumber String //account_no
    //private Image image; //image_id JoinColumn
//    sub_status String
//    displayName String //display_name
//    private String gender_cv_id;

    @ManyToOne
    @JoinColumn(name = "office_id", nullable = false)
    private Office office;
}
