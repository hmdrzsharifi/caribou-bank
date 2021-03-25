package com.tetra.bank.repository;

import com.tetra.bank.domain.SavingsProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavingsProductRepository extends JpaRepository<SavingsProduct, Long> {

}
