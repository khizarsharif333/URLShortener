package com.url.repository;

import com.url.model.URLEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface URLRepository extends JpaRepository<URLEntity,Long> {

}
